import {ReactNode} from "react";
import {twMerge} from "tailwind-merge";
import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import {DbcData} from "dbc-can/lib/dbc/Dbc";
import {PageSelection} from "../../pages/editor";
import FileInput from "./FileInput";

interface Props {
    data: DbcData|undefined;
    pageSelector: PageSelection;
    onFileLoad: (fileContents:string)=>void
}

const FileLoader:React.FC<Props> = ({data,pageSelector,onFileLoad}) => {
    return <>
        <ContentDisplay isDisplayed={pageSelector === 'Upload'}>
            <FileInput onFileLoad={onFileLoad}/>
        </ContentDisplay>
    </>
}
export default FileLoader;