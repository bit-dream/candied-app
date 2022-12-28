import ContentDisplayContainer from "../ContentDisplayContainer/ContentDisplayContainer";
import Table from "../Table/Table";
import {DbcData} from "dbc-can/lib/dbc/Dbc";

const NodeEditor = (props: {data: DbcData | undefined}) => {
    return(
        <ContentDisplayContainer>
            <Table data={props.data}/>
        </ContentDisplayContainer>
    );
}
export default NodeEditor;