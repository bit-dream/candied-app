import {twMerge} from "tailwind-merge";
import {PropsWithChildren} from "react";

const NavBar = (props: PropsWithChildren) => {
    const classList = twMerge(
        'w-full',
        'flex',
        'flex-col',
        'justify-center'
    );
    return <>
        <div className='h-screen w-16 bg-amber-300 hidden lg:block md:block'>
            <div className={classList}>
                {props.children}
            </div>
        </div>
    </>
}
export default NavBar;