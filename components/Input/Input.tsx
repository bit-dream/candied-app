import React from 'react';

interface Props {
    label: string;
    id: string;
    onChange?: (value: string) => void;
}
const Input:React.FC<Props> = ({label,id,onChange}) => {

    const getUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    }

    return (
        <>
            <div className="mb-6">
                <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                </label>
                <input type="text" id={id} onChange={getUserInput}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"/>
            </div>
        </>
    );
};
export default Input;