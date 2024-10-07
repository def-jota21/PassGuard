"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import {BarChart, DoorClosed, House, RectangleEllipsis} from "lucide-react";
import Link from "next/link";
import SingleItem from "../SingleItem/SingleItem";
import { dataSidebarConfiguration, dataSidebarRoutes } from "./SidebarRoutes.data";
import { signOut } from "next-auth/react";

export default function SidebarRoutes() {
  return (
    <div>
        <SingleItem href="/" label="Homepage" icon={House} />
        {dataSidebarRoutes.map(({title, icon: Icon, children}) => (
            <Accordion type ="single" collapsible key={title} className="w-full px-2">
                <AccordionItem value= "item-1" className="border-b-0">
                    <AccordionTrigger>
                        <div className="flex gap-2 items-center">
                            <div className="bg-green-100/20 p-2 rounded-md">
                                <Icon size={20} />
                            </div>
                            {title}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {children.map(({item, icon: Icon, href}) => ( 
                            <div key={item}>
                                 <Link href={href}  className="px-6 py-2 flex gap-2 items-center hover:bg-green-100/20 
                                 duration-300 transition-all rounded-md">
                                  <Icon size={20} />
                                  {item}
                                 </Link>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        ))}
        <SingleItem href="/generator" label="Generator" icon={RectangleEllipsis} />
        {dataSidebarConfiguration.map(({title, icon: Icon, children}) => (
            <Accordion type ="single" collapsible key={title} className="w-full px-2">
                <AccordionItem value= "item-1" className="border-b-0">
                    <AccordionTrigger>
                        <div className="flex gap-2 items-center">
                            <div className="bg-green-100/20 p-2 rounded-md">
                                <Icon size={20} />
                            </div>
                            {title}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {children.map(({item, icon: Icon, href, premium}) => ( 
                            <div key={item} className="flex items-center justify-between mt-2 hover:bg-green-100/20 
                            duration-300 transition-all rounded-md pr-1">
                                 <Link href={href} className="px-6 flex gap-2 items-center">
                                    <Icon size={20} />
                                    {item}
                                 </Link>
                                 {premium && (
                                    <span className="flex gap-2 text-xs px-2 py-1 bg-green-400 rounded-md">
                                        Premium
                                    </span>
                                 )}
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        ))}

        <SingleItem href="/analytics" label="Analytics" icon={BarChart} />
        <SingleItem onClick={() => signOut()} href="#" label="Logout" icon={DoorClosed} />
    </div>
  )
}
