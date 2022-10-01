import React, { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [color, setColor] = useState("graphite");
  const [leg, setLeg] = useState("left");
  const [sizes, setSizes] = useState({
    upperLeg: "",
    lowerLeg: "",
  });
  const [error, setError] = useState("");

  const min = 0;
  const max = 50;

  const handleChange = (e) => {
    const value = Math.max(min, Math.min(max, Number(e.target.value)));
    setSizes({
      ...sizes,
      [e.target.name]: value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/item", {
        color: color,
        leg: leg,
        sizes: {
          upperLeg: sizes.upperLeg,
          lowerLeg: sizes.lowerLeg,
        },
      })
      .then(function (response) {
        if (response.status === 200) setError("false");
        else setError("true");

        setTimeout(() => {
          setLeg("left");
          setColor("graphite");
          setSizes({
            upperLeg: "",
            lowerLeg: "",
          });
          setError("");
        }, 2000);
      })

      .catch(function (error) {
        setLeg("left");
        setColor("graphite");
        setError("true");
        setTimeout(() => {
          setSizes({
            upperLeg: "",
            lowerLeg: "",
          });
          setError("");
        }, 2000);
      });
  };

  return (
    <div className="container">
      <div className="item_container">
        {/* Select Color Card */}
        <div className="select_card">
          <div className="header">1. Select your color:</div>

          <div className="select_card_container">
            <div
              role="button"
              onClick={() => setColor("graphite")}
              className={
                color === "graphite"
                  ? "select_card_button--selected"
                  : "select_card_button"
              }
            >
              <div
                className={
                  color === "graphite"
                    ? "circle--selected circle_left"
                    : "circle circle_left"
                }
              ></div>
              <div>Graphite</div>
            </div>

            <div
              role="button"
              onClick={() => setColor("gray")}
              className={
                color === "gray"
                  ? "select_card_button--selected"
                  : "select_card_button"
              }
            >
              <div
                className={
                  color === "gray"
                    ? "circle--selected circle_right"
                    : "circle circle_right"
                }
              ></div>
              <div>Gray</div>
            </div>
          </div>
        </div>
        {/* Select Leg Card */}
        <div className="select_card">
          <div className="header">1. Select which leg:</div>
          <div className="select_card_container">
            <div
              role="button"
              onClick={() => setLeg("left")}
              className={
                leg === "left"
                  ? "select_card_button--selected"
                  : "select_card_button"
              }
            >
              <div
                className={
                  leg === "left"
                    ? "circle--selected"
                    : "select_card_button_container"
                }
              >
                <span
                  className={
                    leg === "left"
                      ? "select_card_text--selected"
                      : "select_card_text"
                  }
                >
                  L
                </span>
              </div>
              <div>Left</div>
            </div>
            <div
              role="button"
              onClick={() => setLeg("right")}
              className={
                leg === "right"
                  ? "select_card_button--selected"
                  : "select_card_button"
              }
            >
              <div
                className={
                  leg === "right"
                    ? "circle--selected"
                    : "select_card_button_container"
                }
              >
                <span
                  className={
                    leg === "right"
                      ? "select_card_text--selected"
                      : "select_card_text"
                  }
                >
                  R
                </span>
              </div>
              <div>Right</div>
            </div>
          </div>
        </div>
        {/* Size Input Card */}
        <div className="size_card_container">
          <div className="header">3.Input your size:</div>
          <form className="size_card">
            <label className="item_label">Upper Leg (inches)</label>
            <input
              type="number"
              className="size"
              placeholder="inches"
              name="upperLeg"
              value={sizes.upperLeg}
              onChange={handleChange}
            />
            {sizes.upperLeg === "" || sizes.upperLeg === 0 ? (
              <div className="error">Please enter a value</div>
            ) : (
              ""
            )}
            <label className="item_label">Lower Leg (inches)</label>
            <input
              type="number"
              max="20"
              className="size"
              placeholder="inches"
              name="lowerLeg"
              value={sizes.lowerLeg}
              onChange={handleChange}
            />
            {sizes.lowerLeg === "" || sizes.lowerLeg === 0 ? (
              <div className="error">Please enter a value</div>
            ) : (
              console.log(error)
            )}
          </form>
        </div>
      </div>
      {/* Button */}
      <div className="add_to_cart_button_container">
        <button className="add_to_cart_button" onClick={handleClick}>
          Add to Cart
        </button>
      </div>
      {/* Message */}
      {error === "true" ? (
        <div className="error">Failed</div>
      ) : error === "false" ? (
        <div className="success">Success</div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
