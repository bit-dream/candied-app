import React, {Fragment, ReactNode, useEffect, useState} from 'react'
import ComboBoxItem from "./ComboBoxItem";
import Icon from '../Icon/Icon'

interface Props {
    items: string[];
    selectedItem: string|undefined;
    onSelection: (selected: string) => void;
    position?: string;
    required?: boolean;
}
const ComboBox:React.FC<Props> = ({items,selectedItem, onSelection, position,required}) => {
    const [open, SetOpen] = useState(false);
    const [currentSelection, SetCurrentSelection] = useState<string|undefined>(selectedItem);

    const liSelected = (event: React.MouseEvent<HTMLLIElement>) => {
        let target = event.target as HTMLLIElement;
        SetCurrentSelection(target.innerText);
        SetOpen(false);
    }

    useEffect(()=>{
        if(currentSelection) onSelection(currentSelection);
    },[currentSelection, onSelection])

    let dropDownDirection = ''
    if (position === 'top') dropDownDirection = 'bottom-12'
    return <>
        <div className='mb-6'>
            <label id="listbox-label" className="block text-sm font-medium text-black dark:text-white">
                <span>Assigned to</span>
                <span className='float-right text-gray-400'>{required ? 'Required' : 'Optional'}</span>
            </label>
            <div className="relative mt-2">
                <button type="button" onClick={()=>SetOpen(!open)}
                        className="relative w-full cursor-default rounded-md border border-gray-300 bg-white dark:bg-slate-700 py-2.5 pr-2 pl-3 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                  <div className="flex flex-row justify-between">
                    <span className="truncate">{currentSelection}</span>
                    <span className='flex justify-center items-center'><Icon type='arrow_drop_down'/></span>
                  </div>
                </button>

                <ul className={`${open ? '' : 'hidden'} absolute ${dropDownDirection} z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-slate-700 dark:text-white text-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
                    tabIndex={-1} role="listbox" aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-option-3">
                    {
                        items.map((item,k)=>{
                            return <>
                                <ComboBoxItem key={k.toString()} name={item} selected={item===selectedItem} onSelection={liSelected}/>
                            </>
                        })
                    }
                </ul>
            </div>
        </div>
    </>
}
export default ComboBox;
