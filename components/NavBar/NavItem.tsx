import {twMerge} from "tailwind-merge";
import {PropsWithChildren, ReactNode} from "react";

const NavItem = (props: {buttonTitle: string, icon: ReactNode}) => {
    const classList = twMerge(
        'rounded-full',
        'border border-2 border-gray-300',
        'bg-amber-100',
        'hover:bg-gray-100',
        'w-12 h-12',
        'mt-5',
        'self-center',
        'duration-300 rounded-[22px] hover:rounded-sm'
    );
    return <>
        <div className={classList}>
            <div className='h-full w-full flex items-center justify-center'>
                {props.icon}
            </div>
        </div>
        <div className='text-xs w-full flex justify-center font-semibold'>
            {props.buttonTitle}
        </div>
    </>
}
export default NavItem;