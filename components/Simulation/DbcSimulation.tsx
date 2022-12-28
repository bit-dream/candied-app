import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import {DbcData, Node} from "dbc-can/lib/dbc/Dbc";
import {PageSelection} from "../../pages/editor";
import React, {useEffect} from "react";
import createGraph from "./transforms";
import Simulation from "./simulation";

interface Props {
    data: DbcData|undefined;
    pageSelector: PageSelection;
}
const DbcSimulation:React.FC<Props> = ({data, pageSelector}) => {
    useEffect(()=>{
        let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        console.log(isDarkMode)
        if (data && pageSelector==='Visual') {
            let graph = createGraph(
                data,
                '/network-tree-svgrepo-com.svg',
                '/cpu-svgrepo-com.svg',
                '/mail-svgrepo-com.svg',
                '/letter-s-svgrepo-com.svg'
            );
            let simulation = new Simulation('SIMULATION',graph)
            simulation.settings.fontColor = isDarkMode ? 'white': 'black';
            simulation.init();
        }
    },[data])

    return(
        <ContentDisplay isDisplayed={pageSelector === 'Visual'} noDecoration>
            <div id='SIMULATION'></div>
        </ContentDisplay>
    );
}
export default DbcSimulation;