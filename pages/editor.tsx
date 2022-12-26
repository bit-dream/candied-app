import {NextPage} from "next";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavBar/NavItem";
import Icon from "../components/Icon/Icon";
import Image from "next/image";
import {useState} from "react";
import {AtRule} from "csstype";
import Page = AtRule.Page;

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

    console.log(selection);
    return <>
        <NavBar>
            <NavItem buttonTitle='CANDIED' logoImage='/candy-cane.svg' logoClass='rotate-45' isLogo/>
            <NavItem buttonTitle='Nodes' icon={<Icon type='lan'/>} onClick={()=>navBtnClicked('Nodes')}/>
            <NavItem buttonTitle='Messages' icon={<Icon type='mail'/>} onClick={()=>navBtnClicked('Messages')}/>
            <NavItem buttonTitle='Signals' icon={<Icon type='sensors'/>} onClick={()=>navBtnClicked('Signals')}/>
            <NavItem buttonTitle='Visual' icon={<Icon type='scatter_plot'/>} onClick={()=>navBtnClicked('Visual')}/>
            <NavItem buttonTitle='Upload' icon={<Icon type='upload_file'/>} onClick={()=>navBtnClicked('Upload')}/>
            <NavItem buttonTitle='Settings' icon={<Icon type='settings'/>} onClick={()=>navBtnClicked('Settings')}/>
        </NavBar>
        {selection === undefined ?
            <Image src='/Data storage_Monochromatic.svg' fill alt='Background' className='-z-10 object-scale-down'/>
            :
            <></>
        }
    </>
}
export default Editor;