import {Fraction} from "./Fraction"

declare global {
	interface xyzNumbers {
		[key: string]: number | undefined,
		x?: number,
		y?: number,
		z?: number,
	}

	interface xyzFractions {
		[key: string]: Fraction | undefined,
		x?: Fraction,
		y?: Fraction,
		z?: Fraction,
		interceptValue: Fraction
	}

	interface xyzContainers {
		[key: string]: xyzNumbers[] | undefined,
		x?: xyzNumbers[],
		y?: xyzNumbers[],
		z?: xyzNumbers[],
	}

	interface Window {jsxContainer: any}
}
