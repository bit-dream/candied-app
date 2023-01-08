import React from 'react';

interface Props {
    title: string;
    content: string;
}
const Stat:React.FC<Props> = ({title,content}) => {
    return (
        <div className='border-r border-r-gray-500 pr-7 pt-4 pb-4 pl-2 pr-2 w-1/3 text-center last:border-none'>
            <div className='text-3xl dark:text-white text-black whitespace-nowrap truncate'>{content}</div>
            <div className='text-xs dark:text-slate-400 text-grey-300 whitespace-nowrap truncate'>{title}</div>
        </div>
    );
};

export default Stat;