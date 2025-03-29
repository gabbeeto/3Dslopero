interface xyz {
	x: number,
	y: number,
	z: number,
}

export default function getMinAndMaxForTable(tableOfContent: any[]): xyz[] {
	let biggestPair: xyz = {
		x: tableOfContent[0]['x'],
		y: tableOfContent[0]['y'],
		z: tableOfContent[0]['z'],
	}
	let smallestPair: xyz = {
		x: tableOfContent[0]['x'],
		y: tableOfContent[0]['y'],
		z: tableOfContent[0]['z'],
	}

	biggestPair['y'] =  tableOfContent.reduce((a,c) => {return a > c['y'] ? a : c['y']}, tableOfContent[0]['y']);
	biggestPair['x'] =  tableOfContent.reduce((a,c) => {return a > c['x'] ? a : c['x']}, tableOfContent[0]['x']);
	biggestPair['z'] =  tableOfContent.reduce((a,c) => {return a > c['z'] ? a : c['z']}, tableOfContent[0]['z']);

	smallestPair['y'] =  tableOfContent.reduce((a,c) => {return a < c['y'] ? a : c['y']}, tableOfContent[0]['y']);
	smallestPair['x'] =  tableOfContent.reduce((a,c) => {return a < c['x'] ? a : c['x']}, tableOfContent[0]['x']);
	smallestPair['z'] =  tableOfContent.reduce((a,c) => {return a < c['z'] ? a : c['z']}, tableOfContent[0]['z']);

	biggestPair['y'] += 1
	biggestPair['x'] += 1
	biggestPair['z'] += 1

	smallestPair['y'] -= 1
	smallestPair['x'] -= 1
	smallestPair['z'] -= 1

	return [smallestPair, biggestPair]
}
