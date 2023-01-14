import React from 'react';
import {twMerge} from "tailwind-merge";

interface Props {
    payload: number[];
    id: number;
}
const PayloadArray:React.FC<Props> = ({payload,id}) => {
    return (
        <div className='text-black text-xs shadow-slate-900 shadow-sm border-black'>
            <span className='pl-1 pr-2 bg-black text-white rounded-bl-sm rounded-tl-sm'>
                ID: 0x{id.toString(16).toUpperCase()}
            </span>
            {
                payload.map((num,idx)=>{
                    let spanProps = twMerge(
                        'odd:bg-gray-200',
                        'even:bg-gray-400',
                        'pl-1 pr-1',
                        'last:rounded-tr-sm',
                        'last:rounded-br-sm',
                        'border-r border-black'
                    )
                    return <>
                        <span className={spanProps}>
                            {num.toString(16).toUpperCase()}
                        </span>
                    </>
                })
            }
        </div>
    );
};

export default PayloadArray;