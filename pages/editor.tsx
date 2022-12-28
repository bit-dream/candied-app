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
const Simulation = require('../components/Simulation/simulation');
import createGraph from "../components/Simulation/transforms";
import NodeEditor from "../components/NodeEditor/NodeEditor";
import DbcSimulation from "../components/Simulation/DbcSimulation";


export type PageSelection = 'Nodes' | 'Messages' | 'Signals' | 'Settings' | 'Upload' | 'Visual' | undefined
const Editor: NextPage = (props) => {
    const [selection,UseSelection] = useState<PageSelection>(undefined);
    const [open, UseOpen] = useState<boolean>(false);
    const [dbcData, UseDbcData] = useState<DbcData|undefined>(undefined);

    useEffect(()=>{
        const dbc = new Dbc();
        dbc.load(
            `
VERSION "1.0"

NS_:
    BU_
    BS_
    BO_
    CM_
    BA_DEF_
    BA_DEF_DEF_
    VAL_TABLE_
    VAL_
    BO_TX_BU_

BU_: Node0 Node1 Node2

BS_: 500

BO_ 1234 CANMessage: 8 Node0
    SG_ Signal0 : 0|32@1- (1,0) [0|0] "" Node1,Node2
    SG_ Signal1 : 32|32@1+ (100,0) [0|100] "%" Node1,Node2

BO_ 4321 CANMultiplexed: 2 Node0
    SG_ Multiplexer M : 0|8@1+ (1,0) [0|0] "" Node1
    SG_ Value0 m0 : 8|8@1+ (1,0) [0|0] "" Node1
    SG_ Value1 m1 : 8|8@1+ (1,0) [0|0] "" Node1

CM_ "DBC Template with multiline description";
CM_ BU_ Node0 "The 0th Node this is really just a test for a really really really really long message ok here it goes now asjkf;lasdl;fkjasd ;lfkjasdf l;kajsdf l;ksadfj;lsafdjk s;ladkfjasl;dfk jsal;dfk jas;ldfk jas;ldfk jasd;flk jasdf;l kjasdfl ;kjasdfl;kjasdf l;kj";
CM_ BO_ 4321 "Multiplexed CAN-Message";
CM_ SG_ 1234 Signal0 "First signal in this message";

BA_DEF_ "FloatAttribute" FLOAT 0 50.5;
BA_DEF_ BO_ "BOStringAttribute" STRING;
BA_DEF_ BU_ "BUIntAttribute" INT 0 100;
BA_DEF_ SG_ "SGEnumAttribute" ENUM "Val0", "Val1", "Val2";

BA_DEF_DEF_ "FloatAttribute" 25.25;
BA_DEF_DEF_ "BOStringAttribute" "String";
BA_DEF_DEF_ "BUIntAttribute" 50;
BA_DEF_DEF_ "SGEnumAttribute" 1;

BA_ "FloatAttribute" 45.9;
BA_ "BUIntAttribute" BU_ Node0 100;
BA_ "BOStringAttribute" BO_ 1234 "MessageAttribute";
BA_ "SGEnumAttribute" SG_ 1234 Signal0 2;

VAL_TABLE_ Numbers 3 "Three" 2 "Two" 1 "One" 0 "Zero";
VAL_ 4321 Value0 2 "Value2" 1 "Value1" 0 "Value0";
VAL_ 4321 Value1 Numbers;

BO_TX_BU_ 4321 : Node0,Node2;
        `
        );
        UseDbcData(dbc.data);
    },[])
    console.log(dbcData)

    useEffect(()=>{
        if (dbcData && selection === 'Visual') {
            let graph = createGraph(
                dbcData,
                '/network-tree-svgrepo-com.svg',
                '/cpu-svgrepo-com.svg',
                '/mail-svgrepo-com.svg',
                '/letter-s-svgrepo-com.svg'
            );
            let simulation = new Simulation.default('SIMULATION',graph)
            simulation.init();
        }
    },[dbcData,selection])

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
    },[selection])

    let content: ReactNode | HTMLImageElement;
    switch (selection) {
        case 'Nodes':
            break;
        case 'Messages':
            content = <div className='text-center text-white'>Messages</div>
            break;
        case 'Signals':
            content = <div className='text-center text-white'>Signals</div>
            break;
        case 'Settings':
            content = <div className='text-center text-white'>Nodes</div>
            break;
        case 'Upload':
            content = <div className='text-center text-white'>Nodes</div>
            break;
        case 'Visual':
            //content = <ContentDisplay><div id='SIMULATION'></div></ContentDisplay>
            break;
        case undefined:
            content = <Image src='/Data storage_Monochromatic.svg' fill alt='Background' className='-z-10 object-scale-down'/>;
            break;
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
            <DbcSimulation data={dbcData} pageSelector={selection}/>
        </div>
        <Modal isOpen={open}/>
    </>
}
export default Editor;