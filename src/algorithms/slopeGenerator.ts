import { Fraction } from "./../classesAndInterfaces/Fraction";

export default function getcontainersofpairs(
  textgraph: string,
  amountofvarialbe: number,
): xyzNumbers[] {
  const interceptformterms: xyzFractions = getMainValue(textgraph);
  const mainvariable: string = getMainVariable(textgraph);
  let newInterceptForms: xyzFractions = { interceptValue: new Fraction() };
  switch (mainvariable) {
    case "y":
      newInterceptForms = {
        x: interceptformterms["x"],
        z: interceptformterms["z"],
        interceptValue: interceptformterms["interceptValue"],
      };
      break;
    case "x":
      newInterceptForms = {
        y: interceptformterms["y"],
        z: interceptformterms["z"],
        interceptValue: interceptformterms["interceptValue"],
      };
      break;
    default:
      newInterceptForms = {
        y: interceptformterms["y"],
        x: interceptformterms["x"],
        interceptValue: interceptformterms["interceptValue"],
      };
      break;
  }
  // todo-make the tables of pairs with with both slopes and return it

  const tableofpairs: xyzNumbers[] = gettable(
    newInterceptForms,
    amountofvarialbe,
    mainvariable,
  );

  return tableofpairs;
}

function gettable(
  slopes: xyzFractions,
  amount: number,
  mainvariable: string,
): xyzNumbers[] {
  const oppositesfrommain: number[] = [];

  for (const k in slopes) {
    oppositesfrommain.push(slopes[k]!.turnIntoDecimal());
  }

  const mainvalues: xyzNumbers[] = [];
  for (let i: number = 0; i < amount; i++) {
    let othervariables: string[] = [];
    switch (mainvariable) {
      case "y":
        othervariables = ["x", "z"];
        break;
      case "x":
        othervariables = ["y", "z"];
        break;
      default:
        othervariables = ["x", "y"];
        break;
    }

    const firstoppositevariable = oppositesfrommain[0] * i;
    for (let i2: number = 0; i2 < amount; i2++) {
      const secondoppositevariable = oppositesfrommain[1] * i2;
      const thirdoppositevariable = oppositesfrommain[2];

      const pair: xyzNumbers = {};

      pair[mainvariable] =
        firstoppositevariable + secondoppositevariable + thirdoppositevariable;
      // prevents objects from spawning
      pair[othervariables[0]] = returnVar(firstoppositevariable, i);
      pair[othervariables[1]] = returnVar(secondoppositevariable, i2);
      if (i > 0) {
        const negative2nd: xyzNumbers = {};
        negative2nd[mainvariable] =
          firstoppositevariable * -1 +
          secondoppositevariable +
          thirdoppositevariable;

        negative2nd[othervariables[0]] = returnVar(
          firstoppositevariable,
          i,
          true,
        );
        negative2nd[othervariables[1]] = returnVar(secondoppositevariable, i2);

        const negative2ndIsnotInArray: boolean = pairIsNotInArray(
          mainvalues,
          negative2nd,
          [mainvariable, othervariables[0], othervariables[1]],
        );
        if (negative2ndIsnotInArray) {
          mainvalues.push(negative2nd);
        }
      }

      if (i2 > 0) {
        const negative3rd: xyzNumbers = {};
        negative3rd[mainvariable] =
          firstoppositevariable +
          secondoppositevariable * -1 +
          thirdoppositevariable;
        negative3rd[othervariables[0]] = returnVar(firstoppositevariable, i);
        negative3rd[othervariables[1]] = returnVar(
          secondoppositevariable,
          i2,
          true,
        );

        const negative3rdIsnotInArray: boolean = pairIsNotInArray(
          mainvalues,
          negative3rd,
          [mainvariable, othervariables[0], othervariables[1]],
        );
        if (negative3rdIsnotInArray) {
          mainvalues.push(negative3rd);
        }
      }

      const pairIsnotInArray: boolean = pairIsNotInArray(mainvalues, pair, [
        mainvariable,
        othervariables[0],
        othervariables[1],
      ]);
      if (pairIsnotInArray) {
        mainvalues.push(pair);
      }
    }
  }

  return mainvalues;
}

function pairIsNotInArray(
  mainArray: xyzNumbers[],
  secondaryArray: xyzNumbers,
  valuesToCompare: string[],
): boolean {
  return !mainArray.some(
    (item) =>
      item[valuesToCompare[0]] === secondaryArray[valuesToCompare[0]] &&
      item[valuesToCompare[1]] === secondaryArray[valuesToCompare[1]] &&
      item[valuesToCompare[2]] === secondaryArray[valuesToCompare[2]],
  );
}

function returnVar(
  item: number,
  index: number,
  negative: boolean = false,
): number {
  const one = negative ? -1 : 1;
  if (item == 0) {
    return 0;
  } else {
    return index * one;
  }
}

function getMainVariable(textGraph: string): string {
  return textGraph.split("=")![0].match(/(x|y|z)/)![0];
}

function getMainValue(textGraph: string): xyzFractions {
  const negative = "(-| -|- )?";
  const numberPattern = `${negative} ?[0-9]+`;
  const wholeNumberTerm = `${numberPattern}(x|z|y)?`;

  const divisionSymbols = "(\\\\|\\/|%)";
  const fractionNumberTerm = `${negative}\\( ?${numberPattern} ?${divisionSymbols}? ?${numberPattern} ?\\) ?(x|z|y)?`;

  const numberRegex: RegExp = new RegExp(
    `(${wholeNumberTerm}|${fractionNumberTerm})`,
    "g",
  );

  const numberButText = [...textGraph.matchAll(numberRegex)].map((e) => e[0]);

  const variables = {
    x: new Fraction(),
    y: new Fraction(),
    z: new Fraction(),
    interceptValue: new Fraction(),
  };

  numberButText.forEach((e) => {
    if (e.includes("x")) {
      variables["x"] = new Fraction(e);
    } else if (e.includes("y")) {
      variables["y"] = new Fraction(e);
    } else if (e.includes("z")) {
      variables["z"] = new Fraction(e);
    } else {
      variables["interceptValue"] = new Fraction(e);
    }
  });

  return variables;
}
