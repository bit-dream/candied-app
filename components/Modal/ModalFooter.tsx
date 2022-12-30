import React, {ReactNode} from "react";
import Button from "../Buttons/Button";

interface Props {
    children?: ReactNode;
}
const ModalFooter:React.FC<Props> = ({children}) => {
    return <>
        {children}
    </>
}
export default ModalFooter;