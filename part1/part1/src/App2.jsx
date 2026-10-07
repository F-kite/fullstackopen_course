import { useState } from "react"

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handler, btnContent }) => <button onClick={handler}>{btnContent}</button>

const App = () => {
    const [counter, setCounter] = useState(0)

    const increaseByOne = () => setCounter(counter + 1)
    const setToZero = () => setCounter(0)
    const decreaseByOne = () => setCounter(counter - 1)

    return (
        <div>
            <Display counter={counter} />
            <Button handler={increaseByOne} btnContent={"Plus"} />
            <Button handler={decreaseByOne} btnContent={"Minus"} />
            <Button handler={setToZero} btnContent={"Reset"} />
        </div>
    )
}

export default App