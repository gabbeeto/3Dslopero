import MaxAndMinValuesForShowingLines from "./../algorithms/minAndMax";
import getPointsForOverWorldLines from "./../algorithms/basicLine";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/Addons.js";
import myFonts from "three/examples/fonts/helvetiker_regular.typeface.json";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

export default function makeOverWorldLines(
  container: xyzNumbers[],
): THREE.Group[] {
  const [smallesValues, biggestValues] = MaxAndMinValuesForShowingLines(
    container,
  ) as xyzNumbers[];

  const pointsContainer: xyzContainers = getPointsForOverWorldLines(
    smallesValues,
    biggestValues,
  );

  const xLinesPoints: xyzNumbers[] = pointsContainer.x as xyzNumbers[];
  const yLinesPoints: xyzNumbers[] = pointsContainer.y as xyzNumbers[];
  const zLinesPoints: xyzNumbers[] = pointsContainer.z as xyzNumbers[];
  const xLines = makeLinesFromOverWorldForAxis(xLinesPoints, "x");
  const yLines = makeLinesFromOverWorldForAxis(yLinesPoints, "y");
  const zLines = makeLinesFromOverWorldForAxis(zLinesPoints, "z");

  return [xLines, yLines, zLines];
}

function makeLinesFromOverWorldForAxis(
  axisContainer: xyzNumbers[],
  axis: string,
): THREE.Group {
  const materialForOverWorldLines = new THREE.LineBasicMaterial({
    color: 0x26a827,
  });

  const pointsForLinesFromOverWold = axisContainer.map((e) => {
    return new THREE.Vector3(e["x"], e["z"], e["y"]);
  });

  const geometryForOverwolrdLines = new THREE.BufferGeometry().setFromPoints(
    pointsForLinesFromOverWold,
  );

  const LineFromOverWorld = new THREE.Line(
    geometryForOverwolrdLines,
    materialForOverWorldLines,
  );

  const groupOfTextAndLines = new THREE.Group();

  groupOfTextAndLines.add(LineFromOverWorld);

  const font = new FontLoader().parse(myFonts);

  const textOptions = {
    font,
    size: 0.05,
    height: 0.05,
    depth: 0.025,
  };

  axisContainer.forEach((e) => {
    const numberFromAxis = e[axis];
    const textG = new TextGeometry(`(${axis}:${numberFromAxis})`, textOptions);
    const text = new THREE.Mesh(
      textG,
      new THREE.MeshBasicMaterial({ color: 0x26a827 }),
    );
    text.position.x = Number(e.x);
    text.position.y = Number(e.z);
    text.position.z = Number(e.y);
    groupOfTextAndLines.add(text);
  });

  return groupOfTextAndLines;
}
