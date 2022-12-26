import {twMerge} from "tailwind-merge";
import Icon from '../Icon/Icon'

const LargeInsetButton = (props: {text: string, heading: string}) => {
    const classList = twMerge(
        'bg-transparent',
        'border border-gray-600',
        'rounded-lg',
        'p-3',
        'h-32',
        'cursor-pointer',
        'shadow-md shadow-sky-500/50',
        'hover:shadow-lg',
        'hover:shadow-sky-500/75',
        'hover:bg-white',
        'dark:bg-gray-800/30',
        'lg:p-5'
    );
    return <>
        <a className={classList}>
            <div className='flex flex-row h-full'>
                <div className="flex flex-col h-full">
                    <div className='text-sky-300 text-lg lg:text-2xl basis-1/2'>
                        {props.heading}
                    </div>
                    <div className='text-xs basis-1/2 dark:text-white'>{props.text}</div>
                </div>
                <div className='self-center dark:text-white'><Icon type='arrow_forward'/></div>
            </div>
        </a>
    </>
}
export default LargeInsetButton;