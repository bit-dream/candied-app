import React from "react";

interface Props {
    tabs: string[];
    activeTab: string;
    tabClicked: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Tabs:React.FC<Props> = ({tabs,activeTab,tabClicked}) => {

    return <>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-3">
            <ul className='flex flex-wrap -mb-px'>
            {tabs.map(tab=>{
                return <>
                    <li className="mr-2">
                        <button id={tab} aria-current="page" onClick={tabClicked}
                           className={`inline-block ${activeTab === tab ? 'text-sky-400' : ''} p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}>
                            {tab}
                        </button>
                    </li>
                </>
            })
            }
            </ul>
        </div>
    </>
}
export default Tabs;