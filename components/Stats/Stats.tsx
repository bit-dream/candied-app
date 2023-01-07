import React, {ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface Props {
    children?: ReactNode;
    type?: 'Pills' | 'Solid'
};
const Stats:React.FC<Props> = ({children,type}) => {

    let displayType = 'Pills';
    if (type) {displayType = type};

    const pillType = twMerge(
        'flex flex-row',
        'justify-between',
        'min-w-full',
        'mb-4 mt-4'
    );
    const solidType = twMerge(
        'min-w-full'
    );
    return <>
        <div className='mt-4 mb-4 pt-2 pb-2 flex flex-row min-w-full dark:bg-slate-700 bg-white drop-shadow-lg rounded-lg'>
            {children}
        </div>
    </>
};

export default Stats;