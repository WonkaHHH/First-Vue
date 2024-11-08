export interface ElementStyle {
  width: number
  height: number
}
interface Element {
  /** 唯一标识 */
  uuid: string
  /** 物体类别 */
  type: number
  /** 样式 */
  style: ElementStyle
  /** 位置 */
  positionX?: number
  positionY?: number
  /** 物体名称 */
  name: string
}
export interface ImgElement extends Element {
  /** 展示类别 */
  elemType: 'image'
  /** 图片来源 */
  src: string
}

export interface TextElement extends Element {
  elemType: 'text'
  /** 文本内容 */
  text: string
}

export type ElementType = ImgElement | TextElement
