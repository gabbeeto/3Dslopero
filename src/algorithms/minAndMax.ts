export default function getMinAndMaxForTable(
  tableOfContent: xyzNumbers[],
): xyzNumbers[] {
  const biggestPair: xyzNumbers = {
    x: tableOfContent[0]["x"],
    y: tableOfContent[0]["y"],
    z: tableOfContent[0]["z"],
  };
  const smallestPair: xyzNumbers = {
    x: tableOfContent[0]["x"],
    y: tableOfContent[0]["y"],
    z: tableOfContent[0]["z"],
  };

  biggestPair["y"] = tableOfContent.reduce((a, c) => {
    return Number(a) > Number(c["y"]) ? a : c["y"];
  }, tableOfContent[0]["y"]);
  biggestPair["x"] = tableOfContent.reduce((a, c) => {
    return Number(a) > Number(c["x"]) ? a : c["x"];
  }, tableOfContent[0]["x"]);
  biggestPair["z"] = tableOfContent.reduce((a, c) => {
    return Number(a) > Number(c["z"]) ? a : c["z"];
  }, tableOfContent[0]["z"]);

  smallestPair["y"] = tableOfContent.reduce((a, c) => {
    return Number(a) < Number(c["y"]) ? a : c["y"];
  }, tableOfContent[0]["y"]);
  smallestPair["x"] = tableOfContent.reduce((a, c) => {
    return Number(a) < Number(c["x"]) ? a : c["x"];
  }, tableOfContent[0]["x"]);
  smallestPair["z"] = tableOfContent.reduce((a, c) => {
    return Number(a) < Number(c["z"]) ? a : c["z"];
  }, tableOfContent[0]["z"]);

  biggestPair["y"] = Number(biggestPair["y"]) + 1;
  biggestPair["x"] = Number(biggestPair["x"]) + 1;
  biggestPair["z"] = Number(biggestPair["z"]) + 1;

  smallestPair["y"] = Number(smallestPair["y"]) - 1;
  smallestPair["x"] = Number(smallestPair["x"]) - 1;
  smallestPair["z"] = Number(smallestPair["z"]) - 1;

  return [smallestPair, biggestPair];
}
