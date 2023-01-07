import React, {useEffect, useState} from 'react';
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Buttons/Button";
import Modal from "./Modal";

interface Props {

}
const SimHelpModal:React.FC<Props> = ({}) => {

    const [modalOpen,UseModalOpen] = useState(false);

    useEffect(()=>{
        const item = localStorage.getItem('showSimHelpModal');
        if (item) {
            UseModalOpen(JSON.parse(item));
        } else {
            localStorage.setItem('showSimHelpModal',JSON.stringify(true));
            UseModalOpen(true)
        }
    },[])

    return (
        <>
            <Modal
                isOpen={modalOpen}
                heading={'DBC Visualization: Getting started'}
                body={
                       <>
                           <p className='text-xs text-gray-400'>This page visualizes the content in a DBC file by showing the interconnection
                               of network nodes, messages, and signals and how they all link and flow into one another.
                           </p>
                           <br/>
                           <h1 className='text-lg text-center font-thin'>Using the simulation</h1>
                           <ul className='text-xs list-none text-center'>
                               <li><div className='font-semibold text-sm'>Zoom</div>
                                   Scroll with your mouse wheel or your typical mobile zoom gesture</li>
                               <li><div className='font-semibold text-sm'>Pan</div>
                                   Click/press and drag around to pan around the nodes</li>
                               <li><div className='font-semibold text-sm'>Drag</div>
                                   All nodes in the simulation and be moved by dragging them</li>
                               <li><div className='font-semibold text-sm'>Sticky</div>
                                   Nodes will be stuck in place after dragging them. To unstick them, simply click
                                   a node a single time
                               </li>
                               <li><div className='font-semibold text-sm'>Info</div>
                                   Additional information can be displayed about a specific node by double clicking it
                               </li>
                           </ul>
                       </>
                   }
                footer={
                       <>
                           <div className='flex flex-row w-full justify-between items-center'>
                               <div className=''>
                                   <Checkbox
                                       text='Dont show this again'
                                       onChange={(checked)=>{
                                           if (checked) {
                                               localStorage.setItem('showSimHelpModal',JSON.stringify(false));
                                           } else {
                                               localStorage.setItem('showSimHelpModal',JSON.stringify(true));
                                           }
                                       }
                                       }/>
                               </div>
                               <Button text='Close' color='primary' onClick={()=>UseModalOpen(false)}/>
                           </div>
                       </>
                   }
            />
        </>
    );
};

export default SimHelpModal;