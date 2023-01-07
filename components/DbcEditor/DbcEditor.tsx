import NavBar from '../NavBar/NavBar';
import NavItem from "../NavBar/NavItem";
import Icon from "../Icon/Icon";
import Image from "next/image";
import React, {createContext, SetStateAction, useContext, useState} from "react";
import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import {Dbc} from 'candied';
import {DbcData} from "candied/lib/dbc/Dbc";
import NodeEditor from "../NodeEditor/NodeEditor";
import DbcSimulation from "../Simulation/DbcSimulation";
import FileLoader from "../FileLoader/FileLoader";
import SignalEditor from "../SignalEditor/SignalEditor";
import MessageEditor from "../MessageEditor/MessageEditor";
import Toast from "../Toast/Toast";
import OverviewEditor from "../OverviewEditor/OverviewEditor";
import QuickAdd from "../QuickAdd/QuickAdd";

export type PageSelection = 'Nodes' | 'Messages' | 'Signals' | 'Settings' | 'Upload' | 'Visual' | 'Overview' | undefined

interface Props {
    startingData?: DbcData;
    startingPage?: PageSelection;
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

const DbcEditor:React.FC<Props> = ({startingData,startingPage}) => {

    const dbc = new Dbc();
    const initDataSet = startingData ? startingData : dbc.initDbcDataObj();
    const [data,SetData] = useState<DbcData>(initDataSet);
    const init = {data, SetData};

    const [selection,UseSelection] = useState<PageSelection>(startingPage ? startingPage: undefined);
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

    const [quickAddOpen,UseQuickAddOpen] = useState<boolean>(false);
    return <>
        <DbcContext.Provider value={init}>
        <div className='flex flex-row'>
            <NavBar>
                <NavItem buttonTitle='CANDIED' logoImage='/candy-cane.svg' logoClass='rotate-45' isLogo/>
                <NavItem buttonTitle='Overview' icon={<Icon type='grain'/>} onClick={()=>navBtnClicked('Overview')}/>
                <NavItem buttonTitle='Nodes' icon={<Icon type='lan'/>} onClick={()=>navBtnClicked('Nodes')}/>
                <NavItem buttonTitle='Messages' icon={<Icon type='mail'/>} onClick={()=>navBtnClicked('Messages')}/>
                <NavItem buttonTitle='Signals' icon={<Icon type='sensors'/>} onClick={()=>navBtnClicked('Signals')}/>
                <NavItem buttonTitle='Visual' icon={<Icon type='scatter_plot'/>} onClick={()=>navBtnClicked('Visual')}/>
                <NavItem buttonTitle='Upload' icon={<Icon type='upload_file'/>} onClick={()=>navBtnClicked('Upload')}/>
                <NavItem buttonTitle='Quick Add' icon={<Icon type='add'/>} onClick={()=>UseQuickAddOpen(true)} noDecoration/>
            </NavBar>
            <NodeEditor pageSelector={selection}/>
            <SignalEditor pageSelector={selection}/>
            <MessageEditor pageSelector={selection}/>
            <DbcSimulation pageSelector={selection}/>
            <OverviewEditor pageSelector={selection}/>
            <FileLoader pageSelector={selection}
                        onFileLoad={fileUpload}/>
            <ContentDisplay isDisplayed={selection===undefined}>
                <Image src='/Data storage_Monochromatic.svg' fill alt='Background' className='-z-10 object-scale-down'/>
            </ContentDisplay>
        </div>
        <Toast message={toast.message} icon={toast.icon} isOpen={toast.isOpen}/>
        <QuickAdd noBtn extModalOpen={quickAddOpen} ExtUseModalOpen={UseQuickAddOpen}/>
        </DbcContext.Provider>
    </>
}
export default DbcEditor;