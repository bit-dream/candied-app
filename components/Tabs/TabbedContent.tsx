import React, {useState, useCallback, ReactNode, ReactElement} from "react"
import Tab from "./Tab";

interface Props {
    children?: ReactElement[];
}
const TabbedContent:React.FC<Props> = ({ children }) => {
    let initialTab:string|undefined = '';
    if (children) {
        initialTab = children[0].props?.label;
    }
    const [activeTab, setActiveTab] = useState(initialTab)
    const handleActiveTab = useCallback((label:string) => setActiveTab(label), [])


    let tabs = undefined;
    let tabContent: ReactElement|undefined;
    if (children) {
        tabs = children.map(child => (
            <li className="mr-2" key={child.props?.label}>
                <button
                    key={child.props?.label}
                    onClick={e => {
                        e.preventDefault();
                        console.log(child.props?.label)
                        if (child.props?.label) {
                            handleActiveTab(child.props.label);
                        }
                    }}
                    className={`inline-block ${child.props?.label === activeTab ? 'text-sky-400' : ''} text-xs p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}
                >
                    {child.props?.label}
                </button>
            </li>
        ))
        tabContent = children.find(child => child.props?.label === activeTab)
    }

    return <>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-3">
            <ul className='flex flex-wrap -mb-px'>
                {tabs ? tabs : <></>}
            </ul>
        </div>
        <div>{tabContent ? tabContent : <></>}</div>
    </>
}

export default TabbedContent;