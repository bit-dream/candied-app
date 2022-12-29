import React, {ReactNode} from "react";
import Button from "../buttons/Button";

interface Props {
    children?: ReactNode;
}
const ModalFooter:React.FC<Props> = ({children}) => {
    return <>
        {children}
    </>
}
export default ModalFooter;