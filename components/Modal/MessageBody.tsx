import React, {ReactNode} from "react";
import Input from "../Input/Input";

interface Props {
}

const MessageBody:React.FC<Props> = () => {
    return <>
        <Input id={'message_name_field'} label={'Message Name'}/>
        <Input id={'message_id_field'} label={'ID'}/>
        <Input id={'message_dlc_field'} label={'DLC'}/>
    </>
}
export default MessageBody;