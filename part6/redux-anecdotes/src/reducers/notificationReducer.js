export const alert = (text, time) => {
  return async dispatch => {
    const result = dispatch({
      type: 'SET',
      data: text,
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, time)
    return result
  }
}

const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'REMOVE':
      return null
    case 'SET':
      return action.data
    default:
      return state
  }
}

export default reducer
