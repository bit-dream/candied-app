import React, {useContext, useEffect} from 'react';
import {DbcContext, PageSelection} from "../DbcEditor/DbcEditor";
import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Stat from "../Stats/Stat";
import Stats from "../Stats/Stats";
import Masonry from "../Masonry/Masonry";
import Card from "../Card/Card";
import Pill from "../Pill/Pill";
import Button from "../Buttons/Button";
import Icon from "../Icon/Icon";
import Tabs from "../Tabs/Tabs";
import TabbedContent from "../Tabs/TabbedContent";
import Tab from "../Tabs/Tab";

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
                                <Pill label={`ID: ${message.id.toString()}`} color='bg-sky-400' noMargin/>
                            </div>
                            }
                            content={
                            <>
                                    <div className='inline-flex flex-row'>
                                        <Pill label={message.dlc.toString()} icon='straighten'/>
                                        <Pill label={`${message.signals.size.toString()}`} icon='sensors'/>
                                    </div>
                                    <TabbedContent>
                                        <Tab label='General'>
                                            <>
                                            {
                                                <ul>
                                                    {
                                                        Array.from(message.signals.values()).map((signal,sigIdx)=>{
                                                            return <li
                                                                className='text-xs flex flex-row justify-between w-full flex-wrap'
                                                                key={sigIdx}>
                                                                {signal.name}
                                                                <span className=''>
                                                    <Pill
                                                        label={`bit: ${signal.startBit.toString()}`}
                                                        color={'bg-slate-200 dark:bg-slate-500'}
                                                        textColor='text-gray-300'
                                                        small
                                                        minW
                                                    />
                                                    <Pill
                                                        label={`len: ${signal.length.toString()}`}
                                                        color={'bg-slate-200 dark:bg-slate-500'}
                                                        textColor='text-gray-300'
                                                        small
                                                        minW
                                                    />
                                                </span>
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            }
                                            </>
                                        </Tab>
                                        <Tab label='Attributes'>
                                            <div>
                                                {
                                                    message.attributes.size ?
                                                    Array.from(message.attributes.values()).map((attribute)=>{
                                                        return <>
                                                            <div className='text-lg font-semibold'>{attribute.name}</div>
                                                            <div><span className='font-semibold'>Min: </span>
                                                                {attribute.min !== null ? attribute.min : 'n/a'}</div>
                                                            <div><span className='font-semibold'>Max: </span>
                                                                {attribute.max !== null ? attribute.max : 'n/a'}</div>
                                                            <div><span className='font-semibold'>Data Type: </span>
                                                                {attribute.dataType !== null ? attribute.dataType : 'n/a'}</div>
                                                            <div><span className='font-semibold'>Type: </span>
                                                                {attribute.type !== null ? attribute.type : 'n/a'}</div>
                                                            <div><span className='font-semibold'>Value: </span>
                                                                {attribute.value !== null ? attribute.value : 'n/a'}</div>
                                                            <div><span className='font-semibold'>Options: </span>
                                                                {attribute.options !== null ? attribute.options.join(' ') : 'n/a'}</div>
                                                            <br/>
                                                        </>
                                                    }) : <div>No Data</div>
                                                }
                                            </div>
                                        </Tab>
                                    </TabbedContent>
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
    )
};

export default OverviewEditor;