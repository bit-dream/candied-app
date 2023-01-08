import DbcEditor from "../components/DbcEditor/DbcEditor";
import {NextPage} from "next";
import React, {useState} from "react";

const Editor: NextPage = () => {

    return <>
        <DbcEditor startingPage={'Overview'}/>
    </>
}
export default Editor;