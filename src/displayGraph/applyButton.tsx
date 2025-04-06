import render from "./../main";
import DisplayOn3D from "./DisplayGraph";

export default function generateSlope(
  textGraph: string,
  amountOfVarialbe: string,
) {
  window.jsxContainer = (
    <>
      <h2>enjoy the graph :)</h2>
      <DisplayOn3D textGraph={textGraph} amountOfVarialbe={amountOfVarialbe} />
    </>
  );
  render();
}
