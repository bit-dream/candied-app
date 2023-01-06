import React from 'react';

interface Props {
    title: string;
    content: string;
}
const Stat:React.FC<Props> = ({title,content}) => {
    return (
        <div className='dark:bg-slate-500 bg-white rounded-lg drop-shadow-lg pl-7 pr-7 pt-4 pb-4 w-1/4'>
            <div className='text-xs text-gray-800 whitespace-nowrap truncate'>{title}</div>
            <div className='text-3xl text-black whitespace-nowrap truncate'>{content}</div>
        </div>
    );
};

export default Stat;