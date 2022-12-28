import React from "react";
import {twMerge} from "tailwind-merge";

interface Props {
    rowData: (any)[];
    key: number;
}
const TableRow:React.FC<Props> = ({key,rowData}) =>{
    const tableItem = twMerge(
        'border',
        'dark:border-slate-600',
        'dark:bg-slate-900',
        'dark:text-white',
        'text-black',
        'p-1',
        'truncate'
    )
    const tableRow = twMerge(
        'hover:bg-amber-200',
        'hover:dark:bg-amber-200',
        'cursor-pointer'
    )
    return <>
    <tr className={tableRow} key={key}>
        {rowData.map((data,key)=>{
            return <td key={key} className={tableItem}>{data}</td>
        })}
    </tr>
    </>
}
export default TableRow;