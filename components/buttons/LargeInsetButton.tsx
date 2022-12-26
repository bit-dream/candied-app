import {twMerge} from "tailwind-merge";
const LargeInsetButton = (props: {text: string, heading: string}) => {
    const classList = twMerge(
    );
    return <>
        <a className='bg-transparent border border-gray-600 rounded-lg p-5 w-64 h-32 cursor-pointer hover:bg-gray-200/40'>
            <div className='text-sky-300 text-2xl'>{props.heading}</div>
            <div className='text-xs'>{props.text}</div>
        </a>
    </>
}
export default LargeInsetButton;