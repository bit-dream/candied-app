import {NextPage} from "next";
import DbcEditor from "../components/DbcEditor/DbcEditor";
import {Dbc} from "candied";
import {DbcData} from "candied/lib/dbc/Dbc";
import React, {createContext, SetStateAction, useState} from "react";
import genDemoDbc from "../logic/genDemoDbc";

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

const Demo: NextPage = () => {

    const dbc = new Dbc();

    dbc.load(`
VERSION "1.0"

NS_:
    BU_
    BS_
    BO_
    CM_
    BA_DEF_
    BA_DEF_DEF_
    VAL_TABLE_
    VAL_
    BO_TX_BU_

BU_: Node0 Node1 Node2

BS_: 500

BO_ 1234 CANMessage: 8 Node0
    SG_ Signal0 : 0|32@1- (1,0) [0|0] "" Node1 Node2
    SG_ Signal1 : 32|32@1+ (100,0) [0|100] "%" Node1 Node2

BO_ 4321 CANMultiplexed: 2 Node0
    SG_ Multiplexer M : 0|8@1+ (1,0) [0|0] "" Node1
    SG_ Value0 m0 : 8|8@1+ (1,0) [0|0] "" Node1
    SG_ Value1 m1 : 8|8@1+ (1,0) [0|0] "" Node1

CM_ "DBC Template with multiline description";
CM_ BU_ Node0 "The 0th Node";
CM_ BO_ 4321 "Multiplexed CAN-Message";
CM_ SG_ 1234 Signal0 "First signal in this message";

BA_DEF_ "FloatAttribute" FLOAT 0 50.5;
BA_DEF_ BO_ "BOStringAttribute" STRING;
BA_DEF_ BU_ "BUIntAttribute" INT 0 100;
BA_DEF_ SG_ "SGEnumAttribute" ENUM "Val0", "Val1", "Val2";

BA_DEF_DEF_ "FloatAttribute" 25.25;
BA_DEF_DEF_ "BOStringAttribute" "String";
BA_DEF_DEF_ "BUIntAttribute" 50;
BA_DEF_DEF_ "SGEnumAttribute" 1;

BA_ "FloatAttribute" 45.9;
BA_ "BUIntAttribute" BU_ Node0 100;
BA_ "BOStringAttribute" BO_ 1234 "MessageAttribute";
BA_ "SGEnumAttribute" SG_ 1234 Signal0 2;

VAL_TABLE_ Numbers 3 "Three" 2 "Two" 1 "One" 0 "Zero";
VAL_ 4321 Value0 2 "Value2" 1 "Value1" 0 "Value0";
VAL_ 4321 Value1 Numbers;

BO_TX_BU_ 4321 : Node0,Node2;

    `)

    return <>
        <DbcEditor startingData={genDemoDbc()} startingPage='Visual'/>
    </>
}
export default Demo;