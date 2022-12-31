import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Table from "../Table/Table";
import {DbcData, Node} from "dbc-can/lib/dbc/Dbc";
import React, {useContext, useState} from "react";
import TableRow from "../Table/TableRow";
import ButtonLayout from "../Buttons/ButtonLayout";
import Button from "../Buttons/Button";
import {DbcContext, PageSelection} from "../DbcEditor/DbcEditor";
import Icon from "../Icon/Icon";
import QuickAdd from "../QuickAdd/QuickAdd";

interface Props {
    pageSelector: PageSelection;
}
const NodeEditor:React.FC<Props> = ({pageSelector}) => {
    const {data, SetData} = useContext(DbcContext);
    const [modalOpen,UseModelOpen] = useState<boolean>(false);

    return <>
        <ContentDisplay isDisplayed={pageSelector === 'Nodes'}>
            {data && data.nodes.size ?
                <>
                <h1 className='text-3xl pb-3 text-black dark:text-white'>Nodes</h1>
                <Table
                    headings={['Name','Description']}
                    rows={
                        Array.from(data.nodes.values()).map((node,k)=>{
                            return [node.name, node.description]
                        })
                    }
                />
                </>
                    : <div className='text-5xl text-center'>No Data</div>
            }
            <div className='mt-5'/>
            <QuickAdd/>
        </ContentDisplay>
        </>
}
export default NodeEditor;