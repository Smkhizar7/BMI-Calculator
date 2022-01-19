import { useEffect, useState } from "react";
import "./css/index.css";

function Calcuator() {
  const [selected, setSelected] = useState("metric");
  const [meters, setMeters] = useState("");
  const [inches, setInches] = useState("");
  const [kgs, setKgs] = useState("");
  const [pounds, setPounds] = useState("");
  const [bmi, setBMI] = useState("");
  useEffect(()=>{
      const itemStr = localStorage.getItem("BMI")
      if (!itemStr) {
        return null
      }
      const item = JSON.parse(itemStr)
      const now = new Date()
      if (now.getTime() > item.expiry) {
        localStorage.removeItem("BMI")
        return null
      }
  },[])
  function calculate() {
    let result,
      height = 0,
      weight = 0;
    if (selected === "metric") {
      if (
        meters !== "" &&
        meters !== "0" &&
        inches !== "0" &&
        inches !== "" &&
        kgs !== "" &&
        kgs !== "0"
      ) {
        height = Number(meters) * 39.3701 + Number(inches);
        weight = 2.20462 * Number(kgs);
      } else {
        alert("Please fill fields");
      }
    } else {
      if (inches !== "0" && inches !== "" && pounds !== "" && pounds !== "0") {
        height = Number(inches);
        weight = Number(pounds);
      } else {
        alert("Please fill fields");
      }
    }
    result = ((703 * weight) / (height * height)).toFixed(1);
    setBMI(result);
    const now = new Date()
	const item = {
		value: result,
		expiry: now.getTime() + 586800000,
	}
	localStorage.setItem("BMI", JSON.stringify(item))
  }
  return (
    <div className="main_div">
      <div className="calculator">
        <h1 className="heading">BMI Calculator</h1>
        <select
          onChange={(e) => setSelected(e.target.value)}
          className="dropdown"
        >
          <option label="Metric" value={"metric"} />
          <option label="Imperial" value={"imperial"} />
        </select>
        <label htmlFor="weight" className="label">
          Weight
        </label>
        <span className="input_span">
          <label htmlFor="weight" className="label">
            {selected === "metric" ? "Kgs" : "Pounds"}
          </label>
          {selected === "metric" ? (
            <input
              type={"number"}
              onChange={(e) => setKgs(e.target.value)}
              id="weight"
              className="input"
            />
          ) : (
            <input
              type={"number"}
              onChange={(e) => setPounds(e.target.value)}
              id="weight"
              className="input"
            />
          )}
        </span>
        <label htmlFor="height" className="label">
          Height
        </label>
        <div className="height_div">
          {selected === "metric" ? (
            <span className="input_span">
              <label className="label">Meters</label>
              <input
                type={"number"}
                onChange={(e) => setMeters(e.target.value)}
                id="height"
                className="input"
              />
            </span>
          ) : null}
          <span className="input_span">
            <label className="label">Inches</label>
            <input
              type={"number"}
              onChange={(e) => setInches(e.target.value)}
              id="height"
              className="input"
            />
          </span>
        </div>
        <button onClick={calculate} className="btn">
          Calculate
        </button>
        <p className="result">Your BMI is {bmi ? bmi : null}</p>
      </div>
    </div>
  );
}
export default Calcuator;
