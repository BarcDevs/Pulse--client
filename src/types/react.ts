import {HTMLProps} from 'react'

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type ClassName = HTMLProps<HTMLElement>['className']
