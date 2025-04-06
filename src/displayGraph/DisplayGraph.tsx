import getContainersOfPairs from "./../algorithms/slopeGenerator";
import makeOverWorldLines from "./makeOverWorldLines";
import Point from "../classesAndInterfaces/Point";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import myFonts from "three/examples/fonts/helvetiker_regular.typeface.json";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/Addons.js";

export default function DisplayOn3D({
  textGraph,
  amountOfVarialbe,
}: {
  textGraph: string;
  amountOfVarialbe: string;
}) {
  const container: xyzNumbers[] = getContainersOfPairs(
    textGraph,
    Number(amountOfVarialbe),
  );
  generateValues(container);

  const [xOverworldLines, yOverworldLines, zOverworldLines] =
    makeOverWorldLines(container);

  const lineForXYZPoints = makeLinesForXYZPoints(container);
  const textForXYZPoints = makeTextForPoints(container);

  return (
    <Canvas>
      <OrbitControls />
      <primitive object={xOverworldLines} position={[0, 0, 0]} />
      <primitive object={yOverworldLines} position={[0, 0, 0]} />
      <primitive object={zOverworldLines} position={[0, 0, 0]} />

      <primitive object={textForXYZPoints} position={[0, 0, 0]} />
      <primitive object={lineForXYZPoints} position={[0, 0, 0]} />
      {container.map((e, i) => {
        return (
          <Point
            element={e}
            key={i}
            index={i}
            mainAxis={textGraph.split("=")[0].match(/(x|y|z)/)![0]}
          />
        );
      })}
    </Canvas>
  );
}

function makeLinesForXYZPoints(container: xyzNumbers[]): THREE.Line {
  const materialForLine = new THREE.LineBasicMaterial({ color: 0x0000ff });
  const pointsForLine = container.map((e) => {
    return new THREE.Vector3(e["x"], e["z"], e["y"]);
  });
  const geometryForLine = new THREE.BufferGeometry().setFromPoints(
    pointsForLine,
  );
  const line = new THREE.Line(geometryForLine, materialForLine);
  return line;
}

function makeTextForPoints(container: xyzNumbers[]): THREE.Group {
  const font = new FontLoader().parse(myFonts);
  // configure font geometry
  const textOptions = {
    font,
    size: 0.1,
    height: 0.1,
    depth: 0.05,
  };

  const groupOfText: THREE.Group = new THREE.Group();

  container.forEach((e) => {
    const textG: TextGeometry = new TextGeometry(
      `(x:${e.x},y:${e.y},z:${e.z})`,
      textOptions,
    );
    const text: THREE.Mesh = new THREE.Mesh(
      textG,
      new THREE.MeshBasicMaterial({ color: "white" }),
    );
    text.position.x = Number(e.x) - 0.3;
    text.position.y = Number(e.z) + 0.3;
    text.position.z = Number(e.y);
    groupOfText.add(text);
  });

  return groupOfText;
}

// TODO: try to make buttons that make camera teleport
function generateValues(container: xyzNumbers[]) {
  window.xyzContainer = container.map((e, i) => {
    return (
      <li key={i}>
        <p>
          (x:{e["x"]},y:{e["y"]},z:{e["z"]})
        </p>
      </li>
    );
  });
}
