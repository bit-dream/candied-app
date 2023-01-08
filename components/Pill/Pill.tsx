import React from 'react';
import {twMerge} from "tailwind-merge";
import Icon from "../Icon/Icon";

interface Props {
    label: string;
    color?: string;
    icon?: string;
    noMargin?: boolean;
    small?: boolean;
    minW?: boolean;
}
const Pill:React.FC<Props> = ({label,color,icon,noMargin,small,minW}) => {

    const classList = twMerge(
        'inline-flex',
        color ? color : 'bg-gray-200',
        'rounded-full',
        'px-4',
        small ? 'py-0' : 'py-1',
        'text-xs',
        small ? '' :'font-semibold',
        'text-gray-700',
        noMargin ? '' : 'mr-2',
        'mb-2',
        minW ? 'min-w-[72px]' : ''

    )

    return (
        <>
            <span
                className={classList}>
                {icon ? <Icon type={icon} sm/>: <></>}
                &nbsp;
                {label}
            </span>
        </>
    );
};

export default Pill;