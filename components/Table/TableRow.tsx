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

    const editTableEntry = (event: any) => {
        let entryId = event.target.id;
        let currentString = event.target.value;
        let el = document.getElementById(entryId)
        if (el) {
            console.log(currentString,el)
        }
    }

    return <>
    <tr className={tableRow} key={key}>
        {rowData.map((data,key)=>{
            return <td key={key} className={tableItem}>
                <input id={key.toString()} onKeyUp={editTableEntry} className='border-none text-black dark:text-white text-center text-xs bg-slate-800' type="text" defaultValue={data}/>
            </td>
        })}
    </tr>
    </>
}
export default TableRow;