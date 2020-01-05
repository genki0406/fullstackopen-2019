import React from 'react'
import ReactDOM from 'react-dom'

const Content = (props) => {
  return (
    props.parts.map((x, index) => <p key={index}>{x.name} {x.exercises}</p>)
  )
}

const Total = (props) => {
  let total = props.parts.reduce((prev, current) =>
    prev + current.exercises
  , 0)
  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
