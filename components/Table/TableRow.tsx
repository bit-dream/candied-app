import React from "react";
import {twMerge} from "tailwind-merge";

interface Props {
    rowData: (any)[];
    key: number;
}
const TableRow:React.FC<Props> = ({key,rowData}) =>{
    const tableItem = twMerge(
        //'border',
        //'dark:border-slate-600',
        'dark:text-white',
        'text-black',
        'text-center',
        'pr-2 pl-2 pt-1 pb-1',
        'text-xs',
        'truncate'
    )
    const tableRow = twMerge(
        'hover:bg-amber-200',
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