import MaxAndMinValuesForShowingLines from './../algorithms/minAndMax'
import getPointsForOverWorldLines from './../algorithms/basicLine'
import * as THREE from 'three';
import {FontLoader} from 'three/examples/jsm/Addons.js'
import myFonts from 'three/examples/fonts/helvetiker_regular.typeface.json'
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';

export default function makeOverWorldLines(container: xyzNumbers[]): THREE.Group[] {

	let [smallesValues, biggestValues] = MaxAndMinValuesForShowingLines(container) as xyzNumbers[];

	let pointsContainer: xyzContainers = getPointsForOverWorldLines(smallesValues, biggestValues)

	let xLinesPoints: xyzNumbers[] = pointsContainer.x as (xyzNumbers[]);
	let yLinesPoints: xyzNumbers[] = pointsContainer.y as (xyzNumbers[]);
	let zLinesPoints: xyzNumbers[] = pointsContainer.z as (xyzNumbers[]);
	let xLines = makeLinesFromOverWorldForAxis(xLinesPoints, 'x')
	let yLines = makeLinesFromOverWorldForAxis(yLinesPoints, 'y')
	let zLines = makeLinesFromOverWorldForAxis(zLinesPoints, 'z')

	return [xLines, yLines, zLines]
}

function makeLinesFromOverWorldForAxis(axisContainer: xyzNumbers[], axis: string): THREE.Group {
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
		text.position.x = Number(e.x);
		text.position.y = Number(e.z);
		text.position.z = Number(e.y);
		groupOfTextAndLines.add(text);
	});

	return groupOfTextAndLines
}
