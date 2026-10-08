import { useState } from "react"

const Statistics = ({ statistic }) => {
  const CalcAverage = () => {
    let sum = statistic.good * 1 + statistic.bad * (-1)
    const average = sum / statistic.all
    return average
  }

  const CalcPositive = () => statistic.good / statistic.all * 100

  return (
    <>
      <h2>statistics</h2>
      {(statistic.good == 0 && statistic.bad == 0 && statistic.neutral == 0) ? (
        <p>No feedback given</p>
      ) : (
        <>
          <table>
            <tbody>
              <StatisticLine text="good" value={statistic.good} />
              <StatisticLine text="neutral" value={statistic.neutral} />
              <StatisticLine text="bad" value={statistic.bad} />
              <StatisticLine text="all" value={statistic.all} />
              <StatisticLine text="average" value={CalcAverage()} />
              <StatisticLine text="positive" value={`${CalcPositive()} %`} />
            </tbody>
          </table>

        </>
      )}
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Anecdotes = ({ anecdotes, selected, votes }) => {
  return (
    <div>
      <p>
        {anecdotes[selected]}
      </p>
      <p>has {votes[selected]} votes</p>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const App = () => {
  const [statistic, setStatistic] = useState({
    all: 0,
    good: 0,
    neutral: 0,
    bad: 0
  })
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 })
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const handleGoodIncrease = () => setStatistic({
    ...statistic,
    good: statistic.good + 1,
    all: statistic.all + 1
  })

  const handleNeutralIncrease = () => setStatistic({
    ...statistic,
    neutral: statistic.neutral + 1,
    all: statistic.all + 1
  })

  const handleBadIncrease = () => setStatistic({
    ...statistic,
    bad: statistic.bad + 1,
    all: statistic.all + 1
  })

  const handleOutputAnecdote = () => setSelected(Math.floor((Math.random() * anecdotes.length)))

  const handleVote = () => {
    const copy = { ...votes }
    copy[selected] += 1
    setVotes(copy)
  }

  const getMostPopularAnecdote = () => {
    let anecdoteKey, voteValue = 0
    for (const [key, value] of Object.entries(votes)) {
      if (value > voteValue) {
        voteValue = value
        anecdoteKey = key
      }
    }
    return anecdotes[anecdoteKey]
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodIncrease} text="good" />
      <Button onClick={handleNeutralIncrease} text="neutral" />
      <Button onClick={handleBadIncrease} text="bad" />
      <Statistics statistic={statistic} />
      <h2>Anecdote of the day</h2>
      <Anecdotes anecdotes={anecdotes} selected={selected} votes={votes} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleOutputAnecdote} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      {getMostPopularAnecdote()}
    </div>
  )
}

export default App