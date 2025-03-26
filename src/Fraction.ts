
export class Fraction {
	Numerator: number = 1;
	Denominator: number = 1;

	constructor(content: string = "empty") {

		if(content == "empty"){
		this.Numerator = 0
		this.Denominator = 0;
		}

		let itsAFraction: Boolean = content.includes("(")
		const numberpattern = '(-| -|- )?[0-9]+'
		if (itsAFraction) {
			let [numeratorText, _symbol, denominatorText] = content.split(/(\\|\/|%)/u);
			let numberatorTextButShort: string = numeratorText.match(new RegExp(numberpattern))![0];
			let denominatorTextButShort: string = denominatorText.match(new RegExp(numberpattern))![0];

			let numberatorTextWithoutSpaces: string = numberatorTextButShort.split(" ").join("")
			let denominatorTextWithoutSpaces: string = denominatorTextButShort.split(" ").join("")
			this.Numerator = Number(numberatorTextWithoutSpaces)
			this.Denominator = Number(denominatorTextWithoutSpaces)

			let bothValuesAreNegative: boolean = this.Numerator < 0 && this.Denominator < 0
			let fractionFlipled = this.Numerator >= 0 && this.Denominator < 0;
			if (bothValuesAreNegative || fractionFlipled) {
				this.Numerator = invertNumber(this.Numerator)
				this.Denominator = invertNumber(this.Denominator)
			}

			let contentIsNegative: boolean = content[0] == '-'
			if (contentIsNegative) {
				this.Numerator = invertNumber(this.Numerator)
			}
		}
		else if(content != "empty"){

		let numberatorTextWithoutSpaces: string = content.match(new RegExp(numberpattern))![0]
		numberatorTextWithoutSpaces = numberatorTextWithoutSpaces.split(" ").join("")
		this.Numerator = Number(numberatorTextWithoutSpaces);

		}

		let NumAndDen =	simplify(this.Numerator, this.Denominator, this.Numerator > this.Denominator ? this.Numerator : this.Denominator) 

		this.Numerator = NumAndDen[0];
		this.Denominator = NumAndDen[1];
	}


}
function invertNumber(number: number): number {
	return number	*-1;

}

function simplify(numerator: number, denominator: number, highestNumber: number, changingNumber: number = 2):  number[] {
		console.log({numerator, denominator, highestNumber, changingNumber})
		if (changingNumber >= highestNumber) {
			return [numerator, denominator];
		}
		else {
			let numeritorIsDivisibleByChangingNumber: boolean = numerator % changingNumber == 0;
			let denominatorIsDivisibleByChangingNumber: boolean = denominator % changingNumber == 0;
			if (numeritorIsDivisibleByChangingNumber && denominatorIsDivisibleByChangingNumber) {
				numerator /= changingNumber
				denominator /= changingNumber
				highestNumber = numerator > denominator ? numerator : denominator;
				// this resets divisible number so it can check again if the same divisible number is repeated
				return simplify(numerator, denominator, highestNumber, 2)
			}
			else {
				return simplify(numerator,denominator,highestNumber,changingNumber + 1)
			}

		}

	}
