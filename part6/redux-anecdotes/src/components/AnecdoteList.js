import React from 'react';
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.updateAnecdote(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
  }

  return (
    <>
      {
        props.visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

const mapDispatchToProps = {
  updateAnecdote,
}

const anecdotesToShow = ({anecdotes, filter}) => {
  if (filter){
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  }
  return anecdotes
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
