import {NextPage} from "next";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavBar/NavItem";
import Icon from "../components/Icon/Icon";
import Image from "next/image";
import {ReactNode, useState} from "react";
import {AtRule} from "csstype";
import ContentDisplayContainer from "../components/ContentDisplayContainer/ContentDisplayContainer";

const Editor: NextPage = () => {

    type PageSelection = 'Nodes' | 'Messages' | 'Signals' | 'Settings' | 'Upload' | 'Visual'
    const [selection,UseSelection] = useState<PageSelection|undefined>(undefined);

    const navBtnClicked = (type: PageSelection) => {
        if (selection === type) {
            UseSelection(undefined);
        } else {
            UseSelection(type);
        }
    }

    let content: ReactNode | HTMLImageElement;
    switch (selection) {
        case 'Nodes':
            content =
            <ContentDisplayContainer>
                <div className='text-5xl text-white text-center mt-10'>Nodes</div>
                <div className='inline-block min-w-full overflow-hidden align-middle shadow-lg shadow-slate-900 backdrop-blur-3xl rounded-lg'>
                    <table className="text-white min-w-full">
                        <thead>
                        <tr>
                            <th className='border border-slate-600 bg-slate-600 h-10'>Song</th>
                            <th className='border border-slate-600 bg-slate-600'>Artist</th>
                            <th className='border border-slate-600 bg-slate-600'>Year</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className='border border-slate-900 bg-slate-900'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td className='border border-slate-900 bg-slate-900'>Malcolm Lockyer</td>
                            <td className='border border-slate-900 bg-slate-900'>1961</td>
                        </tr>
                        <tr>
                            <td className='border border-slate-900 bg-slate-900'>Witchy Woman</td>
                            <td className='border border-slate-900 bg-slate-900'>The Eagles</td>
                            <td className='border border-slate-900 bg-slate-900'>1972</td>
                        </tr>
                        <tr>
                            <td className='border border-slate-900 bg-slate-900'>Shining Star</td>
                            <td className='border border-slate-900 bg-slate-900'>Earth, Wind, and Fire</td>
                            <td className='border border-slate-900 bg-slate-900'>1975</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </ContentDisplayContainer>
            break;
        case 'Messages':
            content = <div className='text-center text-white'>Messages</div>
            break;
        case 'Signals':
            content = <div className='text-center text-white'>Signals</div>
            break;
        case 'Settings':
            content = <div className='text-center text-white'>Nodes</div>
            break;
        case 'Upload':
            content = <div className='text-center text-white'>Nodes</div>
            break;
        case 'Visual':
            content = <div className='text-center text-white'>Nodes</div>
            break;
        case undefined:
            content = <Image src='/Data storage_Monochromatic.svg' fill alt='Background' className='-z-10 object-scale-down'/>;
            break;
    }
    return <>
        <div className='flex flex-row'>
            <NavBar>
                <NavItem buttonTitle='CANDIED' logoImage='/candy-cane.svg' logoClass='rotate-45' isLogo/>
                <NavItem buttonTitle='Nodes' icon={<Icon type='lan'/>} onClick={()=>navBtnClicked('Nodes')}/>
                <NavItem buttonTitle='Messages' icon={<Icon type='mail'/>} onClick={()=>navBtnClicked('Messages')}/>
                <NavItem buttonTitle='Signals' icon={<Icon type='sensors'/>} onClick={()=>navBtnClicked('Signals')}/>
                <NavItem buttonTitle='Visual' icon={<Icon type='scatter_plot'/>} onClick={()=>navBtnClicked('Visual')}/>
                <NavItem buttonTitle='Upload' icon={<Icon type='upload_file'/>} onClick={()=>navBtnClicked('Upload')}/>
                <NavItem buttonTitle='Settings' icon={<Icon type='settings'/>} onClick={()=>navBtnClicked('Settings')}/>
            </NavBar>
            {content}
        </div>
    </>
}
export default Editor;