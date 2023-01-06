import React, {PropsWithChildren, ReactNode} from "react";
import {twMerge} from "tailwind-merge";

interface Props {
    isDisplayed: boolean;
    children?: ReactNode;
    noDecoration?: boolean
}

const ContentDisplay:React.FC<Props>  = ({isDisplayed,children,noDecoration}) => {
    const classList = twMerge(
        noDecoration ? '' :'container',
        noDecoration ? 'w-full' : '',
        'max-h-screen',
        noDecoration ? '' : 'mx-auto',
        'flex flex-col',
        'justify-start',
        'overflow-hidden',
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