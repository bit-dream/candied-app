import React, {ReactNode} from "react";

interface Props {
    children?: ReactNode;
}
const ModalBody:React.FC<Props> = ({children}) => {
    return <>
        {children}
    </>
}
export default ModalBody;