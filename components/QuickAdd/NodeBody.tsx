import React from "react";
import Input from "../Input/Input";

interface Props {
    UseNodeName: React.Dispatch<React.SetStateAction<string>>;
}

const NodeBody:React.FC<Props> = ({UseNodeName}) => {

    const nodeNameChange = (name: string) => {
        UseNodeName(name);
    }

    return <>
        <Input id={'node_name_field'} label={'Node Name'} onChange={nodeNameChange} placeholder='Node Name' required/>
    </>
}
export default NodeBody;