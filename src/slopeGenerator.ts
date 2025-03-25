export default function getContainersOfPairs(textGraph: string, amountOfVarialbe: number): {x: number, y: number, z: number}[] {
	const numberRegex: RegExp = /[0-9\.\-xz]+/g;
	let numbersButText = [...textGraph.matchAll(numberRegex)].map(e => e[0])

	// divide xyz into different variables so we can continue with slope
	console.log(numbersButText)
	alert(textGraph)
	alert(amountOfVarialbe)
return [{x:0,y:0,z:0}]
}
