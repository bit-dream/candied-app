import React from 'react';
import {twMerge} from "tailwind-merge";
import Icon from "../Icon/Icon";

interface Props {
    icon: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    mobileOnly?: boolean;
    position?: 'bottom-left'|'bottom-right';
}
const FloatButton:React.FC<Props> = ({icon,onClick,mobileOnly,position}) => {

    let btnPosition = 'bottom-right';
    if (position) {
        btnPosition = position;
    }
    const btnClassList = twMerge(
        'z-10',
        'absolute',
        (btnPosition === 'bottom-right') ? 'bottom-5 right-5' : 'bottom-5 left-5',
        'p-4',
        'w-16',
        'h-16',
        'rounded-[999px]',
        `bg-indigo-400`,
        'hover:bg-indigo-300',
        'duration-300 hover:w-20 hover:h-20 hover:translate-x-1 hover:translate-y-1',
        'flex justify-center items-center',
        `${mobileOnly ? 'visible sm:invisible md:invisible lg:invisible' : ''}`
    );
    return (
        <>
            <button className={btnClassList} onClick={onClick}>
                <Icon type={icon}/>
            </button>
        </>
    );
};

export default FloatButton;