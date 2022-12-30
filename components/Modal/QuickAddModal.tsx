import React, {useState} from "react";
import Button from "../buttons/Button";
import Modal from "./Modal";
import Tabs from '../Tabs/Tabs'
import MessageBody from "./MessageBody";
import NodeBody from "./NodeBody";
import SignalBody from "./SignalBody";

interface Props {
    isOpen: boolean;
}
const QuickAddModal:React.FC<Props> = ({isOpen}) => {

    const [tabSelected,UseTabSelected] = useState<string>('Node');

    const [startBit,UseStartBit] = useState<number>(0);
    const [signalLength,UseSignalLength] = useState<number>(0);
    const [signalName,UseSignalName] = useState<string>('');
    const [selectedMessage,UseSelectedMessage] = useState<string>('');
    const [nodeName,UseNodeName] = useState<string>('');
    const [nodeDescription,UseNodeDescription] = useState<string>('');

    const tabClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        let button = event.target as HTMLButtonElement;
        if (button && button.id) {
            UseTabSelected(button.id);
        }
    }

    console.log(startBit,signalLength,signalName,selectedMessage)

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
                        <NodeBody/> :
                    (tabSelected === 'Message') ?
                        <MessageBody/> :
                    (tabSelected === 'Signal') ?
                        <SignalBody
                            UseSignalLength={UseSignalLength}
                            UseStartBit={UseStartBit}
                            UseSelectedMessage={UseSelectedMessage}
                            UseSignalName={UseSignalName}
                        /> :
                        <NodeBody/>
                }
            </>
        }
        footer={
            <>
                <div>
                    <Button text='Add' color='info' noShadow/>
                    <Button text='Close' color='danger' noShadow/>
                </div>
            </>
        }
    />
    )
}
export default QuickAddModal;