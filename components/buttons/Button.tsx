import {twMerge} from "tailwind-merge";
import {colors, sizes} from "../const";

const Button = (props: {
    text: string, size?:
    sizes,
    color?: colors,
    rounded?: boolean,
    href?: string
}) => {
    let color: string; let size: string;
    if (!props.color) { color = 'sky'} else {color = props.color;}
    if (!props.size) { size = 'base'} else {size = props.size;}

    const classList = twMerge(
        `p-2`,
        `bg-${color}-500`,
        `hover:bg-${color}-300`,
        `hover:border-${color}-200`,
        `rounded-lg`,
        `shadow-lg`
    )
    return <>
        {props.href ?
            <a className={classList}>{props.text}</a>
            : <button className={classList}>{props.text}</button>}
    </>
}
export default Button;