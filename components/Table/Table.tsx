import {DbcData, Node} from "dbc-can/lib/dbc/Dbc";
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
}

const Table:React.FC<Props> = ({headings,rows}) => {

    const tableHeadings = headings.map((heading,k)=>{
        return <TableHeading heading={heading} key={k}/>
    })


    const generateTableRows = (rows: Rows) => {
        return rows.map((row,k)=>{
            return <TableRow rowData={row} key={k}/>
        })
    }

    const [filteredRows, UseFilteredRows] = useState<ReactNode>(generateTableRows(rows));

    useEffect(()=>{
        UseFilteredRows(generateTableRows(rows))
    },[rows])

    const search = (event: any) =>{
        const searchString = event.target.value
        if (searchString.length === 0) {
            UseFilteredRows(generateTableRows(rows));
        } else {
            UseFilteredRows(
                generateTableRows(
                rows.filter(row=>{
                    for (const r of row) {
                        if ((typeof(r) ==='string' || typeof(r) === 'number') &&
                            r.toString().toLowerCase().includes(searchString.toLowerCase())) {
                            return true;
                        }
                    }
                })
                )
            )
        }
    }

    const classList = twMerge(
        'inline-block',
        'min-w-full',
        'overflow-y-scroll',
        'align-middle',
        'shadow-lg',
        'shadow-black',
        'rounded-lg'
        //'border',
        //'dark:border-slate-600'
    )

    return(
    <>
        <div className={classList}>
            <div className="p-4 bg-slate-600">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="table-search"
                           className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Search for items"
                           onChange={_.debounce(search,1000)}
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