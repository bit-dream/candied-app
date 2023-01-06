import {twMerge} from "tailwind-merge";
import {colors, sizes} from "../const";
import React, {ReactNode} from "react";

export type BtnColors = 'primary' | 'secondary' | 'danger' | 'info' | 'warning';
interface Props {
    text: string;
    size?: number | string;
    color?: BtnColors;
    rounded?: boolean;
    href?: string;
    fullWidth?: boolean;
    icon?: ReactNode;
    noShadow?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button:React.FC<Props> = ({
    text,
    size,
    color,
    rounded,
    href,
    fullWidth,
    icon,
    noShadow,
    onClick
}) => {

    let btnColor: string; let brdColor: string; let hvrColor: string; let drkHoverColor: string;
    switch(color){
        case "danger":
            btnColor = 'bg-red-400';
            brdColor = 'border-red-600';
            hvrColor = 'hover:bg-red-200';
            drkHoverColor = 'dark:shadow-red-600';
            break;
        case "primary":
            btnColor = 'bg-gray-400';
            brdColor = 'border-gray-600';
            hvrColor = 'hover:bg-gray-200';
            drkHoverColor = 'dark:shadow-gray-600';
            break;
        case "secondary":
            btnColor = 'bg-indigo-400';
            brdColor = 'border-indigo-600';
            hvrColor = 'hover:bg-indigo-200';
            drkHoverColor = 'dark:shadow-indigo-600';
            break;
        case "info":
            btnColor = 'bg-sky-400';
            brdColor = 'border-sky-600';
            hvrColor = 'hover:bg-sky-200';
            drkHoverColor = 'dark:shadow-sky-600';
            break;
        case "warning":
            btnColor = 'bg-amber-400';
            brdColor = 'border-amber-600';
            hvrColor = 'hover:bg-amber-200';
            drkHoverColor = 'dark:shadow-amber-600';
            break;
        default:
            btnColor = 'bg-gray-400';
            brdColor = 'border-gray-600';
            hvrColor = 'hover:bg-gray-200';
            drkHoverColor = 'dark:shadow-gray-600';
            break;
    }

    const classList = twMerge(
        size === 'sm' ? 'pt-1 pb-1' : `pt-2 pb-2`,
        `border`,
        btnColor,
        brdColor,
        hvrColor,
        `rounded-md`,
        size === 'sm' ? 'pl-1 pr-1' :`pl-6 pr-6`,
        'ml-1 mr-1',
        'mt-1 mb-1',
        size === 'sm' ? 'text-xs' : '',
        noShadow ? '' : `shadow-md`,
        noShadow ? '' : `hover:shadow-sm`,
        drkHoverColor,
        fullWidth ? 'min-w-full' : '',
        'flex justify-center items-center'
    )
    return <>
        {href ?
            <a className={classList}>{icon ? icon : <></>}{text}</a>
            : <button className={classList} onClick={onClick}>{icon ? icon : <></>}{text}</button>}
    </>
}
export default Button;