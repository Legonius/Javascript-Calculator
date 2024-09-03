import React, { useEffect, useState } from "react";
import { numArray, opsArray, otherArray } from "../data";

const Calculator = () => {
  const allArray = [...numArray, ...opsArray, ...otherArray];
  const [result, setResult] = useState(0);
  const [allInput, setAllInput] = useState("");
  const [lastResult, setLastResult] = useState(null);

  const handleButton = (value) => {
    const sign = allArray.map((item) => item.sign);
    //AC button function
    if (value === "AC") {
      setAllInput("");
      setResult(0);
      setLastResult("");
      return setResult(0);
    }
    // ------------------------------------------------------------

    //Equal button function
    if (value === "=" && allInput) {
      if (allInput === result || result == lastResult) {
        return;
      }
      let equal = eval(allInput);
      if (equal.toString().includes(".")) {
        equal = Number(equal.toFixed(5));

        //check if there is zero after decimal
        let i = 4;
        while (equal.toString()[equal.length - 1] == 0) {
          equal = Number(equal.toFixed(i));
          i--;
        }
      }
      setResult(equal);
      setLastResult(equal);
      equal = `${allInput}=${equal}`;
      setAllInput(equal);
      return;
    }

    // ------------------------------------------------------------
    //Numbers and dot section

    // check input is number and dot
    if (sign.includes(Number(value)) || value === ".") {
      if (result[result.length - 1] === "." && value === ".") {
        return;
      }
      if (result.toString().includes(".") && value === ".") {
        return;
      }
      if (result == 0 && value == 0) {
        return;
      }

      //check if last result is true reset all
      if (lastResult) {
        console.log("lastResult");
        setResult(value);
        setAllInput(value);
        return setLastResult(null);
      }
      if (value === "." && result == 0) {
        console.log("hiiii");
        setResult("0.");
        setAllInput(allInput + "0.");
        return;
      }

      if (Number(value) !== 0 || ".") {
        setResult(result === 0 ? value : result + value);
        setAllInput(allInput + value);
      }
      return;
    }

    // ------------------------------------------------------------
    //Operator section

    if (sign.includes(value) && value !== "=") {
      // checking last input is already an operator
      if (isNaN(Number(allInput[allInput.length - 1]))) {
        let operator = allInput[allInput.length - 1];

        //check if last used operator is not minus can use minus operator
        if (operator !== "-" && value === "-") {
          setAllInput(allInput + value);
        } else {
          let operator2 = allInput[allInput.length - 2];

          //make sure last operator only works
          if (operator === "-" && value !== "-" && isNaN(Number(operator2))) {
            let del = allInput
              .split("")
              .splice(0, allInput.length - 2)
              .join("");
            setAllInput(del + value);
          } else {
            let del = allInput
              .split("")
              .splice(0, allInput.length - 1)
              .join("");
            setAllInput(del + value);
          }
        }
      } else {
        if (lastResult) {
          setAllInput(lastResult + value);
          setLastResult(null);
        } else {
          setAllInput(allInput + value);
        }
        setResult(value);
      }
    }
  };
  return (
    <main className="w-full flex flex-col bg-black border-2 border-gray-800 text-white gap-1 text-xl ">
      <div className="text-end pr-1 text-orange-500 text-2xl h-6 -tracking-tighter overflow-scroll">
        {allInput}
      </div>
      <div
        id="display"
        className="text-end w-full text-4xl pr-1 py-2 h-14 overflow-scroll"
      >
        {result}
      </div>
      <div className="keypad border-2 p-1 border-orange-900 text-2xl">
        {allArray.map((item, index) => (
          <button
            onClick={(e) => handleButton(e.target.value)}
            className="bg-slate-600"
            key={index}
            id={item.id}
            value={item.sign}
          >
            {item.sign}
          </button>
        ))}
      </div>
    </main>
  );
};

export default Calculator;
