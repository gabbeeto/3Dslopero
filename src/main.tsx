import { createRoot } from "react-dom/client";
import "./index.css";
import generateSlope from "./displayGraph/applyButton";

window.jsxContainer = <></>;
window.xyzContainer = ["equation not generated"].map((text, i) => (
  <li key={i}> {text}</li>
));

const root = createRoot(document.getElementById("root")!);
render();

export default function render() {
  root.render(
    <>
      <header>
        <h1>3D SLOPERO</h1>
      </header>
      <main>
        <fieldset>
          <legend>options for the graph</legend>

          <label htmlFor="equationText">Write equation to graph</label>
          <input id="equationText" type="text" placeholder="y = 2x + 6z" />
          <label htmlFor="variableAmount">amount of iteration</label>
          <input
            type="number"
            name="variableAmount"
            id="variableAmount"
            placeholder="10"
          />
          <button
            onClick={() => {
              const equationText: HTMLInputElement =
                document.querySelector("#equationText")!;
              const variableAmount: HTMLInputElement =
                document.querySelector("#variableAmount")!;
              generateSlope(equationText.value, variableAmount.value);
            }}
          >
            apply
          </button>
          <output></output>
        </fieldset>
        <fieldset id="valueContainer">
          <h2>values</h2>
          <ul>{window.xyzContainer}</ul>
        </fieldset>
        {window.jsxContainer}
      </main>
    </>,
  );
}
