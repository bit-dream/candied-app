import React, {cloneElement, ReactNode, useContext, useEffect, useState} from "react";
import Button from "../Buttons/Button";
import Modal from "../Modal/Modal";
import Tabs from '../Tabs/Tabs'
import MessageBody from "../Modal/MessageBody";
import NodeBody from "../Modal/NodeBody";
import SignalBody from "../Modal/SignalBody";
import {Dbc} from "candied";
import {DbcContext} from "../DbcEditor/DbcEditor";
import Icon from "../Icon/Icon";
import Simulation from "../Simulation/simulation";


interface ElementProps {
    onClick: () => void;
}
interface Props {
    btn?: React.ReactElement<ElementProps>;
    extModalOpen?: boolean;
    ExtUseModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    noBtn?: boolean;
}
const QuickAdd:React.FC<Props> = ({btn,extModalOpen,ExtUseModalOpen,noBtn}) => {
    const dbc = new Dbc();

    const [modalOpen,UseModalOpen] = useState<boolean>(false);

    useEffect(()=>{
        if (ExtUseModalOpen) {
            ExtUseModalOpen(modalOpen);
        }
    },[modalOpen])

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
    let CustomButton: ReactNode;
    if (React.isValidElement(btn)) {
        CustomButton = cloneElement(btn);
    }

    return <>
        {
            noBtn ? <></> :
            btn && React.isValidElement(btn) ?
            cloneElement(btn, {onClick:()=>{UseModalOpen(true);}}):
            <Button
                text=''
                color='secondary'
                icon={<Icon type='add'/>}
                fullWidth
                onClick={()=>{UseModalOpen(true);}}
            />
        }
    <Modal
        isOpen={modalOpen || extModalOpen ? true : false}
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
                        UseModalOpen(false);
                        if (ExtUseModalOpen) {ExtUseModalOpen(false);}
                    }}/>
                    <Button text='Close' color='danger' noShadow onClick={()=>{
                        UseModalOpen(false);
                        if (ExtUseModalOpen) {ExtUseModalOpen(false);}
                    }}/>
            </>
        }
    />
    </>
}
export default QuickAdd;