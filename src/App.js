// ISSUES:
// 1. integer then operation then equals should be previousState operation currentState
// 2. Add 0 to "."
// 3. limit integers to 9 and progressively make font smaller
// 4. percent and negate then equals

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

    if (currentState === "0" && input === "0") {
      setInput("0");
      setCurrentState("");
    }

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
    // if (prevState is operation then setCurrentState(prevstate))
    // if (prevState === digit then setcurrentstate(prevstate))
    console.log({ previousState, currentState, input, operator, total });

    if (e.target.innerText === "=") {
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
    setInput("0");
    setPreviousState(calculation);
    setCurrentState("");
    // if (input === currentState && previousState === '' && total === false) {
    //   alert("success");
    //   setCurrentState(input);
    //   setPreviousState(input);
    //   setTotal(input);
    // }
    // if (input === '0' && currentState === '') {
    //   setCurrentState(input);
    // }
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
    console.log({previousState, currentState, input, operator, total});
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="display">
        {/* {input !== "" || input === "0" ? (
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
          )} */}
          {input !== "" || input === "0" ? 
            <NumberFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
           : (previousState !== '' ?
            <NumberFormat
              value={previousState}
              displayType={"text"}
              thousandSeparator={true}
            /> 
            : <NumberFormat
                value={"0"}
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
