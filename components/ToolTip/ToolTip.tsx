import React, {ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface Props {
    children?: ReactNode;
    content?: ReactNode;
    title: string;
}
const ToolTip:React.FC<Props> = ({children,title}) => {

    const toolTipClassList = twMerge(
        'pointer-events-none',
        'absolute',
        '-top-10',
        'translate',
        '-translate-x-1/2',
        'w-max',
        'opacity-0',
        'transition-opacity',
        'group-hover:opacity-100',
        'z-20'
    )

    return (
        <span className='inline-block group relative'>
            {children}
            <span className={toolTipClassList}>
                <div className='p-2 bg-white rounded-lg max-w-xs text-black'>
                    {title}
                </div>
            </span>
        </span>
    );
};

export default ToolTip;