import {twMerge} from "tailwind-merge";

const Icon = (props: {type: string, sm?: boolean}) => {
    const classList = twMerge(
        'material-icons',
        props.sm ? 'text-xs' : ''
    );
    const style: React.CSSProperties = props.sm ? {fontSize: '16px'} : {}
    return <>
        <span className={classList} style={style}>{props.type}</span>
    </>
}
export default Icon;