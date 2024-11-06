export interface ElementStyle {
  width: number
  height: number
}
interface Element {
  uuid: string
  type: number
  style: ElementStyle
}
export interface ImgElement extends Element {
  elemType: 'image'
  src: string
}

export interface TextElement extends Element {
  elemType: 'text'
  text: string
}

export type ElementType = ImgElement | TextElement
