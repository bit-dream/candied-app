import React, {useState} from "react";
import Button from "../Buttons/Button";
import Modal from "./Modal";
import Tabs from '../Tabs/Tabs'
import MessageBody from "./MessageBody";
import NodeBody from "./NodeBody";
import SignalBody from "./SignalBody";

interface Props {
    UseOpen:  React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
}
const QuickAddModal:React.FC<Props> = ({isOpen,UseOpen}) => {

    const [tabSelected,UseTabSelected] = useState<string>('Node');

    const [startBit,UseStartBit] = useState<number>(0);
    const [signalLength,UseSignalLength] = useState<number>(0);
    const [signalName,UseSignalName] = useState<string>('');
    const [selectedMessage,UseSelectedMessage] = useState<string>('');
    const [nodeName,UseNodeName] = useState<string>('');
    const [messageName,UseMessageName] = useState<string>('');
    const [messageDlc,UseMessageDlc] = useState<number>(8);
    const [messageId,UseMessageId] = useState<number>(0);

    const tabClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        let button = event.target as HTMLButtonElement;
        if (button && button.id) {
            UseTabSelected(button.id);
        }
    }

    console.log(startBit,signalLength,signalName,selectedMessage,messageName,messageId)

    return(
    <Modal
        isOpen={isOpen}
        heading='Quick Add'
        body={
            <>
                <Tabs
                    tabs={['Node','Message','Signal']}
                    activeTab={tabSelected}
                    tabClicked={tabClicked}
                />
                {
                    (tabSelected === 'Node') ?
                        <NodeBody UseNodeName={UseNodeName}/> :
                    (tabSelected === 'Message') ?
                        <MessageBody
                            UseMessageName={UseMessageName}
                            UseMessageId={UseMessageId}
                            UseMessageDlc={UseMessageDlc}
                        /> :
                    (tabSelected === 'Signal') ?
                        <SignalBody
                            UseSignalLength={UseSignalLength}
                            UseStartBit={UseStartBit}
                            UseSelectedMessage={UseSelectedMessage}
                            UseSignalName={UseSignalName}
                        /> :
                        <NodeBody UseNodeName={UseNodeName}/>
                }
            </>
        }
        footer={
            <>
                <div>
                    <Button text='Add' color='info' noShadow/>
                    <Button text='Close' color='danger' noShadow onClick={()=>UseOpen(false)}/>
                </div>
            </>
        }
    />
    )
}
export default QuickAddModal;