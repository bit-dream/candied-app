import React, {useState} from 'react';

interface Props {
    text: string;
    isChecked?: boolean;
    onChange?: (isChecked: boolean)=>void
}
const Checkbox:React.FC<Props> = ({text,isChecked,onChange}) => {
    const [elementIsChecked,UseElementIsChecked] = useState<boolean>(isChecked ? isChecked : false);

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            UseElementIsChecked(!elementIsChecked);
            if (onChange) {
                onChange(event.target.checked);
            }
        }
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="">
                    <input
                        className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="checkbox" value="" id="flexCheckDefault" checked={elementIsChecked} onChange={handleCheckChange}/>
                        <label className="inline-block text-gray-800" htmlFor="flexCheckDefault">
                            {text}
                        </label>
                </div>
            </div>
        </>
    );
};

export default Checkbox;