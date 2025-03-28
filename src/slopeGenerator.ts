import {Fraction} from "./Fraction";

interface xyz {
	[key: string]: Fraction | undefined,
	x?: Fraction,
	y?: Fraction,
	z?: Fraction,
	interceptValue: Fraction
}


interface onlyXYZ {
	[key: string]: number | undefined,
	x?: number,
	y?: number,
	z?: number,
}

export default function getcontainersofpairs(textgraph: string, amountofvarialbe: number): onlyXYZ[] {
	let interceptformterms = getMainValue(textgraph)
	let mainvariable = getMainVariable(textgraph)
	let newInterceptForms: xyz = {interceptValue: new Fraction()}
	switch (mainvariable) {

		case 'y':
			newInterceptForms = {x: interceptformterms['x'], z: interceptformterms['z'], interceptValue: interceptformterms['interceptValue']};
			break;
		case 'x':
			newInterceptForms = {y: interceptformterms['y'], z: interceptformterms['z'], interceptValue: interceptformterms['interceptValue']};
			break;
		default:
			newInterceptForms = {y: interceptformterms['y'], x: interceptformterms['x'], interceptValue: interceptformterms['interceptValue']};
			break;
	}
	// todo-make the tables of pairs with with both slopes and return it



	let tableofpairs: onlyXYZ[] = gettable(newInterceptForms, amountofvarialbe, mainvariable)

	return tableofpairs
}

function gettable(slopes: xyz, amount: number, mainvariable: string): onlyXYZ[] {


	let oppositesfrommain: number[] = [];

	for (let k in slopes) {
		oppositesfrommain.push(slopes[k]!.turnIntoDecimal())
	}

	let mainvalues: onlyXYZ[] = [];
	for (let i: number = 0; i < amount; i++) {
		let othervariables: string[] = []
		switch (mainvariable) {
			case "y":
				othervariables = ['x', 'z'];
				break;
			case "x":
				othervariables = ['y', 'z'];
				break;
			default:
				othervariables = ['x', 'y'];
				break;
		}

		let firstoppositevariable = oppositesfrommain[0] * i
		for (let i2: number = 0; i2 < amount; i2++) {
			let secondoppositevariable = oppositesfrommain[1] * i2
			let thirdoppositevariable = oppositesfrommain[2];


			let pair: onlyXYZ = {}

			pair[mainvariable] = firstoppositevariable + secondoppositevariable + thirdoppositevariable;
			console.log(secondoppositevariable)
			console.log(othervariables[1])
			// prevents objects from spawning 
			pair[othervariables[0]] = returnVar(firstoppositevariable, i)
			pair[othervariables[1]] = returnVar(secondoppositevariable, i2)
			if (i > 0) {
				let negative2nd: onlyXYZ = {}
				negative2nd[mainvariable] = (firstoppositevariable * -1) + (secondoppositevariable) + thirdoppositevariable;

				negative2nd[othervariables[0]] = returnVar(firstoppositevariable, i, true)
				negative2nd[othervariables[1]] = returnVar(secondoppositevariable, i2)


				let negative2ndIsnotInArray: boolean = pairIsNotInArray(mainvalues, negative2nd, [mainvariable,othervariables[0],othervariables[1]]);
				if (negative2ndIsnotInArray) {
					mainvalues.push(negative2nd)
				}

			}

			if (i2 > 0) {
				let negative3rd: onlyXYZ = {}
				negative3rd[mainvariable] = (firstoppositevariable) + (secondoppositevariable * -1) + thirdoppositevariable;
				negative3rd[othervariables[0]] = returnVar(firstoppositevariable, i)
				negative3rd[othervariables[1]] = returnVar(secondoppositevariable, i2, true)


				let negative3rdIsnotInArray: boolean = pairIsNotInArray(mainvalues, negative3rd, [mainvariable,othervariables[0],othervariables[1]]);
				if (negative3rdIsnotInArray) {
					mainvalues.push(negative3rd)
				}

			}

			let pairIsnotInArray: boolean = pairIsNotInArray(mainvalues, pair, [mainvariable,othervariables[0],othervariables[1]]);
			if (pairIsnotInArray) {
				mainvalues.push(pair)
			}
		}

	}

	return mainvalues
}

function pairIsNotInArray(mainArray: any[], secondaryArray: onlyXYZ, valuesToCompare: any[] ): boolean{
return !mainArray.some(item =>
		item[valuesToCompare[0]] === secondaryArray[valuesToCompare[0]] &&
		item[valuesToCompare[1]] === secondaryArray[valuesToCompare[1]] &&
		item[valuesToCompare[2]] === secondaryArray[valuesToCompare[2]]);

}

function returnVar(item: number, index: number, negative: boolean = false): number {
	let one = negative ? -1 : 1
	if (item == 0) {
		return 0;
	}
	else {
		return index * one;
	}
}

function getMainVariable(textGraph: string): string {
	return textGraph.split("=")![0].match(/(x|y|z)/)![0]
}

function getMainValue(textGraph: string): {x: Fraction, y: Fraction, z: Fraction, interceptValue: Fraction} {

	const negative = "(-| -|- )?"
	const numberPattern = `${negative} ?[0-9]+`
	const wholeNumberTerm = `${numberPattern}(x|z|y)?`;

	const divisionSymbols = "(\\\\|\\/|%)"
	const fractionNumberTerm = `${negative}\\( ?${numberPattern} ?${divisionSymbols}? ?${numberPattern} ?\\) ?(x|z|y)?`;

	const numberRegex: RegExp = new RegExp(`(${wholeNumberTerm}|${fractionNumberTerm})`, 'g')

	let numberButText = [...textGraph.matchAll(numberRegex)].map(e => e[0])


	let variables = {x: new Fraction(), y: new Fraction(), z: new Fraction(), interceptValue: new Fraction()}


	numberButText.forEach(e => {
		if (e.includes('x')) {
			variables['x'] = new Fraction(e);
		}
		else if (e.includes('y')) {
			variables['y'] = new Fraction(e);
		}
		else if (e.includes('z')) {
			variables['z'] = new Fraction(e);
		} else {
			variables["interceptValue"] = new Fraction(e);
		}

	})


	return variables


}
