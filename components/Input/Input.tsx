import React, {useEffect, useRef, useState} from 'react';

interface Props {
    label: string;
    id: string;
    onChange?: (value: string) => void;
    defaultVal?: string|number;
    placeholder?: string;
    required?: boolean;
}
const Input:React.FC<Props> = ({label,id,onChange,defaultVal,placeholder,required}) => {

    const inputRef = useRef(null);
    const [inputValue, UseInputValue] = useState<string|number>(defaultVal !== undefined ? defaultVal : '');

    const getUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    }

    return (
        <>
            <div className="mb-6">
                <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span>{label}</span>
                    <span className='float-right text-gray-400'>{required ? 'Required' : 'Optional'}</span>
                </label>
                <input type="text" id={id} onChange={getUserInput} ref={inputRef}
                       className={`bg-white border ${required ? 'border-2 border-gray-300': 'border-gray-300'} text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                       defaultValue={inputValue}
                       placeholder={placeholder ? placeholder : ''}
                />
            </div>
        </>
    );
};
export default Input;