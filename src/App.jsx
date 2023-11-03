import { useState } from "react";
import "./App.css";
import { positionIcon } from "./helper";

function App() {
  // State--
  const [colorOne, setColorOne] = useState("#cf0768");
  const [colorTwo, setColorTwo] = useState("#53536e");
  const [position, setPosition] = useState("to bottom");
  const [copiedText, setCopiedText] = useState(false);
  // Handlers--
  const colorOneChangeHandler = (e) => {
    setColorOne(e.target.value);
  };
  const colorTwoChangeHandler = (e) => {
    setColorTwo(e.target.value);
  };
  const positionChangeHandler = (e) => {
    setPosition(e.target.dataset.position);
    document.body.style.backgroundImage = `linear-gradient(${position},${colorOne},${colorTwo})`;
  };
  const positionContainerHandler = (e) => {
    const positionIcons = document.querySelectorAll(".position");
    positionIcons.forEach((positionIcon) => {
      positionIcon.style.background = "rgb(159, 155, 155)";
    });
    if (e.target.classList.contains("position")) {
      e.target.style.background = "dodgerblue";
    }
  };
  const copyHandler = () => {
    const backgroundImage = `background-image:linear-gradient(${position},${colorOne},${colorTwo})`;
    navigator.clipboard.writeText(backgroundImage);
    setCopiedText(true);
    setTimeout(() => {
      setCopiedText(false);
    }, 1000);
  };

  return (
    <>
      <div className="container flex-center flex-col">
        <div className="inputs flex-row">
          <div>
            <label htmlFor="color-one"></label>
            <input
              type="color"
              id="color-one"
              className="color-input color-one"
              value={colorOne}
              onChange={colorOneChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="color-two "></label>
            <input
              type="color"
              className="color-input color-two"
              id="color-two"
              value={colorTwo}
              onChange={colorTwoChangeHandler}
            />
          </div>
        </div>
        <div
          className="position-icons flex-row flex-wrap"
          onClick={positionContainerHandler}
        >
          {positionIcon.map((icon, ind) => {
            return (
              <i
                key={ind}
                className={icon.className}
                data-position={icon.position}
                onClick={positionChangeHandler}
              ></i>
            );
          })}
        </div>

        <div className="output">
          <p className="output-text">
            background-image: linear-gradient(
            <span className="position-text">{position}</span>,
            <span className="color-1">{colorOne},</span>
            <span className="color-2">{colorTwo}</span>);
          </p>
          <button className="copy-btn" onClick={copyHandler}>
            {copiedText ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
