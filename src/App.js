// ISSUES:
// 1. Sometimes calculator displays nothing... type in integer then press AC, also type in operation then interger then equals
// 2. Add 0 to "."
// 3. css fading white button press

import './styles.css'
import { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'

const ACTIONS = {
  ADD: '+',
  SUBTRACT: '–',
  MULTIPLY: '×',
  DIVIDE: '÷'
}

function App() {
  const [previousState, setPreviousState] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const applyDigit = (e) => {
    if (currentState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreviousState("");
    }

    currentState
      ? setCurrentState((pre) => pre + e.target.innerText)
      : setCurrentState(e.target.innerText);
    setTotal(false);
  };

  useEffect(() => {
    setInput(currentState);
  }, [currentState]);

  useEffect(() => {
    setInput("0");
  }, []);
  const applyOperation = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (currentState === "") return;
    if (previousState !== "") {
      equals();
    } else {
      setPreviousState(currentState);
      setCurrentState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    let calculation;
    switch (operator) {
      case ACTIONS.ADD:
        calculation = String(parseFloat(previousState) + parseFloat(currentState));
        break;
      case ACTIONS.SUBTRACT:
        calculation = String(parseFloat(previousState) - parseFloat(currentState));
        break;
      case ACTIONS.MULTIPLY:
        calculation = String(parseFloat(previousState) * parseFloat(currentState));
        break;
      case ACTIONS.DIVIDE:
        calculation = String(parseFloat(previousState) / parseFloat(currentState));
        break;
      default:
        return;
    }
    setInput("");
    setPreviousState(calculation);
    setCurrentState("");
  };

  const negate = () => {
    if (currentState.charAt(0) === "-") {
      setCurrentState(currentState.substring(1));
    } else {
      setCurrentState("-" + currentState);
    }
  };

  const percent = () => {
    previousState
      ? setCurrentState(String((parseFloat(currentState) / 100) * previousState))
      : setCurrentState(String(parseFloat(currentState) / 100));
  };

  const reset = () => {
    setPreviousState("");
    setCurrentState("");
    setInput("0");
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="display">
        {input !== "" || input === "0" ? (
            <NumberFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumberFormat
              value={previousState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
        <button className="light-grey" onClick={reset}>AC</button>
        <button className="light-grey" onClick={negate}>+/-</button>
        <button className="light-grey" onClick={percent}>%</button>
        <button className="orange operation" onClick={applyOperation}>÷</button>
        <button className="dark-grey" onClick={applyDigit}>7</button>
        <button className="dark-grey" onClick={applyDigit}>8</button>
        <button className="dark-grey" onClick={applyDigit}>9</button>
        <button className="orange operation" onClick={applyOperation}>×</button>
        <button className="dark-grey" onClick={applyDigit}>4</button>
        <button className="dark-grey" onClick={applyDigit}>5</button>
        <button className="dark-grey" onClick={applyDigit}>6</button>
        <button className="orange operation" onClick={applyOperation}>–</button>
        <button className="dark-grey" onClick={applyDigit}>1</button>
        <button className="dark-grey" onClick={applyDigit}>2</button>
        <button className="dark-grey" onClick={applyDigit}>3</button>
        <button className="orange operation" onClick={applyOperation}>+</button>
        <button className="dark-grey span-two" onClick={applyDigit}>0</button>
        <button className="dark-grey" onClick={applyDigit}>.</button>
        <button className="orange" onClick={equals}>=</button>
      </div>
    </div>
  );
}

export default App;
