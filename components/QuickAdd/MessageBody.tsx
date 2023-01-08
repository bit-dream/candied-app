import React from "react";
import Input from "../Input/Input";
import ComboBox from "../ComboBox/ComboBox";
import {Node} from 'candied/lib/dbc/Dbc'

interface Props {
    nodes: Map<string,Node>;
    UseMessageName: React.Dispatch<React.SetStateAction<string>>;
    UseMessageDlc: React.Dispatch<React.SetStateAction<number>>;
    UseMessageId: React.Dispatch<React.SetStateAction<number>>;
    UseMessageNode: React.Dispatch<React.SetStateAction<string|undefined>>
    onNodeSelected: (selected:string)=>void;
}

const MessageBody:React.FC<Props> = ({nodes,UseMessageName,UseMessageDlc,UseMessageId,UseMessageNode,onNodeSelected}) => {
    const nameChange = (value: string) => {
        UseMessageName(value);
    }
    const idChange = (value: string) => {
        UseMessageId(parseInt(value));
    }
    const lengthChange = (value: string) => {
        UseMessageDlc(parseInt(value));
    }

    let nodeList = Array.from(nodes.keys());
    nodeList.unshift('No Selection')
    return <>
        <Input id={'message_name_field'} label={'Message Name'} onChange={nameChange} placeholder='Message Name'/>
        <Input id={'message_id_field'} label={'Message ID'} onChange={idChange} placeholder='Number'/>
        <Input id={'message_dlc_field'} label={'Message DLC'} onChange={lengthChange} placeholder='Number'/>
        <ComboBox
            items={nodeList}
            selectedItem={nodeList[0]}
            onSelection={onNodeSelected}
            position='top'
        />
    </>
}
export default MessageBody;