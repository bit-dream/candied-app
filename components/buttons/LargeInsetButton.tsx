import {twMerge} from "tailwind-merge";
const LargeInsetButton = (props: {text: string, heading: string}) => {
    const classList = twMerge(
        'bg-transparent',
        'border border-gray-600',
        'rounded-lg',
        'p-5',
        'w-64 h-32',
        'cursor-pointer',
        'shadow-md shadow-sky-500/50',
        'hover:shadow-lg',
        'hover:shadow-sky-500/75',
        'hover:bg-white'
    );
    return <>
        <a className={classList}>
            <div className='text-sky-300 text-2xl'>{props.heading}</div>
            <div className='text-xs'>{props.text}</div>
        </a>
    </>
}
export default LargeInsetButton;