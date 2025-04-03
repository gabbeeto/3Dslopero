import {Canvas} from '@react-three/fiber'
import getContainersOfPairs from './../algorithms/slopeGenerator'
import {OrbitControls} from '@react-three/drei'
import myFonts from 'three/examples/fonts/helvetiker_regular.typeface.json'
import * as THREE from 'three';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import {FontLoader} from 'three/examples/jsm/Addons.js'
import {useState} from 'react'
import render from './../main';
import makeOverWorldLines from './makeOverWorldLines';


export default function generateSlope(textGraph: string, amountOfVarialbe: string) {

	window.jsxContainer = (<>
		<h2>enjoy the graph :)</h2>
		<DisplayOn3D textGraph={textGraph} amountOfVarialbe={amountOfVarialbe} />
	</>)
	render()
}

function DisplayOn3D({textGraph, amountOfVarialbe}: {textGraph: string, amountOfVarialbe: string}) {

	let container: xyzNumbers[] = getContainersOfPairs(textGraph, Number(amountOfVarialbe));
	generateValues(container)

	let [xOverworldLines, yOverworldLines, zOverworldLines] = makeOverWorldLines(container)

	let lineForXYZPoints = makeLinesForXYZPoints(container)
	let textForXYZPoints = makeTextForPoints(container)


	return (<Canvas >
		<OrbitControls />
		<primitive object={xOverworldLines} position={[0, 0, 0]} />
		<primitive object={yOverworldLines} position={[0, 0, 0]} />
		<primitive object={zOverworldLines} position={[0, 0, 0]} />

		<primitive object={textForXYZPoints} position={[0, 0, 0]} />
		<primitive object={lineForXYZPoints} position={[0, 0, 0]} />
		<MakeXYZPoints container={container} mainAxis={textGraph.split("=")[0].match(/(x|y|z)/)![0]} />
	</Canvas>)

}

function makeLinesForXYZPoints(container: xyzNumbers[]): THREE.Line {
	let materialForLine = new THREE.LineBasicMaterial({color: 0x0000ff})
	let pointsForLine = container.map(e => {return new THREE.Vector3(e['x'], e['z'], e['y'])});
	let geometryForLine = new THREE.BufferGeometry().setFromPoints(pointsForLine);
	let line = new THREE.Line(geometryForLine, materialForLine);
	return line
}

function makeTextForPoints(container: xyzNumbers[]): THREE.Group {
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
		text.position.x = Number(e.x) - 0.3
		text.position.y = Number(e.z) + 0.3
		text.position.z = Number(e.y)
		groupOfText.add(text)
	});

	return groupOfText

}


function MakeXYZPoints({container, mainAxis}: {container: xyzNumbers[], mainAxis: string}) {

	return container.map((e, i) => {
		let [isHovered, changeHoverState] = useState(false)

		let isSlope = false
		let remaningAxis = []

		switch (mainAxis) {
			case 'y':
				remaningAxis = ['x', 'z']
				break;
			case 'x':
				remaningAxis = ['y', 'z']
				break;
			default:
				remaningAxis = ['x', 'y']
				break;
		}
		let remainingAxisAreZero = e[remaningAxis[0]] == 0 && e[remaningAxis[1]] == 0
		if (remainingAxisAreZero) {
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
				key={i} position={[Number(e['x']), Number(e['z']), Number(e['y'])]}>
				<boxGeometry args={[0.5, 0.5, 0.5]} />

				<meshBasicMaterial color={isHovered ? '#711D1D' : (isSlope ? '#FFDD1C' : '#4C711D')} />
			</mesh>)
	})
}

function changeOutputText(outputText: string) {
	let outputElement = document.querySelector('output')!
	outputElement.innerHTML = outputText;
}


function generateValues(container: xyzNumbers[]) {

	window.xyzContainer = container.map(e => {
		return (<li>
			<p>(x:{e['x']},y:{e['y']},z:{e['z']})</p>
		</li>)

	})
}
