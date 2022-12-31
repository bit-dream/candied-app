import React, {ReactNode} from "react";
import QuickAdd from "../QuickAdd/QuickAdd";
import Input from "../Input/Input";

interface Props {
    UseNodeName: React.Dispatch<React.SetStateAction<string>>;
}

const NodeBody:React.FC<Props> = ({UseNodeName}) => {

    const nodeNameChange = (name: string) => {
        UseNodeName(name);
    }

    return <>
        <Input id={'node_name_field'} label={'Node Name'} onChange={nodeNameChange}/>
    </>
}
export default NodeBody;