import React, {ReactNode} from 'react';
import Pill from "../Pill/Pill";

interface Props {
    title?: string | ReactNode;
    content?: ReactNode;
    footer?: ReactNode;
}
const Card:React.FC<Props> = ({title,content,footer}) => {
    return <>
        <div className="max-w-lg rounded-lg overflow-hidden shadow-md mb-4 dark:bg-slate-700 bg-white hover:shadow-xl dark:hover:shadow-lg dark:hover:shadow-sky-400">
                <div className="px-6 py-4">
                    <div className="font-bold text-md truncate mb-2 dark:text-white text-black">{title}</div>
                    <div className="text-gray-700 dark:text-slate-400 text-base">
                        {content}
                    </div>
                </div>
                <div className="px-6 pt-2 pb-2">
                    {footer}
                </div>
        </div>
    </>
};

export default Card;