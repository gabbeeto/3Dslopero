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

let jsxContainer = (<></>)



function generateSlope(textGraph: string, amountOfVarialbe: string) {
	let container: any[] = getContainersOfPairs(textGraph, Number(amountOfVarialbe));
	let [smallesValues, biggestValues] =  MaxAndMinValuesForShowingLines(container);

  let basicLines	= basicLine(smallesValues, biggestValues)
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
			{container.map((e, i) => {

				return (
					<mesh key={i} position={[e['x'], e['z'], e['y']]}>
						<boxGeometry args={[0.5, 0.5, 0.5]} />
						<meshBasicMaterial color={'#1D7169'} />
					</mesh>)
			})}
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
				</fieldset>
				{jsxContainer}
			</main >
		</>)
	)
}

