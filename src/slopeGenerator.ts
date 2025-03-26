import {Fraction} from "./Fraction";

export default function getContainersOfPairs(textGraph: string, amountOfVarialbe: number): {x: Fraction, y: Fraction, z: Fraction, interceptValue: Fraction}[] {
	let interceptFormTerms = getMainValue(textGraph)
	let mainVariable = getMainVariable(textGraph)
	let newInterceptForms = {}
	switch (mainVariable) {
		case 'y':
			newInterceptForms = {x: interceptFormTerms['x'], z: interceptFormTerms['z'], interceptValue: interceptFormTerms['interceptValue']};
			break;
		case 'x':
			newInterceptForms = {y: interceptFormTerms['y'], z: interceptFormTerms['z'], interceptValue: interceptFormTerms['interceptValue']};
			break;
		default:
			newInterceptForms = {y: interceptFormTerms['y'], x: interceptFormTerms['x'], interceptValue: interceptFormTerms['interceptValue']};
			break;
	}
	console.log(newInterceptForms)
	// TODO-make the tables of pairs with with both slopes and return it
	return [interceptFormTerms]
}

function getMainVariable(textGraph: string): string {
	return textGraph.split("=")![0].match(/(x|y|z)/)![0]
}

function getMainValue(textGraph: string): {x: Fraction, y: Fraction, z: Fraction, interceptValue: Fraction} {

	const negative = "(-| -|- )?"
	const numberPattern = `${negative} ?[0-9]+`
	const wholeNumberTerm = `${numberPattern}(x|z|y)?`;

	const divisionSymbols = "(\\\\|\\/|%)"
	const fractionNumberTerm = `${negative}\\( ?${numberPattern} ?${divisionSymbols} ?${numberPattern} ?\\) ?(x|z|y)?`;

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
