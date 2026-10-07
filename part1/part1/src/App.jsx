const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <>
      {
        props.parts.map((element) => (
          <Part name={element.name} exercises={element.exercises} />
        ))
      }
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}
const Total = (props) => {
  const initialValue = 0;
  const totalExercises = props.exercises.reduce((accumulator, curValue) => accumulator + curValue,
    initialValue
  )
  return <p>Number of exercises {totalExercises}</p>
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
      <Content parts={course.parts}
      />
      <Total exercises={course.parts.map(el => el.exercises)} />
    </div>
  )
}

export default App