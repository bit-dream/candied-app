import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Table from "../Table/Table";
import {DbcData, Message, Signal} from "dbc-can/lib/dbc/Dbc";
import {PageSelection} from "../../pages/editor";
import React from "react";
import TableRow from "../Table/TableRow";

interface Props {
    data: DbcData|undefined;
    pageSelector: PageSelection;
}
const SignalEditor:React.FC<Props> = ({data, pageSelector}) => {

    const createSignalRows = (messages: Map<string,Message>) =>{
        const msgArr = Array.from(messages.values());
        let signals = [];
        for (const message of msgArr) {
            for (const signal of Array.from(message.signals.values())) {
                signals.push([
                    signal.name,
                    signal.startBit,
                    signal.length,
                    signal.min,
                    signal.max,
                    signal.dataType,
                    signal.endian,
                    signal.signed ? 'True' : 'False'
                ])
            }
        }
        return signals
    }

    return(
        <ContentDisplay isDisplayed={pageSelector === 'Signals'}>
            {data ?
                <Table
                    headings={['Name','Start Bit','Length', 'Min', 'Max', 'Data Type', 'Endian','Signed']}
                    rows={createSignalRows(data.messages)}
                />
                : <></>
            }
        </ContentDisplay>
    );
}
export default SignalEditor;