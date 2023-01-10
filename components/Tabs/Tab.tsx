import React, {ReactElement, ReactNode} from 'react';

interface Props {
    label: string;
    children?: ReactElement;
}
const Tab:React.FC<Props> = ({label,children}) => {
    return <>
        <div>
            {children}
        </div>
    </>
};

export default Tab;