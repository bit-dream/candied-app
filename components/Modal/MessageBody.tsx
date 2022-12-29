import React, {ReactNode} from "react";

interface Props {
}

const MessageBody:React.FC<Props> = () => {
    return <>
        <div className="mb-6">
            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Message Name
            </label>
            <input type="text" id="base-input"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div className="mb-6">
            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Message ID
            </label>
            <input type="text" id="base-input"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div className="mb-6">
            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                DLC
            </label>
            <input type="text" id="base-input"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
    </>
}
export default MessageBody;