
"use client"
import { FormProfileProps } from "./FormProfile.types";
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./FormProfile.form";
import { useState } from "react";
import { Save, Upload } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function FormProfile(props: FormProfileProps) {
    const { user } = props;
    const [showUploadPhoto, setShowUploadPhoto] = useState(false);
    const [photoUpload, setPhotoUpload] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name || "",
            email: user.email || "",
            profileimage: user.profileimage || "",
            username: user.username || "",
            id: user.id,
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch("/api/profile", values)
            toast({
                title: "Profile updated",
            });
            form.reset({
                name: "",
                email: "",
                profileimage: "",
                username: "",
                id: "",
            })

            setShowUploadPhoto(false);
            setPhotoUpload(false);
            router.push("/");
        } catch (error) {
            toast({
                title: "Something went wrong",
                variant: "destructive",
            });
        }
    }
    return (
        <div className="max-w-lg">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="profileimage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile Image</FormLabel>
                                <FormControl>
                                    <div>
                                        <div className="flex gap-4 items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                                            <Image
                                                src={user.profileimage ? user.profileimage : "/images/profile.jpg"}
                                                alt="Profile image"
                                                width={60}
                                                height={60}
                                                className="rounded-full border-2" 
                                            />
                                            <div className="flex flex-col justify-center">
                                                {showUploadPhoto ? (
                                                    <UploadButton
                                                        className="rounded-md text-white bg-green-600 hover:bg-green-700 mt-2 py-1 px-3 transition duration-200" 
                                                        {...field}
                                                        endpoint="profileImage"
                                                        onClientUploadComplete={(res) => {
                                                            form.setValue("profileimage", res?.[0].url);
                                                            setPhotoUpload(true);
                                                        }}
                                                        onUploadError={(error) => {
                                                            console.log(error);
                                                        }}
                                                    />
                                                ) : (
                                                    <Button
                                                        onClick={() => setShowUploadPhoto((prev) => !prev)}
                                                        className="flex items-center tex-white bg-green-800 hover:bg-green-700 mt-2 py-1 px-3 transition duration-200" 
                                                    >
                                                        <Upload className="w-4 h-4 mr-2" size={18} />
                                                        Change Photo
                                                    </Button>
                                                )}
                                                {photoUpload && (
                                                    <p className="text-sm text-green-800 mt-2">Image uploaded</p>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input disabled {...field} />
                                </FormControl>
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
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
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
