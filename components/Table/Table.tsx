import {DbcData, Node} from "dbc-can/lib/dbc/Dbc";
import {ReactNode} from "react";

const Table = (props: {data: DbcData | undefined}) => {

    const tableHeadings = ['Name','Description']
        .map((heading:string, k: number)=>{
            return <th key={k} className='border border-slate-600 bg-slate-600 sticky'>{heading}</th>
        })

    let tableRows: ReactNode[] = [<tr key={1}></tr>];
    if (props.data) {
        tableRows = Array.from(props.data.nodes.values()).map((node: Node, k: number) => {
            return <>
                <tr key={k}>
                    <td className='border border-slate-900 bg-slate-900'>{node.name}</td>
                    <td className='border border-slate-900 bg-slate-900'>{node.description}</td>
                </tr>
            </>
        });
    }

    return(
    <>
        <div className='inline-block min-w-full overflow-y-scroll align-middle shadow-2xl shadow-black rounded-lg border border-slate-600'>
            <table className="text-white min-w-full">
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