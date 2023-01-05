import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Table from "../Table/Table";
import {Message} from "candied/dist/dbc/Dbc";
import React, {useContext} from "react";
import Button from "../Buttons/Button";
import Icon from "../Icon/Icon";
import {DbcContext, PageSelection} from "../DbcEditor/DbcEditor";
import QuickAdd from "../QuickAdd/QuickAdd";

interface Props {
    pageSelector: PageSelection;
}
const SignalEditor:React.FC<Props> = ({pageSelector}) => {

    const {data, SetData} = useContext(DbcContext);
    const createSignalRows = (messages: Map<string,Message>) =>{
        const msgArr = Array.from(messages.values());
        let signals = [];
        for (const message of msgArr) {
            for (const signal of Array.from(message.signals.values())) {
                signals.push([
                    signal.name,
                    message.name,
                    signal.startBit,
                    signal.length,
                    signal.dataType,
                    signal.endian,
                    signal.signed ? 'True' : 'False',
                    signal.min,
                    signal.max,
                    signal.factor,
                    signal.offset
                ])
            }
        }
        return signals
    }

    return(
        <ContentDisplay isDisplayed={pageSelector === 'Signals'}>
            {data && data.messages.size ?
                <>
                <h1 className='text-3xl pb-3 text-black dark:text-white'>Signals</h1>
                <Table
                    headings={['Name','Message','Start Bit','Length', 'Data Type', 'Endian','Signed','Min', 'Max', 'Factor','Offset']}
                    rows={createSignalRows(data.messages)}
                />
                </>
                : <div className='text-5xl text-center'>No Data</div>
            }
            <div className='mt-5'/>
            <QuickAdd/>
        </ContentDisplay>
    );
}
export default SignalEditor;