import React from "react";
import {twMerge} from "tailwind-merge";
import Button from "../Buttons/Button";
import Icon from "../Icon/Icon";

interface Props {
    rowData: (any)[];
    key: number;
    hasDelete?: boolean;
    onDeleteCallback?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const TableRow:React.FC<Props> = ({key,rowData,hasDelete,onDeleteCallback}) =>{
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
        'cursor-pointer',
        'bg-white',
        'dark:bg-slate-700'
    )

    const editTableEntry = (event: any) => {
        let entryId = event.target.id;
        let currentString = event.target.value;
        let el = document.getElementById(entryId)
        if (el) {
            console.log(currentString,el)
        }
    }
    //<input id={key.toString()} onKeyUp={editTableEntry} className='border-none text-black dark:text-white text-center text-xs bg-slate-800' type="text" defaultValue={data}/>
    return <>
    <tr className={tableRow} key={key}>
        {rowData.map((data,key)=>{
            return <td key={key} className={tableItem}>
                {data}
            </td>
        })}
        {hasDelete ?
            <td>
                <span className='flex flex-row justify-end items-center pr-5 text-white text-xs'>
                    <Button
                        size={'sm'}
                        color={'danger'}
                        text={''}
                        icon={<Icon type={'remove'}/>}
                        onClick={onDeleteCallback}
                    />
                </span>
            </td>
            : <></>
        }
    </tr>
    </>
}
export default TableRow;