import {createRoot} from 'react-dom/client'
import './index.css'
import {Canvas, extend, useFrame} from '@react-three/fiber'
import getContainersOfPairs from './slopeGenerator'
import {OrbitControls} from '@react-three/drei'
import myFonts from 'three/examples/fonts/helvetiker_regular.typeface.json'
import * as THREE from 'three';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
extend({TextGeometry})
import {FontLoader} from 'three/examples/jsm/Addons.js'
import MaxAndMinValuesForShowingLines from './minAndMax'
import basicLine from './basicLine'

import {useEffect, useState} from 'react'
let jsxContainer = (<></>)


interface xyz {
	[key: string]: number | undefined,
	x: number,
	y: number,
	z: number,
}


function changeOutputText(outputText: string) {
	let outputElement = document.querySelector('output')!
	outputElement.innerHTML = outputText;
}

function ReturnPoints({container, mainAxis}: {container: any[], mainAxis: string}) {

	return container.map((e, i) => {
		let [isHovered, changeHoverState] = useState(false)

		let isSlope = false
		let remaningAxis = []

		switch (mainAxis) {
			case 'y':
				remaningAxis = ['x', 'z']
				console.log({e,mainAxis,remaningAxis})
				break;
			case 'x':
				remaningAxis = ['y', 'z']
				console.log({e,mainAxis:mainAxis,remaningAxis})
				break;
			default:
				remaningAxis = ['x', 'y']
				console.log({e,mainAxis:mainAxis,remaningAxis})
				break;
		}
		let mainAXisIsANonZeroNumber = e[mainAxis] != 0
		let remainingAxisAreZero = e[remaningAxis[0]] == 0 && e[remaningAxis[1]] == 0
		if (mainAXisIsANonZeroNumber && remainingAxisAreZero) {
			isSlope = true
		}

		return (
			<mesh onPointerOver={() => {
				changeHoverState(true);
				changeOutputText(`(x:${e['x']},y:${e['y']},z:${e['z']} )`)
			}}
				onPointerOut={() => {
					changeHoverState(false)
					changeOutputText('')
				}}
				key={i} position={[e['x'], e['z'], e['y']]}>
				<boxGeometry args={[0.5, 0.5, 0.5]} />

				<meshBasicMaterial color={isHovered ? '#711D1D' : (isSlope ? '#FFDD1C' : '#4C711D')} />
			</mesh>)
	})
}



function makeLinesFromOverWorldForAxis(axisContainer: xyz[], axis: string): THREE.Group {
	let materialForOverWorldLines = new THREE.LineBasicMaterial({color: 0x26A827})

	let pointsForLinesFromOverWold = axisContainer.map(e => {return new THREE.Vector3(e['x'], e['z'], e['y']);});


	let geometryForOverwolrdLines = new THREE.BufferGeometry().setFromPoints(pointsForLinesFromOverWold)


	let LineFromOverWorld = new THREE.Line(geometryForOverwolrdLines, materialForOverWorldLines);

	let groupOfTextAndLines = new THREE.Group()

	groupOfTextAndLines.add(LineFromOverWorld)


	let font = new FontLoader().parse(myFonts)

	const textOptions = {
		font,
		size: 0.05,
		height: 0.05,
		depth: 0.025,
	};


	axisContainer.forEach((e) => {
		let numberFromAxis = e[axis];
		let textG = new TextGeometry(`(${axis}:${numberFromAxis})`, textOptions);
		let text = new THREE.Mesh(textG, new THREE.MeshBasicMaterial({color: 0x26A827}));
		text.position.x = e.x;
		text.position.y = e.z;
		text.position.z = e.y;
		groupOfTextAndLines.add(text);
	});



	return groupOfTextAndLines


}

function generateSlope(textGraph: string, amountOfVarialbe: string) {

	console.log()

	let container: any[] = getContainersOfPairs(textGraph, Number(amountOfVarialbe));
	let [smallesValues, biggestValues] = MaxAndMinValuesForShowingLines(container);

	let basicLines: {
		x: xyz[],
		y: xyz[],
		z: xyz[],
	} = basicLine(smallesValues, biggestValues)

	let xLinesPoints = basicLines.x;
	let yLinesPoints = basicLines.y;
	let zLinesPoints = basicLines.z;
	let xLines = makeLinesFromOverWorldForAxis(xLinesPoints, 'x')
	let yLines = makeLinesFromOverWorldForAxis(yLinesPoints, 'y')
	let zLines = makeLinesFromOverWorldForAxis(zLinesPoints, 'z')


	let materialForLine = new THREE.LineBasicMaterial({color: 0x0000ff})
	let pointsForLine = container.map(e => {return new THREE.Vector3(e['x'], e['z'], e['y'])});
	let geometryForLine = new THREE.BufferGeometry().setFromPoints(pointsForLine);
	let line = new THREE.Line(geometryForLine, materialForLine);


	let font = new FontLoader().parse(myFonts)
	// configure font geometry
	const textOptions = {
		font,
		size: 0.1,
		height: 0.1,
		depth: 0.05,
	};


	let groupOfText = new THREE.Group()

	container.forEach((e) => {
		let textG = new TextGeometry(`(x:${e.x},y:${e.y},z:${e.z})`, textOptions)
		let text = new THREE.Mesh(textG, new THREE.MeshBasicMaterial({color: 'white'}))
		text.position.x = e.x - 0.3
		text.position.y = e.z + 0.3
		text.position.z = e.y
		groupOfText.add(text)
	});

	jsxContainer = (<>
		<h2>enjoy the graph :)</h2>
		<Canvas>
			<OrbitControls />
			<primitive object={groupOfText} position={[0, 0, 0]} />
			<primitive object={line} position={[0, 0, 0]} />
			<primitive object={xLines} position={[0, 0, 0]} />
			<primitive object={yLines} position={[0, 0, 0]} />
			<primitive object={zLines} position={[0, 0, 0]} />
			<ReturnPoints container={container} mainAxis={textGraph.split("=")[0].match(/(x|y|z)/)![0]} />
		</Canvas>
	</>)


	render()

}


let root = createRoot(document.getElementById('root')!)
render()
function render() {

	root.render(
		(<><header><h1>3D SLOPERO</h1></header>
			<main>
				<fieldset>
					<legend>
						options for the graph
					</legend>

					<label htmlFor="equationText" >Write equation to graph</label>
					<input id='equationText' type="text" placeholder="y = 2x + 6z" />
					<label htmlFor="variableAmount" >amount of variable</label>
					<input type="number" name="variableAmount" id="variableAmount" placeholder='10' />
					<button onClick={() => {
						let equationText: HTMLInputElement = document.querySelector('#equationText')!
						let variableAmount: HTMLInputElement = document.querySelector('#variableAmount')!
						generateSlope(equationText.value, variableAmount.value)
					}}>apply</button>
					<output ></output>
				</fieldset>
				{jsxContainer}
			</main >
		</>)
	)
}

