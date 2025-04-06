import { useState } from "react";

export default function Point({
  element,
  index,
  mainAxis,
}: {
  element: xyzNumbers;
  index: number;
  mainAxis: string;
}) {
  const [isHovered, changeHoverState] = useState(false);

  let isSlope = false;
  let remainingAxis = [];

  switch (mainAxis) {
    case "y":
      remainingAxis = ["x", "z"];
      break;
    case "x":
      remainingAxis = ["y", "z"];
      break;
    default:
      remainingAxis = ["x", "y"];
      break;
  }
  const remainingAxisAreZero =
    element[remainingAxis[0]] == 0 && element[remainingAxis[1]] == 0;
  if (remainingAxisAreZero) {
    isSlope = true;
  }

  return (
    <mesh
      onPointerOver={() => {
        changeHoverState(true);
        changeOutputText(
          `(x:${element["x"]},y:${element["y"]},z:${element["z"]} )`,
        );
      }}
      onPointerOut={() => {
        changeHoverState(false);
        changeOutputText("");
      }}
      key={index}
      position={[
        Number(element["x"]),
        Number(element["z"]),
        Number(element["y"]),
      ]}
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />

      <meshBasicMaterial
        color={isHovered ? "#711D1D" : isSlope ? "#FFDD1C" : "#4C711D"}
      />
    </mesh>
  );
}

function changeOutputText(outputText: string) {
  const outputElement = document.querySelector("output")!;
  outputElement.innerHTML = outputText;
}
