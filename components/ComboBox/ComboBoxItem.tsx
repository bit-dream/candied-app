import React from 'react';

interface Props {
    name: string;
    selected: boolean;
    onSelection: (event: React.MouseEvent<HTMLLIElement>) => void;
    key:string;
}
const ComboBoxItem:React.FC<Props> = ({name,selected,onSelection, key}) => {
    return <>
        <li key={key} className="relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-amber-200"
            role="option" aria-selected={selected}
            onClick={onSelection}
        >
            <div className="flex items-center">
                <span className="font-normal ml-3 block truncate">{name}</span>
            </div>
        </li>
    </>
}
export default ComboBoxItem;