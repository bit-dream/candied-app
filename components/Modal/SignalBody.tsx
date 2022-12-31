import React, {ReactNode, useContext, useEffect, useState} from "react";
import ComboBox from "../ComboBox/ComboBox";
import Input from "../Input/Input";
import ComboBoxItem from "../ComboBox/ComboBoxItem";
import Dbc from "dbc-can";
import {DbcContext} from "../DbcEditor/DbcEditor";

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
        />
        <Input id={'signal_name_field'} label={'Signal Name'} onChange={nameChange}/>
        <Input id={'signal_start_bit_field'} label={'Start Bit'} onChange={startBitChange} defaultVal={0}/>
        <Input id={'signal_length_field'} label={'Length'} onChange={lengthChange} defaultVal={8}/>
    </>
}
export default SignalBody;