import React, {ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface Props {
    children?: ReactNode;
};
const Stats:React.FC<Props> = ({children}) => {
    const classList = twMerge(
        'flex flex-row',
        'min-'
    );
    return (
        <div className='flex flex-row justify-between min-w-full mb-4 mt-4'>
            {children}
        </div>
    );
};

export default Stats;