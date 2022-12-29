import React from "react";

interface Props {
    title: string;
}
const ModalHeader:React.FC<Props> = ({title}) => {
    return <>
        <h2 className="text-2xl font-medium leading-6 text-gray-900 dark:text-white mb-5" id="modal-title">{title}</h2>
    </>
}
export default ModalHeader;