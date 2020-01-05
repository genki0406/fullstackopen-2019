import anecdoteService from '../services/anecdotes'

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(asObject(content))
    dispatch({
      type: 'ADD',
      data: newAnecdote,
    })
  }
}

export const updateAnecdote = (id, content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.update(id, content)
    dispatch({
      type: 'UPDATE',
      data: newAnecdote,
    })
  }
}

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

export const voteOf = (id) => {
  return {type: 'VOTE', data: {id}}
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'UPDATE':
      return state.map(anecdote => action.data.id === anecdote.id ? action.data : anecdote).sort((s1, s2) => s2.votes - s1.votes)
    case 'ADD':
      return [...state, action.data]
    default:
      return state
  }
}

export default reducer