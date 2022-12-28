import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Table from "../Table/Table";
import {DbcData, Node} from "dbc-can/lib/dbc/Dbc";
import {PageSelection} from "../../pages/editor";
import React from "react";
import TableRow from "../Table/TableRow";

interface Props {
    data: DbcData|undefined;
    pageSelector: PageSelection;
}
const NodeEditor:React.FC<Props> = ({data, pageSelector}) => {

    return(
        <ContentDisplay isDisplayed={pageSelector === 'Nodes'}>
            {data ?
                <Table
                    headings={['Name','Description']}
                    rows={
                        Array.from(data.nodes.values()).map((node,k)=>{
                            return [node.name, node.description]
                        })
                    }
                />
                    : <></>
            }
        </ContentDisplay>
    );
}
export default NodeEditor;