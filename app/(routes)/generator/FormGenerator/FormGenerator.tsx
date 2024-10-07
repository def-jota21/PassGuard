'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { copyClipboard } from "@/lib/copyClipboard"
import { generatePassword } from "@/lib/generatePassword"
import { Copy, Radio, Shuffle, User } from "lucide-react"
import { useEffect, useState } from "react"
import PasswordGenerator from "./PasswordGenerator/PasswordGenerator"
import UserGenerator from "../UserGenerator/UserGenerator"
import { generateCustomPassword } from "@/lib/generateCustomPassword"
import { generateRandomUser } from "@/lib/generateRandomUser"
import { generateRandomEmail } from "@/lib/generateRandomEmail"

export default function FormGenerator() {
    const [selected, setSelected] = useState<"password" | "user" | string>("password")
    const [itemValueItem, setItemValueItem] = useState("")
    const [userType, setUserType] = useState("username")
    const [lengthPassword, setLengthPassword] = useState(12)
    const [isMayus, setIsMayus] = useState(true)
    const [isMinus, setIsMinus] = useState(true)
    const [isSpecialCharacter, setIsSpecialCharacter] = useState(true)
    const [isNumber, setIsNumber] = useState(true)

    useEffect(() => {
        if (selected === "password") {
            const password = generateCustomPassword(
                lengthPassword,
                isMayus,
                isMinus,
                isSpecialCharacter,
                isNumber
            )
            setItemValueItem(password)
        }
    },
        [
            lengthPassword,
            isMayus,
            isMinus,
            isSpecialCharacter,
            isNumber,
            selected
        ])
    
    useEffect(() => {
        if (selected === "user") {
            const newUser = generateRandomUser(lengthPassword)
            setItemValueItem(newUser)
        }
        if (userType === "email") {
            const newEmail = generateRandomEmail(lengthPassword)
            setItemValueItem(newEmail)
        }
    },
        [
            selected,
            userType,
        ])
    const handleShufflePassword = () => {
        if (selected === "password") {
            const password = generateCustomPassword(
                lengthPassword,
                isMayus,
                isMinus,
                isSpecialCharacter,
                isNumber
            )
            setItemValueItem(password)
        }else if (selected === "user") {
            if (userType === "username") {
                const newUser = generateRandomUser(lengthPassword)
                setItemValueItem(newUser)       
            }else if (userType === "email") {
                const newEmail = generateRandomEmail(lengthPassword)
                setItemValueItem(newEmail)       
            }     
        }
    }

    return (
        <div className="mt-5 max-2xl">
            <div className="relative w-full">
                <Input placeholder="Password" value={itemValueItem} onChange={(e) => setItemValueItem(e.target.value)} />
                <Copy className="absolute right-12 top-3 cursor-pointer h-5 w-5"
                    onClick={() => copyClipboard(itemValueItem)}
                />
                <Shuffle className="absolute right-2 top-3 cursor-pointer h-5 w-5"
                    onClick={handleShufflePassword}
                />
            </div>
            <div className="bg-slate-100 rounded-md shadow-md my-4 p-4">
                <p className="mb-4 text-slate-500">What do you want to generate?</p>
                <RadioGroup defaultValue="password" onValueChange={(value) => setSelected(value)} >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="password" id="password" />
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="user" id="user" />
                        <Label htmlFor="user">User</Label>
                    </div>
                </RadioGroup>
            </div>
            {selected === "password" &&
                <PasswordGenerator
                    lengthPassword={lengthPassword}
                    setLengthPassword={setLengthPassword}
                    isMayus={isMayus}
                    setIsMayus={setIsMayus}
                    isMinus={isMinus}
                    setIsMinus={setIsMinus}
                    isSpecialCharacter={isSpecialCharacter}
                    setIsSpecialCharacter={setIsSpecialCharacter}
                    isNumber={isNumber} setIsNumber={setIsNumber}
                />
            }
            {selected === "user" &&
                <UserGenerator setUserTypeSelected={setUserType} />}
        </div>
    )
}
