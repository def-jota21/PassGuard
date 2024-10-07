
import Link from "next/link";
import { SingleItemProps } from "./SingleItem.types";

export default function SingleItem( props: SingleItemProps) {
  const { label, icon: Icon, href, onClick } = props
  return (
    <Link href={href} className="flex gap-2 items-center p-2 hover:bg-green-100/20 
    duration-300 transition-all rounded-md"
    onClick={onClick}>
        <div className="bg-green-100/20 p-2 rounded-md">
            <Icon size={20} />
        </div>
        {label}
    </Link>
  )
}
