import NavBar from '../NavBar/NavBar';
import NavItem from "../NavBar/NavItem";
import Icon from "../Icon/Icon";
import Image from "next/image";
import React, {createContext, SetStateAction, useContext, useState} from "react";
import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Dbc from 'dbc-can';
import {DbcData} from "dbc-can/lib/dbc/Dbc";
import NodeEditor from "../NodeEditor/NodeEditor";
import DbcSimulation from "../Simulation/DbcSimulation";
import FileLoader from "../FileLoader/FileLoader";
import SignalEditor from "../SignalEditor/SignalEditor";
import MessageEditor from "../MessageEditor/MessageEditor";
import Toast from "../Toast/Toast";

export type PageSelection = 'Nodes' | 'Messages' | 'Signals' | 'Settings' | 'Upload' | 'Visual' | undefined

interface Props {
    startingData?: DbcData;
}

type ContextProps = {
    data: DbcData;
    SetData: React.Dispatch<SetStateAction<DbcData>>;
}
export const dbc = new Dbc();
const dbcInit: ContextProps = {
    data: dbc.initDbcDataObj(),
    SetData: () => {
    }
}
export const DbcContext = createContext(dbcInit);

const DbcEditor:React.FC<Props> = ({startingData}) => {

    const dbc = new Dbc();
    const initDataSet = startingData ? startingData : dbc.initDbcDataObj();
    const [data,SetData] = useState<DbcData>(initDataSet);
    const init = {data, SetData};

    const [selection,UseSelection] = useState<PageSelection>(undefined);
    const [open, UseOpen] = useState<boolean>(false);
    const [toast, UseToast] = useState({
        isOpen: false,
        message: 'Toast',
        icon: 'task_alt'
    })

    const navBtnClicked = (type: PageSelection) => {
        if (selection === type) {
            UseSelection(undefined);
        } else {
            UseSelection(type);
        }
    }

    const fileUpload = (fileContent: string) => {
        SetData(dbc.load(fileContent));
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
        <DbcContext.Provider value={init}>
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
            <NodeEditor pageSelector={selection}/>
            <SignalEditor pageSelector={selection}/>
            <MessageEditor pageSelector={selection}/>
            <DbcSimulation pageSelector={selection}/>
            <FileLoader pageSelector={selection}
                        onFileLoad={fileUpload}/>
            <ContentDisplay isDisplayed={selection===undefined}>
                <Image src='/Data storage_Monochromatic.svg' fill alt='Background' className='-z-10 object-scale-down'/>
            </ContentDisplay>
        </div>
        <Toast message={toast.message} icon={toast.icon} isOpen={toast.isOpen}/>
        </DbcContext.Provider>
    </>
}
export default DbcEditor;