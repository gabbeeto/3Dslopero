interface xyz {
	[key: string]: number | undefined,
	x: number,
	y: number,
	z: number,
}

export default function basicLine(smallesValues:xyz, biggestValues: xyz): {x: xyz[], y: xyz[], z:xyz[]}{


	let xDistance = (biggestValues['x'] - smallesValues['x']) ; 
	let yDistance = (biggestValues['y'] - smallesValues['y']) ;
	let zDistance = (biggestValues['z'] - smallesValues['z']) ;


	let xLines=[]
	for(let index = 0; (index -1) < xDistance; index++){
		xLines.push({z:0,y:0,x:index + smallesValues['x']});
	}


	let yLines=[]
	for(let index = 0; (index -1) < yDistance; index++){
		yLines.push({z:0,x:0,y:index + smallesValues['y']});
	}


	let zLines=[]
	for(let index = 0; (index -1) < zDistance; index++){
		zLines.push({x:0,y:0,z:index + smallesValues['z']});
	}

let allThePoints = {x:xLines,y:yLines,z:zLines}

return allThePoints;
}





