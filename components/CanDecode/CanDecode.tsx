import React, {useContext, useEffect, useState} from 'react';
import {Can} from 'candied';
import {DbcContext} from "../DbcEditor/DbcEditor";
import Input from "../Input/Input";
import {Message} from "candied/lib/dbc/Dbc";
import {BoundSignal} from "candied/lib/can/Can";
import Pill from "../Pill/Pill";

interface Props {
    message: Message;
}
const CanDecode:React.FC<Props> = ({message}) => {
    const {data} = useContext(DbcContext);

    const [payload,UsePayload] = useState<number[]>([0,0,0,0,0,0,0,0]);
    const [boundSignals,UseBoundSignals] = useState<BoundSignal[]|undefined>(undefined)

    const can = new Can();
    can.database = data;

    useEffect(()=>{
        let payloadRef = [...payload];
        let messagePayload = payloadRef.slice(0,message.dlc);
        const frame = can.createFrame(message.id,messagePayload)
        const bndMsg = can.decode(frame);
        if (bndMsg) {
            const bndSigs = bndMsg.boundSignals;
            if (bndSigs) {
                let sigs = Array.from(bndSigs.values())
                UseBoundSignals(sigs);
            }
        }
    },[payload,message])

    const requiredInputFields = Array(message.dlc).fill(0);
    return <>
        <div className='flex flex-row flex-wrap justify-center'>
            {
                requiredInputFields.map((input,idx)=>{
                    return <Input
                        key={idx}
                        label={`Byte${idx}`}
                        id={`Byte${idx}`}
                        defaultVal={0}
                        sm
                        onChange={(value)=>{
                            let newPayload = [...payload];
                            newPayload[idx] = parseInt(value,10);
                            UsePayload(newPayload);
                    }}/>
                })
            }
        </div>
        <div>{
            boundSignals ?
            boundSignals.map((signal,idx)=>{
                return <>
                    <div className='font-semibold text-sm mb-1'>{signal.boundData.signal.name}</div>
                    <div key={idx} className='flex flex-row flex-wrap text-xs'>
                        <Pill label={`Value: ${signal.value}`} small/>
                        <Pill label={`Phy Val: ${signal.physValue}`} small/>
                        <Pill label={`Phy Val: ${signal.rawValue}`} small/>
                    </div>
                </>
            })
                : <></>
        }</div>
    </>
};

export default CanDecode;