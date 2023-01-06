import {DbcData, Node} from "candied/dist/dbc/Dbc";
import {ChangeEventHandler, ReactNode, useEffect, useState} from "react";
import TableHeading from "./TableHeading";
import TableRow from "./TableRow";
import {twMerge} from "tailwind-merge";
import _ from 'lodash';

type Rows = ((any)[])[];
type Headings = string[];
interface Props {
    headings: Headings;
    rows: Rows;
    hasDelete?: boolean;
    onDeleteCallback?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


const Table:React.FC<Props> = ({headings,rows,hasDelete}) => {

    const generateTableRows = (r: Rows) => {
        return r.map((row,k)=>{
            if (hasDelete) {
                return <TableRow rowData={row} key={k} hasDelete onDeleteCallback={()=>{
                }}/>
            } else {
                return <TableRow rowData={row} key={k}/>
            }
        })
    }

    const tableHeadings = headings.map((heading,k)=>{
        return <TableHeading heading={heading} key={k}/>
    })

    const [filteredRows, UseFilteredRows] = useState<ReactNode>(generateTableRows(rows));

    useEffect(()=>{
        UseFilteredRows(generateTableRows(rows))
    },[rows])

    const search = (event: any) =>{
        const searchString = event.target.value
        if (searchString.length === 0) {
            UseFilteredRows(generateTableRows(rows));
        } else {
            let filtered = rows.filter(row =>
                row.some(r => (typeof r === 'string' || typeof r === 'number') && r.toString().toLowerCase().includes(searchString.toLowerCase())))
            UseFilteredRows(generateTableRows(filtered))
        }
    }

    const classList = twMerge(
        'inline-block',
        'min-w-full',
        'overflow-y-scroll',
        'align-middle',
        'shadow-lg',
        'rounded-lg',
        'bg-gray-200',
        'dark:bg-slate-600'
    )

    return(
    <>
        <div className={classList}>
            <div className="p-4">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="table-search"
                           className="block p-1 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Search for items"
                           onChange={_.debounce(search,500)}
                    />
                </div>
            </div>
            <table className="min-w-full relative">
                <thead>
                <tr>
                    {tableHeadings}
                </tr>
                </thead>
                <tbody>
                    {filteredRows}
                </tbody>
            </table>
        </div>
    </>
    );
}
export default Table;