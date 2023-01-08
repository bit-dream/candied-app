import {twMerge} from "tailwind-merge";
import {PropsWithChildren, ReactNode} from "react";
import Image from "next/image";

const NavItem = (props: {
    buttonTitle: string,
    icon?: ReactNode,
    logoImage?: string,
    isLogo?: boolean | undefined,
    logoClass?: string,
    isFooter?: boolean,
    onClick?: () => void,
    noDecoration?: boolean
}) => {
    let mainClassList = twMerge(
        'rounded-full',
        'border border border-gray-300',
        'bg-amber-200',
        'hover:bg-gray-100',
        'w-10 h-10',
        'mt-3',
        'self-center',
        'duration-300 rounded-[22px] hover:rounded-lg',
        'cursor-pointer',
        `${props.isFooter ? 'justify-self-end': ''}`
    );
    if (props.isLogo) {mainClassList = twMerge(
        'w-12 h-12',
        'mt-5',
        'self-center',
        'cursor-pointer',
        'hover'
    )}
    if (props.noDecoration) {mainClassList = twMerge(
        'rounded-full',
        'w-10 h-10',
        'mt-3',
        'self-center',
        'hover:bg-gray-100',
        'duration-300 rounded-[22px] hover:rounded-lg',
        'cursor-pointer'
    )}
    let titleClassList = twMerge(
        `${props.isLogo ? 'text-xs' : 'text-[10px]'}`,
        'w-full',
        'flex',
        'justify-center',
        'font-semibold',
        'text-grey-900'
    );
    return <>
        <div className={mainClassList}>
            <button
                onClick={props.onClick}
                className='h-full w-full flex items-center justify-center relative object-scale-down text-red-800'>
                {props.icon ? props.icon : props.logoImage ? <Image src={props.logoImage} className={props.logoClass} fill alt='logo'/> : <></>}
            </button>
        </div>
        {!props.buttonTitle ? <></> :
            <div className={titleClassList}>{props.buttonTitle}</div>
        }
    </>
}
export default NavItem;