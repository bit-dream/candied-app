import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import {DbcContext, PageSelection} from "../DbcEditor/DbcEditor";
import React, {useContext, useEffect, useState} from "react";
import Simulation from "./simulation";
import SimHelpModal from "../Modal/SimHelpModal";
import SimulationModal from "../Modal/SimulationModal";

interface Props {
    pageSelector: PageSelection;
    simulation: Simulation;
}
const DbcSimulation:React.FC<Props> = ({pageSelector,simulation}) => {
    const {data, SetData} = useContext(DbcContext);
    const [infoModalOpen,UseInfoModalOpen] = useState<boolean>(false);
    const [infoModalTitle,UseInfoModalTitle] = useState<string>('');
    const [nodeType,UseNodeType] = useState<string|undefined>(undefined);

    simulation.setOnClickCallback = (event: any, data: any) => {
        if (data && data.type && data.obj) {
            UseNodeType(data.type)
            UseInfoModalTitle(data.obj.name)
            UseInfoModalOpen(true);
        }
    };

    useEffect(()=>{
        let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (data && pageSelector==='Visual') {
            simulation.setDocument = window;
            if (!isDarkMode) {simulation.settings.fontColor = 'black'}
            simulation.documentResizeHandler()
            simulation.init();
        }
    },[data, pageSelector,simulation])

    return(
        <DbcContext.Provider value={{data,SetData}}>
        <ContentDisplay isDisplayed={pageSelector === 'Visual'} noDecoration>
            <div id='SIMULATION'></div>
            <SimHelpModal/>
            <SimulationModal
                selection={nodeType}
                isOpen={infoModalOpen}
                SetOpen={UseInfoModalOpen}
                title={infoModalTitle}/>
        </ContentDisplay>
        </DbcContext.Provider>
    );
}
export default DbcSimulation;