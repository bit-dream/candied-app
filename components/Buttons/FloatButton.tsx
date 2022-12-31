import React from 'react';
import {twMerge} from "tailwind-merge";

interface Props {

}
const FloatButton:React.FC<Props> = ({}) => {

    const btnClassList = twMerge(
        'relative'
    );
    return (
        <>
            <button className={btnClassList}>
            </button>
        </>
    );
};

export default FloatButton;