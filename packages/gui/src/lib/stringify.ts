import { isElement, isNil } from 'lodash-es'
import {
  Color,
  Length,
  MultidimensionalLength,
  Position,
  CSSFunctionCalc,
} from '../types/css'
import {
  addCSSClassSyntax,
  isInternalCSSClass,
  removeInternalCSSClassSyntax,
} from './classes'
import { addPseudoSyntax } from './pseudos'
import { isMultidimensionalLength } from './util'

export function stringifySelector(selector: string): string {
  if (isElement(selector)) {
    return selector
  }
  if (isInternalCSSClass(selector)) {
    return addCSSClassSyntax(removeInternalCSSClassSyntax(selector))
  }

  return addPseudoSyntax(selector)
}

export const stringifyCalcFunction = ({ arguments: args }: CSSFunctionCalc) => {
  const x = stringifyUnit(args.valueX)
  const y = stringifyUnit(args.valueY)
  return `calc(${x} ${args.operand} ${y})`
}

export function stringifyUnit(
  providedValue: Length | MultidimensionalLength
): string | number | null {
  if (isMultidimensionalLength(providedValue)) {
    return (providedValue as MultidimensionalLength).values
      .map(stringifyUnit)
      .join(' ')
  }

  const value = providedValue as Length

  if (value === '0') {
    return value
  }
  if (!value || value.value === undefined) {
    return null
  }

  if (['theme', 'raw', 'keyword', 'calc'].includes(value.unit)) {
    return value.value
  }

  if (value.unit === 'string') {
    // TODO handle string escapes
    return `'${value.value}'`
  }

  if (value.unit === 'number') {
    return String(value.value)
  }

  return `${value.value}${value.unit || DEFAULT_LENGTH_UNIT}`
}

const DEFAULT_LENGTH_UNIT = 'px'

export function stringifyFunction(
  name: string,
  properties: Primitive[],
  separator: string = ', '
) {
  return `${name}(${properties
    .filter((x) => !isNil(x))
    .map(stringifyPrimitive)
    .join(separator)})`
}

export function stringifyValues(
  properties: (Primitive | null)[],
  separator: string = ' '
) {
  return `${properties
    .filter((x) => !isNil(x))
    .map(stringifyPrimitive as any)
    .join(separator)}`
}

export function stringifyPosition(position: Position) {
  return `${stringifyUnit(position.x)} ${stringifyUnit(position.y)}`
}

export function stringifyPrimitive(value: Primitive) {
  if (typeof value === 'number') {
    return '' + value
  }
  if (typeof value === 'string') {
    return value
  }
  return stringifyUnit(value)
}

type Primitive = Length | number | Color | MultidimensionalLength
