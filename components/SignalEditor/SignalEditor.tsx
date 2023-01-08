import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Table from "../Table/Table";
import {Message} from "candied/dist/dbc/Dbc";
import React, {useContext} from "react";
import Button from "../Buttons/Button";
import Icon from "../Icon/Icon";
import {DbcContext, PageSelection} from "../DbcEditor/DbcEditor";
import QuickAdd from "../QuickAdd/QuickAdd";
import Stat from "../Stats/Stat";
import Stats from "../Stats/Stats";
import _ from "lodash";

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

    const highestOccurrence = (list: number[]|string[]): string => {
        // Given an array of values [1,10,2,3,10,10]
        // Find which number occurs the most frequent: answer should be 10
        if (!list.length) return ''
        let hits = new Map<any,number>();
        list.forEach(l=>{
            if (hits.has(l)) {
                let val = hits.get(l);
                if (val) {hits.set(l, val + 1)}
            }
            else {hits.set(l,1)};
        })
        let max = 0; let maxK = ''
        Array.from(hits.entries()).forEach((k,v)=>{
            if (v > max) {
                max = v;
                maxK = k[0].toString();
            }
        })
        return maxK
    }

    return(
        <ContentDisplay isDisplayed={pageSelector === 'Signals'}>
            {data && data.messages.size ?
                <>
                <Table
                    headings={['Name','Message','Start Bit','Length', 'Data Type', 'Endian','Signed','Min', 'Max', 'Factor','Offset']}
                    rows={createSignalRows(data.messages)}
                />
                <Stats>
                    <Stat title={'signals'} content={
                        Array.from(data.messages.values()).reduce((prev,curr)=>{
                            return prev + curr.signals.size;
                        },0).toString()
                    }/>
                    <Stat title={'avg signal size'} content={
                        highestOccurrence(
                            _.flatten(Array.from(data.messages.values()).map((msg)=>{
                                return Array.from(msg.signals.values()).map(sig=>sig.length)
                            }))
                        ) + ' bits'
                    }/>
                    <Stat title={'most used type'}
                          content={
                              highestOccurrence(
                                  _.flatten(Array.from(data.messages.values()).map((msg)=>{
                                      return Array.from(msg.signals.values()).map(sig=>{
                                          if (sig.dataType) {return sig.dataType.toString()}
                                          else {return ''}
                                      })
                                  }))
                              )
                          }/>
                </Stats>
                </>
                : <div className='text-5xl text-center'>No Data</div>
            }
            <div className='mt-5'/>
            <QuickAdd noBtn/>
        </ContentDisplay>
    );
}
export default SignalEditor;