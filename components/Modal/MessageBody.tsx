import React from "react";
import Input from "../Input/Input";

interface Props {
    UseMessageName: React.Dispatch<React.SetStateAction<string>>;
    UseMessageDlc: React.Dispatch<React.SetStateAction<number>>;
    UseMessageId: React.Dispatch<React.SetStateAction<number>>;
}

const MessageBody:React.FC<Props> = ({UseMessageName,UseMessageDlc,UseMessageId}) => {

    const nameChange = (value: string) => {
        UseMessageName(value);
    }
    const idChange = (value: string) => {
        UseMessageId(parseInt(value));
    }
    const lengthChange = (value: string) => {
        UseMessageDlc(parseInt(value));
    }

    return <>
        <Input id={'message_name_field'} label={'Message Name'} onChange={nameChange} placeholder='Message Name'/>
        <Input id={'message_id_field'} label={'Message ID'} onChange={idChange} placeholder='Number'/>
        <Input id={'message_dlc_field'} label={'Message DLC'} onChange={lengthChange} placeholder='Number'/>
    </>
}
export default MessageBody;