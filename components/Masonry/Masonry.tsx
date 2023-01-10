import React, {ReactNode} from 'react';

interface Props {
    cols: number;
    children?: ReactNode
}
const Masonry:React.FC<Props> = ({cols,children}) => {
    return (
        <div className={`columns-3`}>
            {children}
        </div>
    );
};

export default Masonry;