import React from "react";
import { PasswordGeneratorProps } from "./PasswordGenerator.type";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function PasswordGenerator(props: PasswordGeneratorProps) {
    const {
        setLengthPassword,
        lengthPassword,
        isMayus,
        setIsMayus,
        isMinus,
        setIsMinus,
        isSpecialCharacter,
        setIsSpecialCharacter,
        isNumber,
        setIsNumber
    } = props;

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLengthPassword(Number(e.target.value));
    };
    return (
        <div>
            <>
                <div className="w-full p-4 bg-slate-100 rounded-md shadow-md flex gap-2 items-center">
                    <label className="block text-sm font-medium text-gray-700 min-w-32">
                        Length: {lengthPassword}
                    </label>
                    <input
                        type="range"
                        id="range"
                        min="8"
                        max="50"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        value={lengthPassword}
                        onChange={handleRangeChange}
                    />

                </div>
                <div>
                    <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
                        <Checkbox
                            id="mayus"
                            checked={isMayus}
                            onCheckedChange={() => setIsMayus((prev) => !prev)}
                        />
                        <label htmlFor="mayus" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Mayus A-Z
                        </label>
                    </div>
                    <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
                        <Checkbox
                            id="minus"
                            checked={isMinus}
                            onCheckedChange={() => setIsMinus((prev) => !prev)}
                        />
                        <label htmlFor="minus" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Minus a-z
                        </label>
                    </div>
                    <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
                        <Checkbox
                            id="numbers"
                            checked={isNumber}
                            onCheckedChange={() => setIsNumber((prev) => !prev)}
                        />
                        <label htmlFor="numbers" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Numbers 0-9
                        </label>
                    </div>
                    <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
                        <Checkbox
                            id="characters"
                            checked={isSpecialCharacter}
                            onCheckedChange={() => setIsSpecialCharacter((prev) => !prev)}
                        />
                        <label htmlFor="characters" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Characters !@#$%^&*()_+-=
                        </label>
                    </div>
                </div>
            </>
        </div>
    )
}
