import {PropsWithChildren} from "react";

const ContentDisplayContainer = (props: PropsWithChildren) => {
    return <>
        <div className='container max-h-screen mx-auto flex flex-col justify-around overflow-hidden'>
            {props.children}
        </div>
    </>
}
export default ContentDisplayContainer;