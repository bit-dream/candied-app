import React from "react";
import {twMerge} from "tailwind-merge";

interface Props {
    heading: string;
    key: number;
}

const classList = twMerge(
    'border',
    'dark:border-slate-600',
    'bg-slate-600',
    'text-white',
    'p-3',
    'sticky top-0'
)
const TableHeading:React.FC<Props> = ({key,heading}) =>{
    return <th key={key} className={classList}>{heading}</th>
}
export default TableHeading;