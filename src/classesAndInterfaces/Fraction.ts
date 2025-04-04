export class Fraction {
  Numerator: number = 1;
  Denominator: number = 1;

  constructor(content: string = "empty") {
    if (content == "empty") {
      this.Numerator = 0;
      this.Denominator = 0;
    }

    const numberpattern = "(-| -|- )?[0-9]+";
    const divisionSymbol: string = "(\\\\|\\/|%)";

    const divisionSymbolIsFound: boolean =
      content.search(new RegExp(`${divisionSymbol}`)) != -1;
    const hasParenthesis: boolean = content.includes("(");
    const itsAFraction: boolean = hasParenthesis && divisionSymbolIsFound;
    if (itsAFraction) {
      const [numeratorText, , denominatorText] = content.split(
        new RegExp(`${divisionSymbol}`, "u"),
      );
      const numberatorTextButShort: string = numeratorText.match(
        new RegExp(numberpattern),
      )![0];
      const denominatorTextButShort: string = denominatorText.match(
        new RegExp(numberpattern),
      )![0];

      const numberatorTextWithoutSpaces: string = numberatorTextButShort
        .split(" ")
        .join("");
      const denominatorTextWithoutSpaces: string = denominatorTextButShort
        .split(" ")
        .join("");
      this.Numerator = Number(numberatorTextWithoutSpaces);
      this.Denominator = Number(denominatorTextWithoutSpaces);

      const bothValuesAreNegative: boolean =
        this.Numerator < 0 && this.Denominator < 0;
      const fractionFlipled = this.Numerator >= 0 && this.Denominator < 0;
      if (bothValuesAreNegative || fractionFlipled) {
        this.Numerator = invertNumber(this.Numerator);
        this.Denominator = invertNumber(this.Denominator);
      }

      const contentIsNegative: boolean = content[0] == "-";
      if (contentIsNegative) {
        this.Numerator = invertNumber(this.Numerator);
      }
    } else if (content != "empty") {
      if (hasParenthesis) {
        const allTheNumbers = [
          ...content.matchAll(new RegExp(numberpattern, "g"))!,
        ];
        const newNumbers = allTheNumbers
          .map((e) => e[0])
          .map((e) => e.split(" ").join(""))
          .map((e) => Number(e));
        let newValue = 0;
        newNumbers.forEach((e) => {
          newValue += e;
        });
        this.Numerator = newValue;
      } else {
        let numberatorTextWithoutSpaces: string = content.match(
          new RegExp(numberpattern),
        )![0];
        numberatorTextWithoutSpaces = numberatorTextWithoutSpaces
          .split(" ")
          .join("");
        this.Numerator = Number(numberatorTextWithoutSpaces);
      }
    }

    const NumAndDen = simplify(
      this.Numerator,
      this.Denominator,
      this.Numerator > this.Denominator ? this.Numerator : this.Denominator,
    );

    this.Numerator = NumAndDen[0];
    this.Denominator = NumAndDen[1];
  }

  turnIntoDecimal() {
    if (this.Numerator == 0) {
      return this.Numerator;
    } else {
      return this.Numerator / this.Denominator;
    }
  }
}
function invertNumber(number: number): number {
  return number * -1;
}

function simplify(
  numerator: number,
  denominator: number,
  highestNumber: number,
  changingNumber: number = 2,
): number[] {
  if (changingNumber >= highestNumber) {
    return [numerator, denominator];
  } else {
    const numeritorIsDivisibleByChangingNumber: boolean =
      numerator % changingNumber == 0;
    const denominatorIsDivisibleByChangingNumber: boolean =
      denominator % changingNumber == 0;
    if (
      numeritorIsDivisibleByChangingNumber &&
      denominatorIsDivisibleByChangingNumber
    ) {
      numerator /= changingNumber;
      denominator /= changingNumber;
      highestNumber = numerator > denominator ? numerator : denominator;
      // this resets divisible number so it can check again if the same divisible number is repeated
      return simplify(numerator, denominator, highestNumber, 2);
    } else {
      return simplify(
        numerator,
        denominator,
        highestNumber,
        changingNumber + 1,
      );
    }
  }
}
