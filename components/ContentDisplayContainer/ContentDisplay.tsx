import React, {PropsWithChildren, ReactNode} from "react";
import {twMerge} from "tailwind-merge";

interface Props {
    isDisplayed: boolean;
    children?: ReactNode;
    noDecoration?: boolean;
    allowOverflow?: boolean
}

const ContentDisplay:React.FC<Props>  = ({isDisplayed,children,noDecoration,allowOverflow}) => {
    const classList = twMerge(
        noDecoration ? '' :'container',
        noDecoration ? 'w-full' : '',
        'max-h-screen',
        noDecoration ? '' : 'mx-auto',
        'flex flex-col',
        allowOverflow ? '' :'overflow-hidden',
        noDecoration ? '' : 'p-5',
        isDisplayed ? '': 'hidden'
    )
    return <>
        <div className={classList}>
            {children}
        </div>
    </>
}
export default ContentDisplay;