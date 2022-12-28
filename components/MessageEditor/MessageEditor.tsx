import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Table from "../Table/Table";
import {DbcData, Message, Signal} from "dbc-can/lib/dbc/Dbc";
import {PageSelection} from "../../pages/editor";
import React from "react";
import TableRow from "../Table/TableRow";

interface Props {
    data: DbcData|undefined;
    pageSelector: PageSelection;
}
const MessageEditor:React.FC<Props> = ({data, pageSelector}) => {

    const createMessageRows = (messages: Map<string,Message>) =>{
        let messageData = [];
        for (const message of Array.from(messages.values())) {
            messageData.push([
                message.name,
                message.id,
                message.dlc,
                message.sendingNode,
                message.description
            ])
            }
        return messageData
    }

    return(
        <ContentDisplay isDisplayed={pageSelector === 'Messages'}>
            {data ?
                <Table
                    headings={['Name','ID','DLC', 'Node', 'Description']}
                    rows={createMessageRows(data.messages)}
                />
                : <></>
            }
        </ContentDisplay>
    );
}
export default MessageEditor;