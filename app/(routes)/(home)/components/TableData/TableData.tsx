import { Element } from "@prisma/client"
import { DataTable } from "./data-table"
import { columns } from "./colums"
export type DataTableProps = {
    data: Element[]
}
export default function TableData(props: DataTableProps) {
    const {data} = props;
    return (
        <div className="py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
