import {DbcData, Node} from "dbc-can/lib/dbc/Dbc";
import {ReactNode} from "react";
import TableHeading from "./TableHeading";
import TableRow from "./TableRow";
import {twMerge} from "tailwind-merge";

interface Props {
    headings: string[];
    rows: ((any)[])[]
}

const Table:React.FC<Props> = ({headings,rows}) => {

    const tableHeadings = headings.map((heading,k)=>{
        return <TableHeading heading={heading} key={k}/>
    })

    const tableRows = rows.map((row,k)=>{
        return <TableRow rowData={row} key={k}/>
    })

    const classList = twMerge(
        'inline-block',
        'min-w-full',
        'overflow-y-scroll',
        'overflow-x-hidden',
        'align-middle',
        'shadow-lg',
        'shadow-black',
        'rounded-lg',
        'border',
        'dark:border-slate-600'
    )

    return(
    <>
        <div className={classList}>
            <table className="min-w-full">
                <thead>
                <tr>
                    {tableHeadings}
                </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
    </>
    );
}
export default Table;