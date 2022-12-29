import {NextPage} from "next";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavBar/NavItem";
import Icon from "../components/Icon/Icon";
import Image from "next/image";
import {ReactNode, useEffect, useState} from "react";
import ContentDisplay from "../components/ContentDisplayContainer/ContentDisplay";
import Modal from "../components/Modal/Modal";
import Dbc from 'dbc-can';
import {DbcData} from "dbc-can/lib/dbc/Dbc";
import NodeEditor from "../components/NodeEditor/NodeEditor";
import DbcSimulation from "../components/Simulation/DbcSimulation";
import FileLoader from "../components/FileLoader/FileLoader";
import SignalEditor from "../components/SignalEditor/SignalEditor";
import MessageEditor from "../components/MessageEditor/MessageEditor";
import Toast from "../components/Toast/Toast";


export type PageSelection = 'Nodes' | 'Messages' | 'Signals' | 'Settings' | 'Upload' | 'Visual' | undefined
const Editor: NextPage = (props) => {
    const [selection,UseSelection] = useState<PageSelection>(undefined);
    const [open, UseOpen] = useState<boolean>(false);
    const [dbcData, UseDbcData] = useState<DbcData|undefined>(undefined);
    const [toast, UseToast] = useState({
        isOpen: false,
        message: 'Toast',
        icon: 'task_alt'
    })
    const dbc = new Dbc();

    const navBtnClicked = (type: PageSelection) => {
        if (selection === type) {
            UseSelection(undefined);
        } else {
            UseSelection(type);
        }
    }

    useEffect(()=>{
        if (selection === 'Settings') {
            UseOpen(true);
        }
        if (selection === 'Nodes') {
            if (dbcData) {
                dbcData.messages.set(
                    'ASDF',
                    dbc.createMessage('ASDF',10000,3)
                )
            }
            UseDbcData(dbcData)
        }
    },[selection])

    const fileUpload = (fileContent: string) => {
        UseDbcData(dbc.load(fileContent));
        UseToast({
            isOpen: true,
            message: 'File successfully uploaded',
            icon: 'info'
        })
        setTimeout(()=>{
            UseToast({
                isOpen: false,
                message: '',
                icon: 'info'
            })
        },5000)
    }

    return <>
        <div className='flex flex-row'>
            <NavBar>
                <NavItem buttonTitle='CANDIED' logoImage='/candy-cane.svg' logoClass='rotate-45' isLogo/>
                <NavItem buttonTitle='Nodes' icon={<Icon type='lan'/>} onClick={()=>navBtnClicked('Nodes')}/>
                <NavItem buttonTitle='Messages' icon={<Icon type='mail'/>} onClick={()=>navBtnClicked('Messages')}/>
                <NavItem buttonTitle='Signals' icon={<Icon type='sensors'/>} onClick={()=>navBtnClicked('Signals')}/>
                <NavItem buttonTitle='Visual' icon={<Icon type='scatter_plot'/>} onClick={()=>navBtnClicked('Visual')}/>
                <NavItem buttonTitle='Upload' icon={<Icon type='upload_file'/>} onClick={()=>navBtnClicked('Upload')}/>
                <NavItem buttonTitle='Settings' icon={<Icon type='settings'/>} onClick={()=>navBtnClicked('Settings')}/>
            </NavBar>
            <NodeEditor data={dbcData} pageSelector={selection}/>
            <SignalEditor data={dbcData} pageSelector={selection}/>
            <MessageEditor data={dbcData} pageSelector={selection}/>
            <DbcSimulation data={dbcData} pageSelector={selection}/>
            <FileLoader data={dbcData}
                        pageSelector={selection}
                        onFileLoad={fileUpload}/>
            <ContentDisplay isDisplayed={selection===undefined}>
                <Image src='/Data storage_Monochromatic.svg' fill alt='Background' className='-z-10 object-scale-down'/>
            </ContentDisplay>
        </div>
        <Modal isOpen={open}/>
        <Toast message={toast.message} icon={toast.icon} isOpen={toast.isOpen}/>
    </>
}
export default Editor;