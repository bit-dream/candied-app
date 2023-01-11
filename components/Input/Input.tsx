import React, {useEffect, useRef, useState} from 'react';
import {twMerge} from "tailwind-merge";

interface Props {
    label: string;
    id: string;
    onChange?: (value: string) => void;
    defaultVal?: string|number;
    placeholder?: string;
    required?: boolean;
    sm?: boolean;
}
const Input:React.FC<Props> = ({
    label,
    id,
    onChange,
    defaultVal,
    placeholder,
    required,
    sm}) => {

    const inputRef = useRef(null);
    const [inputValue, UseInputValue] = useState<string|number>(defaultVal !== undefined ? defaultVal : '');

    const getUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    }

    const inputClassList = twMerge(
        'bg-white',
        required ? 'border-2 border-gray-300': 'border border-gray-300',
        'text-gray-900',
        'text-sm',
        'rounded-lg',
        'block',
        sm ? 'w-10' :'w-full',
        sm ? 'mr-2' : '',
        sm ? 'p-1' : 'p-2.5',
        'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white',
        'focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
    )

    const labelClassList = twMerge(
        'block',
        'mb-2',
        sm ? 'text-xs' :'text-sm',
        'font-medium',
        'text-gray-900',
        'dark:text-white'
    )

    return (
        <>
            <div className="mb-6">
                <label htmlFor={id} className={labelClassList}>
                    <span>{label}</span>
                    {
                        sm ? <></>: <span className='float-right text-gray-400'>{required ? 'Required' : 'Optional'}</span>
                    }
                </label>
                <input type="text" id={id} onChange={getUserInput} ref={inputRef}
                       className={inputClassList}
                       defaultValue={inputValue}
                       placeholder={placeholder ? placeholder : ''}
                />
            </div>
        </>
    );
};
export default Input;