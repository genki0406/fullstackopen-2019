import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ label, score }) => <tr><th>{label}</th><td>{score}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  if(good + neutral + bad === 0){
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <Statistic label='good' score={good}/>
        <Statistic label='neutral' score={neutral}/>
        <Statistic label='bad' score={bad}/>
        <Statistic label='total' score={good + neutral + bad}/>
        <Statistic label='average' score={(good + neutral + bad) / 3}/>
        <Statistic label='positive' score={(good / (good + neutral + bad) * 100) + '%'}/>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedbach</h1>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)