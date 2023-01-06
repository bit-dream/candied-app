import React, {useContext} from 'react';
import {DbcContext, PageSelection} from "../DbcEditor/DbcEditor";
import ContentDisplay from "../ContentDisplayContainer/ContentDisplay";
import Stat from "../Stats/Stat";
import _ from "lodash";
import Stats from "../Stats/Stats";

interface Props {
    pageSelector: PageSelection;
}
const OverviewEditor:React.FC<Props> = ({pageSelector}) => {
    const {data, SetData} = useContext(DbcContext);
    return (
        <ContentDisplay isDisplayed={pageSelector === 'Overview'}>
            <Stats>
                <Stat title={'# nodes'}
                      content={
                          data.nodes.size.toString()
                }/>
                <Stat title={'# messages'}
                      content={
                          data.messages.size.toString()
                }/>
                <Stat title={'# signals'}
                      content={
                          Array.from(data.messages.values()).reduce((prev,curr)=>{
                              return prev + curr.signals.size;
                          },0).toString()
                      }/>
            </Stats>
        </ContentDisplay>
    );
};

export default OverviewEditor;