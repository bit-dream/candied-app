import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import {DbcContext, PageSelection} from "../DbcEditor/DbcEditor";
import React, {useContext, useEffect, useReducer} from "react";
import createGraph from "./transforms";
import Simulation from "./simulation";
import FloatButton from "../Buttons/FloatButton";
import QuickAdd from "../QuickAdd/QuickAdd";

interface Props {
    pageSelector: PageSelection;
}
const DbcSimulation:React.FC<Props> = ({pageSelector}) => {
    const {data, SetData} = useContext(DbcContext);

    useEffect(()=>{
        let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (data && pageSelector==='Visual') {
            let graph = createGraph(
                data,
                '/network-tree-svgrepo-com.svg',
                '/cpu-svgrepo-com.svg',
                '/mail-svgrepo-com.svg',
                '/letter-s-svgrepo-com.svg'
            );
            let simulation = new Simulation('SIMULATION',graph, window)
            simulation.documentResizeHandler(window)
            simulation.init();
        }
    },[data, pageSelector])

    return(
        <DbcContext.Provider value={{data,SetData}}>
        <ContentDisplay isDisplayed={pageSelector === 'Visual'} noDecoration>
            <div id='SIMULATION'></div>
            <QuickAdd btn={<FloatButton icon={'add'} position={'bottom-right'}/>}/>
        </ContentDisplay>
        </DbcContext.Provider>
    );
}
export default DbcSimulation;