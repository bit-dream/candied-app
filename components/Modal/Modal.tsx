import {twMerge} from "tailwind-merge";
import Button from "../buttons/Button";
import Icon from "../Icon/Icon";
import ModalBody from "./ModalBody";
import React, {ReactNode} from "react";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";

interface Props {
    isOpen: boolean
    heading: string;
    body: ReactNode;
    footer: ReactNode;
}

const Modal:React.FC<Props> = ({isOpen,heading,body,footer}) => {

    return <>
    <div className={`relative z-10 ${isOpen ? '' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white dark:bg-slate-600 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mt-3 mb-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <ModalHeader title={heading}/>
                        <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                            <ModalBody>{body}</ModalBody>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-slate-500 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <ModalFooter>{footer}</ModalFooter>
                </div>
            </div>
        </div>
    </div>
    </div>

    </>
}
export default Modal;