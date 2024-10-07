"use client"
import React from 'react'
import { FormEditElementProps } from './FormEditElement.type'
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {  Copy, Earth, Eye, Save, Shuffle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { copyClipboard } from "@/lib/copyClipboard";
import { useState } from "react";
import { generatePassword } from "@/lib/generatePassword";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { formSchema } from './FormEditElement.form';

export default function FormEditElement(props: FormEditElementProps) {
    const { dataElement } = props;
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            typeElement: dataElement.typeElement,
            isFavourite: dataElement.isFavourite,
            name: dataElement?.name || "",
            directory: dataElement?.directory || "",
            username: dataElement?.username || "",
            password: dataElement?.password || "",
            url: dataElement?.url || "",
            notes: dataElement?.notes || "",
            userId: dataElement?.userId
        },
    })
    const generateRandomPassword = () => {
        const password = generatePassword()
        form.setValue("password", password)
    }
    const updateUrl = () => {
        form.setValue("url", window.location.href)
    }
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/items/${dataElement.id}`, values)
            toast({
                title: "Element edited",
            });
            form.reset({
                typeElement: "",
                isFavourite: false,
                name: "",
                directory: "",
                username: "",
                password: "",
                url: "",
                notes: "",
                userId: ""
            })

            router.push("/");
        } catch (error) {
            console.log(error);
            toast({
                title: "Something went wrong",
                variant: "destructive",
            });
        }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="md:grid-cols-2 gap-y-2 gap-x-4 grid"
                >
                    <FormField
                        control={form.control}
                        name="typeElement"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿What is the type of element?</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select a directory for your password" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="login">Login</SelectItem>
                                        <SelectItem value="card">Card</SelectItem>
                                        <SelectItem value="identity">Identity</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isFavourite"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Do you want to select your favorite password?</FormLabel>
                                <div className="flex flex-row items-start space-x-3 space-y-0 p-4">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Mark as favorite</FormLabel>
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="directory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Directory</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Choose the directory" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="personal">Personal</SelectItem>
                                        <SelectItem value="work">Work</SelectItem>
                                        <SelectItem value="banking">Banking</SelectItem>
                                        <SelectItem value="social-media">Social Media</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="shopping">Shopping</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>User</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input {...field} />
                                        <Copy className="absolute right-4 top-3 cursor-pointer" size={18}
                                            onClick={() => { copyClipboard(field.value) }}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Url website</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input {...field} />
                                        <Earth className="absolute right-2 top-3 cursor-pointer"
                                            size={18}
                                            onClick={updateUrl}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex justify-between">Password
                                    <Shuffle className="cursor-pointer" size={15}
                                        onClick={generateRandomPassword}
                                    />
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input {...field} type={showPassword ? "text" : "password"} />
                                        <Eye className="absolute right-10
                      top-3 cursor-pointer"
                                            size={18}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                        <Copy className="absolute right-2 top-3 cursor-pointer" size={18}
                                            onClick={() => { copyClipboard(field.value) }}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex justify-between">Notes</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="bg-green-800 hover:bg-green-700 focus:ring-green-600">
                        <Save className="w-4 h-4 mr-2" />
                        Save

                    </Button>
                </form>
            </Form>
        </div>
    )
}
