import React from "react";
import {twMerge} from "tailwind-merge";

interface Props {
    heading: string;
    key: number;
}

const classList = twMerge(
    'border',
    'dark:border-slate-600',
    'dark:bg-slate-600',
    'dark:text-white',
    'text-black',
    'p-3'
)
const TableHeading:React.FC<Props> = ({key,heading}) =>{
    return <th key={key} className={classList}>{heading}</th>
}
export default TableHeading;