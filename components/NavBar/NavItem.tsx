import {twMerge} from "tailwind-merge";
import {PropsWithChildren, ReactNode} from "react";
import Image from "next/image";

const NavItem = (props: {
    buttonTitle: string,
    icon?: ReactNode,
    logoImage?: string,
    isLogo?: boolean | undefined,
    logoClass?: string,
    isFooter?: boolean
}) => {
    let mainClassList = twMerge(
        'rounded-full',
        'border border border-gray-300',
        'bg-amber-200',
        'hover:bg-gray-100',
        'w-12 h-12',
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
        'cursor-pointer'
    )}
    return <>
        <div className={mainClassList}>
            <div className='h-full w-full flex items-center justify-center relative object-scale-down text-red-800'>
                {props.icon ? props.icon : props.logoImage ? <Image src={props.logoImage} className={props.logoClass} fill alt='logo'/> : <></>}
            </div>
        </div>
        {!props.buttonTitle ? <></> :
            <div className='text-xs w-full flex justify-center font-semibold text-gray-900'>{props.buttonTitle}</div>
        }
    </>
}
export default NavItem;