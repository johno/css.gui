import {
  stringifyPosition,
  stringifyUnit,
  stringifyValues,
} from '../../../lib/stringify'
import { stringifyImageSource } from '../ImageSource/stringify'
import { Background, BgSize, RepeatStyle } from './types'

export function stringifyBackgroundList(backgrounds: Background[]) {
  return backgrounds.map(stringifyBackground).join(', ')
}

export function stringifyBackground(background: Background) {
  const { attachment, clip, image, origin, position, repeat, size } = background
  return stringifyValues([
    stringifyImageSource(image),
    stringifyPosition(position),
    `/ ${stringifySize(size)}`,
    stringifyRepeatStyle(repeat),
    attachment,
    origin,
    clip,
  ])
}

export function stringifySize(size: BgSize) {
  return `${stringifyUnit(size.x)} ${stringifyUnit(size.y)}`
}

export function stringifyRepeatStyle(repeat: RepeatStyle) {
  return `${repeat.x} ${repeat.y}`
}
