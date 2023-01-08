import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import {DbcContext, PageSelection} from "../DbcEditor/DbcEditor";
import React, {useContext, useEffect, useReducer, useState} from "react";
import createGraph from "./transforms";
import Simulation from "./simulation";
import FloatButton from "../Buttons/FloatButton";
import QuickAdd from "../QuickAdd/QuickAdd";
import Modal from "../Modal/Modal";
import Button from "../Buttons/Button";
import Checkbox from "../Checkbox/Checkbox";
import UseLocalStorage from "../../hooks/UseLocalStorage";
import SimHelpModal from "../Modal/SimHelpModal";

interface Props {
    pageSelector: PageSelection;
    simulation: Simulation;
}
const DbcSimulation:React.FC<Props> = ({pageSelector,simulation}) => {
    const {data, SetData} = useContext(DbcContext);

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
        </ContentDisplay>
        </DbcContext.Provider>
    );
}
export default DbcSimulation;