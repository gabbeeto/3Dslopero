interface xyz {
	x: number,
	y: number,
	z: number,
}

export default function basicLine(smallesValues:xyz, biggestValues: xyz): xyz[]{


	let xDistance = (biggestValues['x'] - smallesValues['x']) ; 
	let yDistance = (biggestValues['y'] - smallesValues['y']) ;
	let zDistance = (biggestValues['z'] - smallesValues['z']) ;


	let xLines=[]
	for(let index = 0; (index -1) < xDistance; index++){
		xLines.push({z:0,y:0,x:index + smallesValues['x']});
	}


	let yLines=[]
	for(let index = 0; (index -1) < yDistance; index++){
		yLines.push({z:0,y:0,x:index + smallesValues['y']});
	}


	let zLines=[]
	for(let index = 0; (index -1) < zDistance; index++){
		zLines.push({z:0,y:0,x:index + smallesValues['z']});
	}

return [{x:0,y:0,z:0}, {x:0,y:0,z:0}]
}





