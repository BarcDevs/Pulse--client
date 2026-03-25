import {
    Dispatch,
    HTMLProps,
    SetStateAction
} from 'react'

export type SetState<T> = Dispatch<SetStateAction<T>>
export type ClassName = 
    HTMLProps<HTMLElement>['className']
