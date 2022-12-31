import DbcEditor from "../components/DbcEditor/DbcEditor";
import {NextPage} from "next";
import React, {createContext, SetStateAction, useContext, useState} from "react";
import {DbcData} from "dbc-can/lib/dbc/Dbc";
import Dbc from "dbc-can";

type ContextProps = {
    data: DbcData;
    SetData:  React.Dispatch<SetStateAction<DbcData>>;
}
const dbc = new Dbc();
const dbcInit: ContextProps = {
    data: dbc.initDbcDataObj(),
    SetData: () => {}
}
export const DbcContext = createContext(dbcInit);

const Editor: NextPage = () => {

    const [data,SetData] = useState<DbcData>(dbc.initDbcDataObj())
    const init = {data, SetData};

    return <>
        <DbcContext.Provider value={init}>
            <DbcEditor/>
        </DbcContext.Provider>
    </>
}
export default Editor;