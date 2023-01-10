import {twMerge} from "tailwind-merge";
import {PropsWithChildren, useState} from "react";
import FloatButton from "../Buttons/FloatButton";
import MobileMenu from "./MobileMenu";

const NavBar = (props: PropsWithChildren) => {
    const classList = twMerge(
        'w-full',
        'flex',
        'flex-col'
    );

    const [mobileMenuDisplayed,UseMobileMenuDisplayed] = useState<boolean>(false);

    return <>
        <FloatButton icon={'widgets'} mobileOnly onClick={()=>{UseMobileMenuDisplayed(true)}} position={'bottom-left'}/>
        <div className='flex h-screen w-16 bg-amber-300 hidden lg:block md:block'>
            <div className={classList}>
                {props.children}
            </div>
        </div>
        <MobileMenu isOpen={mobileMenuDisplayed} UseOpen={UseMobileMenuDisplayed}>
            {props.children}
        </MobileMenu>
    </>
}
export default NavBar;