import { Dispatch, SetStateAction } from "react"

export type PasswordGeneratorProps = {
    setLengthPassword: Dispatch<SetStateAction<number>>
    lengthPassword: number
    isMayus: boolean
    setIsMayus: Dispatch<SetStateAction<boolean>>
    isMinus: boolean
    setIsMinus: Dispatch<SetStateAction<boolean>>
    isSpecialCharacter: boolean
    setIsSpecialCharacter: Dispatch<SetStateAction<boolean>>
    isNumber: boolean
    setIsNumber: Dispatch<SetStateAction<boolean>>
}