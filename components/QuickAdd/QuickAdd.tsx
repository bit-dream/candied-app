import React, {useContext, useState} from "react";
import Button from "../Buttons/Button";
import Modal from "../Modal/Modal";
import Tabs from '../Tabs/Tabs'
import MessageBody from "../Modal/MessageBody";
import NodeBody from "../Modal/NodeBody";
import SignalBody from "../Modal/SignalBody";
import Dbc from "dbc-can";
import {DbcContext} from "../DbcEditor/DbcEditor";
import Icon from "../Icon/Icon";

interface Props {
}
const QuickAdd:React.FC<Props> = ({}) => {
    const dbc = new Dbc();

    const [modalOpen,UseModalOpen] = useState<boolean>(false);

    const [tabSelected,UseTabSelected] = useState<string>('Node');
    const [startBit,UseStartBit] = useState<number>(0);
    const [signalLength,UseSignalLength] = useState<number>(0);
    const [signalName,UseSignalName] = useState<string>('');
    const [selectedMessage,UseSelectedMessage] = useState<string>('');
    const [nodeName,UseNodeName] = useState<string>('');
    const [messageName,UseMessageName] = useState<string>('');
    const [messageDlc,UseMessageDlc] = useState<number>(8);
    const [messageId,UseMessageId] = useState<number>(0);

    const {data, SetData} = useContext(DbcContext);

    const tabClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        let button = event.target as HTMLButtonElement;
        if (button && button.id) {
            UseTabSelected(button.id);
        }
    }

    return <>
    <Button
        text=''
        color='secondary'
        icon={<Icon type='add'/>}
        fullWidth
        onClick={()=>{UseModalOpen(true)}}/>
    <Modal
        isOpen={modalOpen}
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
                    <Button text='Add' color='info' noShadow onClick={()=>{
                        switch(tabSelected) {
                            case 'Node':
                                data.nodes.set(nodeName,{
                                   name:nodeName,
                                   description: null,
                                   attributes: new Map()
                                })
                                break;
                            case 'Message':
                                const msg = dbc.createMessage(messageName,messageId,messageDlc);
                                data.messages.set(messageName,msg);
                                break;
                            case 'Signal':
                                const sigMsg = data.messages.get(selectedMessage);
                                const sig = dbc.createSignal(
                                    signalName,
                                    startBit,
                                    signalLength
                                );
                                if (sigMsg) {
                                    sigMsg.signals.set(signalName,sig)
                                }
                                break;
                        }
                        SetData(data);
                    }}/>
                    <Button text='Close' color='danger' noShadow onClick={()=>UseModalOpen(false)}/>
                </div>
            </>
        }
    />
    </>
}
export default QuickAdd;