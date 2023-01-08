import React, {ReactNode, useContext, useState} from 'react';
import {Message, Node, Signal} from "candied/lib/dbc/Dbc";
import Modal from "./Modal";
import Button from "../Buttons/Button";
import Tabs from "../Tabs/Tabs";
import {DbcContext} from "../DbcEditor/DbcEditor";

interface Props {
    selection: string | undefined;
    isOpen: boolean;
    SetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    nodeObj: Node | Signal | Message | undefined;
}

type Tabs = 'General' | 'Attributes';
const SimulationModal:React.FC<Props> = ({selection,isOpen,SetOpen,title,nodeObj}) => {
    const [activeTab,UseActiveTab] = useState<Tabs>('General');
    const {data} = useContext(DbcContext);

    const tabClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (event.target) {
            let btn = event.target as HTMLButtonElement
            UseActiveTab(btn.id as Tabs)
        }
    }

    let generalBody: ReactNode;
    let attributesBody: ReactNode[] | ReactNode;
    if (nodeObj) {
        generalBody = <>
            <div className='text-lg'>
                <span className='font-semibold'>Description: </span>
                {nodeObj.description ? nodeObj.description : 'n/a'}
            </div>
        </>;

        const attributes = Array.from(nodeObj.attributes.values());
        if (attributes.length) {
            attributesBody = attributes.map((attribute,idx)=>{
                return <>
                    <div className='text-lg font-semibold'>{attribute.name}</div>
                    <div><span className='font-semibold'>Min: </span>
                        {attribute.min !== null ? attribute.min : 'n/a'}</div>
                    <div><span className='font-semibold'>Max: </span>
                        {attribute.max !== null ? attribute.max : 'n/a'}</div>
                    <div><span className='font-semibold'>Data Type: </span>
                        {attribute.dataType !== null ? attribute.dataType : 'n/a'}</div>
                    <div><span className='font-semibold'>Type: </span>
                        {attribute.type !== null ? attribute.type : 'n/a'}</div>
                    <div><span className='font-semibold'>Value: </span>
                        {attribute.value !== null ? attribute.value : 'n/a'}</div>
                    <div><span className='font-semibold'>Options: </span>
                        {attribute.options !== null ? attribute.options.join(' ') : 'n/a'}</div>
                    <br/>
                </>
            })
        } else {
            attributesBody = <div className='text-lg'>No Data</div>
        }
    }

    return <>
        <Modal
            isOpen={isOpen}
            heading={title}
            body={
                <>
                    <Tabs
                        tabs={['General','Attributes']}
                        activeTab={activeTab}
                        tabClicked={tabClicked}
                    />
                    {
                        (activeTab === 'General') ?
                            <>
                                {generalBody}
                            </>
                            :
                            (activeTab === 'Attributes') ?
                                <>
                                    {attributesBody}
                                </>
                                :
                                <></>
                    }
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