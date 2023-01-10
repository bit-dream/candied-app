import React, {ReactNode, useContext, useEffect, useState} from "react";
import ComboBox from "../ComboBox/ComboBox";
import Input from "../Input/Input";
import {DbcContext} from "../DbcEditor/DbcEditor";
import Checkbox from "../Checkbox/Checkbox";

interface Props {
    UseStartBit:  React.Dispatch<React.SetStateAction<number>>;
    UseSignalLength:  React.Dispatch<React.SetStateAction<number>>;
    UseSignalName:  React.Dispatch<React.SetStateAction<string>>;
    UseSelectedMessage:  React.Dispatch<React.SetStateAction<string>>;
    resetFields?: boolean;
}

const SignalBody:React.FC<Props> = ({UseStartBit,UseSignalLength,UseSignalName,UseSelectedMessage,resetFields}) => {

    const {data, SetData} = useContext(DbcContext);
    const messageSelected = (selection: string) => {
        UseSelectedMessage(selection);
    }

    const nameChange = (value: string) => {
        UseSignalName(value);
    }
    const startBitChange = (value: string) => {
        UseStartBit(parseInt(value));
    }
    const lengthChange = (value: string) => {
        UseSignalLength(parseInt(value));
    }

    const messages = Array.from(data.messages.keys());

    return <>
        <ComboBox
            items={messages}
            selectedItem={messages[0]}
            onSelection={messageSelected}
            required
        />
        <Input id={'signal_name_field'} label={'Signal Name'} onChange={nameChange} placeholder='Signal Name' required/>
        <Input id={'signal_start_bit_field'} label={'Start Bit'} onChange={startBitChange} placeholder='Number' required/>
        <Input id={'signal_length_field'} label={'Length'} onChange={lengthChange} placeholder='Number' required/>
        <ComboBox
            items={['Intel','Motorola']}
            selectedItem={'Intel'}
            onSelection={()=>{}}
            position={'top'}
        />
        <ComboBox
            items={['Unsigned','Signed']}
            selectedItem={'Unsigned'}
            onSelection={()=>{}}
            position={'top'}
        />
        <div className='flex justify-between flex-wrap'>
            <Input id={'signal_factor'} label={'Factor'} onChange={lengthChange} placeholder='1' defaultVal={1}/>
            <Input id={'signal_offset'} label={'Offset'} onChange={lengthChange} placeholder='0' defaultVal={0}/>
        </div>
        <div className='flex justify-between flex-wrap'>
            <Input id={'signal_min'} label={'Min'} onChange={lengthChange} placeholder='0' defaultVal={0}/>
            <Input id={'signal_max'} label={'Max'} onChange={lengthChange} placeholder='0' defaultVal={0}/>
        </div>
        <ComboBox
            items={['No Selection','Single','Double']}
            selectedItem={'No Selection'}
            onSelection={()=>{}}
            position={'top'}
        />
    </>
}
export default SignalBody;