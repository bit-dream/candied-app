import {PropsWithChildren} from "react";

const ContentDisplayContainer = (props: PropsWithChildren) => {
    return <>
        <div className='container mx-auto flex flex-col'>
            {props.children}
        </div>
    </>
}
export default ContentDisplayContainer;