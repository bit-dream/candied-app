import React from 'react';
import {Message} from "candied/lib/dbc/Dbc";
import Pill from "../Pill/Pill";
interface Props {
    message: Message;
}
const AttributeDisplay:React.FC<Props> = ({message}) => {
    return (
        <div>
            {
                message.attributes.size ?
                    Array.from(message.attributes.values()).map((attribute)=>{
                        return <>
                            <div className='text-sm font-semibold'>{attribute.name}</div>
                            <div className='text-xs'><span className='font-semibold'>Type: </span>
                                {attribute.type !== null ? attribute.type : 'n/a'}</div>
                            <div className='text-xs'><span className='font-semibold'>Data Type: </span>
                                {attribute.dataType !== null ? attribute.dataType : 'n/a'}</div>
                            <div className='text-xs'><span className='font-semibold'>Range: </span>
                                [{attribute.min !== null ? attribute.min : '0'},{attribute.max !== null ? attribute.max : '0'}]</div>
                            <div className='text-xs'><span className='font-semibold'>Default Value: </span>
                                {attribute.value !== null ? attribute.defaultValue : 'n/a'}</div>
                            <div className='text-xs'><span className='font-semibold'>Value: </span>
                                {
                                    attribute.value !== null ?
                                        (attribute.dataType === 'ENUM')
                                            ?
                                            (attribute.options) ? attribute.options[parseInt(attribute.value,10)] : attribute.value : attribute.value
                                        : 'n/a'}
                            </div>
                            {
                                attribute.options !== null ? <>
                                <div className='text-xs mb-1'><span className='font-semibold'>Enum Members:</span></div>
                                <div className='flex flex-row flex-wrap justify-center items-center text-xs border border-gray-300 rounded-lg p-2'>
                                    {
                                        attribute.options?.map((val,idx)=>{
                                            return <Pill key={idx} label={idx.toString() + ': ' + val} small/>
                                        })
                                    }
                                </div></> : <></>
                            }
                            <br/>
                        </>
                    }) : <div>No Data</div>
            }
        </div>
    );
};

export default AttributeDisplay;