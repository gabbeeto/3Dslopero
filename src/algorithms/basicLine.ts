export default function getPointsForOverWorldLines(
  smallesValues: xyzNumbers,
  biggestValues: xyzNumbers,
): xyzContainers {
  const xDistance = Number(biggestValues["x"]) - Number(smallesValues["x"]);
  const yDistance = Number(biggestValues["y"]) - Number(smallesValues["y"]);
  const zDistance = Number(biggestValues["z"]) - Number(smallesValues["z"]);

  const xLines: xyzNumbers[] = [];
  for (let index = 0; index - 1 < xDistance; index++) {
    xLines.push({ z: 0, y: 0, x: index + Number(smallesValues["x"]) });
  }

  const yLines: xyzNumbers[] = [];
  for (let index = 0; index - 1 < yDistance; index++) {
    yLines.push({ z: 0, x: 0, y: index + Number(smallesValues["y"]) });
  }

  const zLines: xyzNumbers[] = [];
  for (let index = 0; index - 1 < zDistance; index++) {
    zLines.push({ x: 0, y: 0, z: index + Number(smallesValues["z"]) });
  }

  const allThePoints: xyzContainers = { x: xLines, y: yLines, z: zLines };

  return allThePoints;
}
