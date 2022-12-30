import React, {Fragment, ReactNode, useEffect, useState} from 'react'
import ComboBoxItem from "./ComboBoxItem";

interface Props {
    items: string[];
    selectedItem: string;
    onSelection: (selected: string) => void;

}
const ComboBox:React.FC<Props> = ({items,selectedItem, onSelection}) => {
    const [open, SetOpen] = useState(false);
    const [currentSelection, SetCurrentSelection] = useState<string>(selectedItem);

    const liSelected = (event: React.MouseEvent<HTMLLIElement>) => {
        let target = event.target as HTMLLIElement;
        SetCurrentSelection(target.innerText);
        SetOpen(false);
    }

    useEffect(()=>{
        onSelection(currentSelection);
    },[currentSelection])

    return <>
        <div className='mb-6'>
            <label id="listbox-label" className="block text-sm font-medium text-black dark:text-white">Assigned to</label>
            <div className="relative mt-2">
                <button type="button" onClick={()=>SetOpen(!open)}
                        className="relative w-full cursor-default rounded-md border border-gray-300 bg-white dark:bg-slate-700 py-2.5 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                  <span className="flex items-center">
                    <span className="ml-3 block truncate">{currentSelection}</span>
                  </span>

                </button>

                <ul className={`${open ? '' : 'hidden'} absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-slate-700 dark:text-white text-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
                    tabIndex={-1} role="listbox" aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-option-3">
                    {
                        items.map((item,k)=>{
                            return <>
                                <ComboBoxItem key={k} name={item} selected={item===selectedItem} onSelection={liSelected}/>
                            </>
                        })
                    }
                </ul>
            </div>
        </div>
    </>
}
export default ComboBox;
