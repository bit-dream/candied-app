import {ReactNode} from "react";
import {twMerge} from "tailwind-merge";
import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import {DbcData} from "dbc-can/lib/dbc/Dbc";
import {PageSelection} from "../DbcEditor/DbcEditor";
import FileInput from "./FileInput";
import Toast from "../Toast/Toast";

interface Props {
    pageSelector: PageSelection;
    onFileLoad: (fileContents:string)=>void
}

const FileLoader:React.FC<Props> = ({pageSelector,onFileLoad}) => {
    return <>
        <ContentDisplay isDisplayed={pageSelector === 'Upload'}>
            <FileInput onFileLoad={onFileLoad}/>
        </ContentDisplay>
    </>
}
export default FileLoader;