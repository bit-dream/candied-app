import React from 'react';
import {Message, Node, Signal} from "candied/lib/dbc/Dbc";
import Modal from "./Modal";
import Button from "../Buttons/Button";

interface Props {
    selection: string | undefined;
    isOpen: boolean;
    SetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
}
const SimulationModal:React.FC<Props> = ({selection,isOpen,SetOpen,title}) => {

    return <>
        <Modal
            isOpen={isOpen}
            heading={title}
            body={
                <>
                    <div className='text-lg font-semibold'>Type: {selection?.toUpperCase()}</div>
                </>
            }
            footer={
            <Button
                text='Close'
                color='danger'
                onClick={()=>SetOpen(false)}
                noShadow
            />}/>
    </>
};

export default SimulationModal;