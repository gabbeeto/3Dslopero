import {createRoot} from 'react-dom/client'
import './index.css'
import generateSlope from './displayGraph/applyButton'

window.jsxContainer = (<></>)



let root = createRoot(document.getElementById('root')!)
render()

export default function render() {
	root = createRoot(document.getElementById('root')!)
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
				{window.jsxContainer}
			</main >
		</>)
	)
}

