import React, {ReactNode} from 'react';

interface Props {
    cols: number;
    children?: ReactNode
}
const Masonry:React.FC<Props> = ({cols,children}) => {
    return (
        <div className={`columns-1 sm:columns-1 md:columns-2 lg:columns-2 xl:columns-3`}>
            {children}
        </div>
    );
};

export default Masonry;