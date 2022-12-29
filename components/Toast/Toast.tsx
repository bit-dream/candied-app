import Icon from "../Icon/Icon";

interface Props {
    message: string;
    icon: string;
    isOpen: boolean
}

const Toast:React.FC<Props> = ({message,icon,isOpen}) => {
    return <>
        {
            isOpen ?
                <div id="toast-default"
                     className="z-10 flex absolute bottom-5 right-5 items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-600"
                     role="alert">
                    <Icon type={icon}/>
                    <div className="ml-3 text-sm font-normal">{message}</div>

                </div>
                : <></>
        }
    </>
}
export default Toast;