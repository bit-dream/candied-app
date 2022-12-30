import React, {PropsWithChildren} from "react";

const ButtonLayout = (props: PropsWithChildren) => {
    return <>
        <div className='flex justify-around m-2'>
            {props.children}
        </div>
    </>
}
export default ButtonLayout