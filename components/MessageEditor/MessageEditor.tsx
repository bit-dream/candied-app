import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Table from "../Table/Table";
import {DbcData, Message, Signal} from "candied/dist/dbc/Dbc";
import React, {useContext} from "react";
import TableRow from "../Table/TableRow";
import Button from "../Buttons/Button";
import Icon from "../Icon/Icon";
import {DbcContext, PageSelection} from "../DbcEditor/DbcEditor";
import QuickAdd from "../QuickAdd/QuickAdd";
import Stats from "../Stats/Stats";
import Stat from "../Stats/Stat"

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

    let highestId = Math.max(...Array.from(data.messages.values()).map(msg=>{return msg.id}));
    const highPriorityId = Array.from(data.messages.values()).reduce((prev,curr)=>{
        if (curr.id < prev) {
            return curr.id
        } else {
            return prev;
        }
    },highestId);

    let highPriorityMsgStr;
    const highPriorityMsg = Array.from(data.messages.values()).filter(msg=>{
        return msg.id === highPriorityId
    });
    if (highPriorityMsg && highPriorityMsg.length) {
        highPriorityMsgStr = highPriorityMsg[0].name;
    } else {
        highPriorityMsgStr = 'n/a'
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
                <Stats>
                    <Stat title={'messages'} content={data.messages.size.toString()}/>
                    <Stat title={'total bytes'} content={
                        Array.from(data.messages.values()).reduce((prev,curr)=>{
                            return prev + curr.dlc;
                        },0).toString()
                    }/>
                    <Stat title={'highest priority message'}
                          content={highPriorityMsgStr}/>
                </Stats>
                </>
                : <div className='text-5xl text-center'>No Data</div>
            }
            <div className='mt-5'/>
            <QuickAdd noBtn/>
        </ContentDisplay>
    );
}
export default MessageEditor;