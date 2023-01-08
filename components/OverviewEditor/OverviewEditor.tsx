import React, {useContext, useEffect} from 'react';
import {DbcContext, PageSelection} from "../DbcEditor/DbcEditor";
import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Stat from "../Stats/Stat";
import _ from "lodash";
import Stats from "../Stats/Stats";
import Masonry from "../Masonry/Masonry";
import Card from "../Card/Card";
import Pill from "../Pill/Pill";
import Button from "../Buttons/Button";
import Icon from "../Icon/Icon";

interface Props {
    pageSelector: PageSelection;
}
const OverviewEditor:React.FC<Props> = ({pageSelector}) => {
    const {data, SetData} = useContext(DbcContext);
    useEffect(()=>{},[data,SetData]);
    return (
        <ContentDisplay isDisplayed={pageSelector === 'Overview'} allowOverflow>
            <Stats>
                <Stat title={'nodes'}
                      content={
                          data.nodes.size.toString()
                }/>
                <Stat title={'messages'}
                      content={
                          data.messages.size.toString()
                }/>
                <Stat title={'signals'}
                      content={
                          Array.from(data.messages.values()).reduce((prev,curr)=>{
                              return prev + curr.signals.size;
                          },0).toString()
                      }/>
            </Stats>
            <Masonry cols={3}>
                {
                    Array.from(data.messages.values()).map((message,idx)=>{
                        return <Card
                            key={idx}
                            title={
                            <div className='flex justify-between w-full flex-wrap'>
                                {message.name}
                                <Pill label={`${message.id.toString()}`} color='bg-sky-400' noMargin/>
                            </div>
                            }
                            content={
                                <>
                                    <div className='inline-flex flex-row'>
                                        <Pill label={message.dlc.toString()} icon='straighten'/>
                                        <Pill label={`${message.signals.size.toString()}`} icon='sensors'/>
                                    </div>
                                    <ul>
                                    {
                                        Array.from(message.signals.values()).map((signal,sigIdx)=>{
                                            return <li className='text-xs flex flex-row justify-between w-full flex-wrap' key={sigIdx}>
                                                {signal.name}
                                                <span className=''>
                                                    <Pill
                                                        label={`bit: ${signal.startBit.toString()}`}
                                                        color={'bg-slate-500'}
                                                        small
                                                        minW
                                                    />
                                                    <Pill
                                                        label={`len: ${signal.length.toString()}`}
                                                        color={'bg-slate-500'}
                                                        small
                                                        minW
                                                    />
                                                </span>
                                            </li>
                                        })
                                    }
                                    </ul>
                                </>
                            }
                            footer={
                                <div className='float-right mb-2'>
                                    <Button
                                        text=''
                                        size='sm'
                                        color='danger'
                                        icon={<Icon type={'delete'} sm/>}
                                        onClick={()=>{
                                            const updatedMessages = new Map(data.messages);
                                            updatedMessages.delete(message.name);
                                            SetData({ ...data, messages: updatedMessages });
                                        }}
                                        noShadow/>
                                </div>
                            }/>
                    })
                }
            </Masonry>
        </ContentDisplay>
    );
};

export default OverviewEditor;