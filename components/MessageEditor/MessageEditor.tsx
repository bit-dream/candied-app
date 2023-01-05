import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Table from "../Table/Table";
import {DbcData, Message, Signal} from "candied/dist/dbc/Dbc";
import React, {useContext} from "react";
import TableRow from "../Table/TableRow";
import Button from "../Buttons/Button";
import Icon from "../Icon/Icon";
import {DbcContext, PageSelection} from "../DbcEditor/DbcEditor";
import QuickAdd from "../QuickAdd/QuickAdd";

interface Props {
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
                <>
                <h1 className='text-3xl pb-3 text-black dark:text-white'>Messages</h1>
                <Table
                    headings={['Name','ID','DLC', 'Node', 'Description']}
                    rows={createMessageRows(data.messages)}
                />
                </>
                : <div className='text-5xl text-center'>No Data</div>
            }
            <div className='mt-5'/>
            <QuickAdd/>
        </ContentDisplay>
    );
}
export default MessageEditor;