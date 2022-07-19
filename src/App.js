// ISSUES:
// 1. integer then operation then equals should be previousState operation currentState
// 2. Add 0 to "."
// 3. limit integers to 9 and progressively make font smaller
// 4. percent and negate then equals

import './styles.css'
import { useState, useEffect } from 'react'

const ACTIONS = {
  ADD: '+',
  SUBTRACT: '–',
  MULTIPLY: '×',
  DIVIDE: '÷'
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 9,
  maximumSignificantDigits: 9,
  maximumIntegerDigits: 9
})
function formatOperand(value) {
  if (value == null) return
  const [integer, decimal] = value.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
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
        calculation = String(parseFloat(previousState) + parseFloat(input));
        break;
      case ACTIONS.SUBTRACT:
        calculation = String(parseFloat(previousState) - parseFloat(input));
        break;
      case ACTIONS.MULTIPLY:
        calculation = String(parseFloat(previousState) * parseFloat(input));
        break;
      case ACTIONS.DIVIDE:
        calculation = String(parseFloat(previousState) / parseFloat(input));
        break;
      default:
        return;
    }
    // if (operator !== null && previousState !== '') {
    //   setInput("0");
    //   setPreviousState(calculation);
    //   setCurrentState("");
    // }
    setInput("0");
    setPreviousState(calculation);
    setCurrentState("");
    // setInput(calculation);
    // setPreviousState(calculation);
    // setCurrentState(calculation);
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

  const displayValue = () => {
    if (input !== "" || input === "0") {
      return input;
    } else if (previousState !== '') {
      setInput(previousState);
    } else {
      setInput("0");
    }
  }

    // change screen's font-size
  //   switch(result.toString().length) {
  //     case 7:
  //         display.style.fontSize = "4.7rem"
  //         break;
  //     case 8:
  //         display.style.fontSize = "4.1rem"
  //         break;
  //     case 9: 
  //         display.style.fontSize = "3.65rem"
  //         break
  //     default: return;
  // }
  // if(result.toString().length > 9) {
  //     display.textContent = parseFloat(result).toPrecision(3);
  // } else {
  //     display.textContent = result;
  // }

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
          {/* {input !== "" || input === "0" ? 
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
          )} */}
          {formatOperand(displayValue())}
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
