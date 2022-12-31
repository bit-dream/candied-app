import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Table from "../Table/Table";
import {DbcData, Message, Signal} from "dbc-can/lib/dbc/Dbc";
import React, {useContext} from "react";
import TableRow from "../Table/TableRow";
import Button from "../Buttons/Button";
import Icon from "../Icon/Icon";
import {PageSelection} from "../DbcEditor/DbcEditor";
import {DbcContext} from "../../pages/editor";

interface Props {
    data: DbcData|undefined;
    pageSelector: PageSelection;
}
const MessageEditor:React.FC<Props> = ({pageSelector}) => {
    const {data, SetData} = useContext(DbcContext);
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
            {data && data.messages.size ?
                <Table
                    headings={['Name','ID','DLC', 'Node', 'Description']}
                    rows={createMessageRows(data.messages)}
                />
                : <div className='text-5xl text-center'>No Data</div>
            }
            <div className='mt-5'/>
            <Button text='' color='secondary' icon={<Icon type='add'/>} fullWidth/>
        </ContentDisplay>
    );
}
export default MessageEditor;