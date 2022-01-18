import { useState } from "react";
import "./css/index.css";

function Calcuator() {
  const [selected, setSelected] = useState("metric");
  const [meters, setMeters] = useState("");
  const [inches, setInches] = useState("");
  const [kgs, setKgs] = useState("");
  const [pounds, setPounds] = useState("");
  const [bmi, setBMI] = useState("");
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
  }
  return (
    <div className="main_div">
      <div className="calculator">
        <h1>BMI Calculator</h1>
        <select
          onChange={(e) => setSelected(e.target.value)}
          className="dropdown"
        >
          <option label="Metric" value={"metric"} />
          <option label="Imperial" value={"imperial"} />
        </select>
        <label htmlFor="weight" className="label">
          Weight in {selected === "metric" ? "kgs" : "pounds"}
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
        <label htmlFor="height" className="label">
          Height
        </label>
        <div className="height_div">
          {selected === "metric" ? (
            <label className="label">
              Meters
              <input
                type={"number"}
                onChange={(e) => setMeters(e.target.value)}
                id="height"
                className="input"
              />
            </label>
          ) : null}
          <label className="label">Inches</label>
          <input
            type={"number"}
            onChange={(e) => setInches(e.target.value)}
            id="height"
            className="input"
          />
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
