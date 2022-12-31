import React, {Dispatch, ReactElement, ReactNode, SetStateAction} from 'react';
import Icon from "../Icon/Icon";

interface Props {
    children?: any;
    isOpen: boolean;
    UseOpen: Dispatch<SetStateAction<boolean>>;
}
const MobileMenu:React.FC<Props> = ({children, isOpen,UseOpen}) => {

    let newChildren: ReactNode[] = []; let i = 0;
    React.Children.map(children, child => {
        if (child && typeof child.props.buttonTitle === 'string' && !child.props.isLogo) {
            newChildren.push(
                <button key={i} onClick={()=>{
                    child.props.onClick();
                    UseOpen(false);
                }}
                        className='text-white text-2xl hover:bg-amber-200 p-2'>
                    {child.props.buttonTitle}
                </button>
            );
        }
        i++;
    })

    return <>
            <div className={`z-10 ${isOpen ? '' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="z-10 fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity"></div>
                <div className="absolute w-full h-full p-4">
                    <button
                        onClick={()=>{UseOpen(false)}}
                        className='z-40 text-white absolute right-2 top-2 p-2 cursor-pointer'>
                        <Icon type={'close'}/>
                    </button>
                    <div className='z-20 min-h-full relative flex flex-col items-center justify-center'>
                        {newChildren}
                    </div>
                </div>
            </div>
        </>
};

export default MobileMenu;