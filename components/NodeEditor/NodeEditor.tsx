import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Table from "../Table/Table";
import {DbcData, Node} from "dbc-can/lib/dbc/Dbc";
import React from "react";
import TableRow from "../Table/TableRow";
import ButtonLayout from "../buttons/ButtonLayout";
import Button from "../buttons/Button";
import {PageSelection} from "../DbcEditor/DbcEditor";
import Icon from "../Icon/Icon";

interface Props {
    data: DbcData|undefined;
    pageSelector: PageSelection;
}
const NodeEditor:React.FC<Props> = ({data, pageSelector}) => {

    return(
        <ContentDisplay isDisplayed={pageSelector === 'Nodes'}>
            {data && data.nodes.size ?
                <Table
                    headings={['Name','Description']}
                    rows={
                        Array.from(data.nodes.values()).map((node,k)=>{
                            return [node.name, node.description]
                        })
                    }
                />
                    : <div className='text-5xl text-center'>No Data</div>
            }
            <div className='mt-5'/>
            <Button text='' color='secondary' icon={<Icon type='add'/>} fullWidth/>
        </ContentDisplay>
    );
}
export default NodeEditor;