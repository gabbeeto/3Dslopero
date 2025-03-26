import {createRoot} from 'react-dom/client'
import './index.css'
import {Canvas, useFrame} from '@react-three/fiber'
import getContainersOfPairs from './slopeGenerator'
import { Fraction } from './Fraction'


function generateSlope(textGraph: string, amountOfVarialbe: string) {
	let container: {x: Fraction, y: Fraction, z: Fraction, interceptValue: Fraction}[] = getContainersOfPairs(textGraph, Number(amountOfVarialbe));
	console.log(container)
}

createRoot(document.getElementById('root')!).render(
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
			<Canvas>

				<mesh>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial color={'#1D7169'} />
				</mesh>
			</Canvas>
		</main>
	</>)
)
