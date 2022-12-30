import React, {ReactNode} from "react";
import QuickAddModal from "./QuickAddModal";
import Input from "../Input/Input";

interface Props {
}

const NodeBody:React.FC<Props> = () => {
    return <>
        <Input id={'node_name_field'} label={'Node Name'}/>
        <Input id={'node_description_field'} label={'Description'}/>
    </>
}
export default NodeBody;