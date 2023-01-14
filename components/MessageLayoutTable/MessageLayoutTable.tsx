import React from 'react';
import {Message} from "candied/lib/dbc/Dbc";
import {twMerge} from "tailwind-merge";
import ToolTip from "../ToolTip/ToolTip";

interface Props {
    message: Message;
}
const MessageLayoutTable:React.FC<Props> = ({message}) => {

    const colors = ['red','yellow','green','blue','indigo','purple','pink','sky'];
    let signalColors = new Array(64).fill('');
    let row = 9;
    signalColors = signalColors.map((signal,idx)=>{
        if (idx%8 === 0) row--;
        return `bg-${colors[idx%8]}-${row}00`
    });
    console.log(signalColors)
    const columnHeadings = Array.from(Array(8).keys()).reverse();
    const rowHeadings = Array.from(Array(8).keys()).reverse();
    return (
        <>
            <table className='text-xs'>
                <thead>
                <tr>
                    <th></th>
                    {columnHeadings.map((col,key)=>{
                        return <th key={key} className='pb-3'>{col}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {
                    rowHeadings.map((row,key)=>{
                        return (
                            <tr key={key}>
                            <th className='pr-3'>{row}</th>
                            {columnHeadings.map((col,key)=>{
                                let bit = ((row)*8)+(col);
                                let bg = ''
                                let bitData = undefined;
                                Array.from(message.signals?.values()).forEach((signal,idx)=>{
                                    if (bit >= signal.startBit && bit < signal.startBit + signal.length) {
                                        bg = signalColors[idx];
                                        bitData = <ToolTip title={signal.name}>{bit}</ToolTip>
                                    }
                                })
                                if (!bitData) bitData = <>{bit}</>
                                if (row+1 > message.dlc) {
                                    bg = 'text-slate-500'
                                }
                                return(
                                        <td key={key} className={`
                                            group 
                                            relative 
                                            w-10 
                                            h-6 
                                            text-center 
                                            ${bg}
                                        `}>
                                            {bitData}
                                        </td>
                                )
                            })
                            }
                        </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </>
    );
};

export default MessageLayoutTable;