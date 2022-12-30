import React, {ReactNode, useEffect, useState} from "react";
import ComboBox from "../ComboBox/ComboBox";
import Input from "../Input/Input";
import ComboBoxItem from "../ComboBox/ComboBoxItem";

interface Props {
    UseStartBit:  React.Dispatch<React.SetStateAction<number>>;
    UseSignalLength:  React.Dispatch<React.SetStateAction<number>>;
    UseSignalName:  React.Dispatch<React.SetStateAction<string>>;
    UseSelectedMessage:  React.Dispatch<React.SetStateAction<string>>;
}

const SignalBody:React.FC<Props> = ({UseStartBit,UseSignalLength,UseSignalName,UseSelectedMessage}) => {

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

    return <>
        <ComboBox
            items={['Message1','Message2']}
            selectedItem={'Message1'}
            onSelection={messageSelected}
        />
        <Input id={'signal_name_field'} label={'Signal Name'} onChange={nameChange}/>
        <Input id={'signal_start_bit_field'} label={'Start Bit'} onChange={startBitChange}/>
        <Input id={'signal_length_field'} label={'Length'} onChange={lengthChange}/>
    </>
}
export default SignalBody;