import DbcEditor, {dbc, DbcContext as DbcContext1} from "../components/DbcEditor/DbcEditor";
import {NextPage} from "next";
import React, {useState} from "react";
import {DbcData} from "dbc-can/lib/dbc/Dbc";

const Editor: NextPage = () => {

    return <>
        <DbcEditor/>
    </>
}
export default Editor;