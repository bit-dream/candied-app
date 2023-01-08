import React, {ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface Props {
    children?: ReactNode;
}
const Stats:React.FC<Props> = ({children}) => {

    return <>
        <div className='mt-4 mb-4 pt-2 pb-2 flex flex-row min-w-full dark:bg-slate-700 bg-white drop-shadow-lg rounded-lg'>
            {children}
        </div>
    </>
};

export default Stats;