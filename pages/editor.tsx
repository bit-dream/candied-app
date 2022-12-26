import {NextPage} from "next";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavBar/NavItem";
import Icon from "../components/Icon/Icon";
import Image from "next/image";

const Editor: NextPage = () => {
    return <>
        <NavBar>
            <NavItem buttonTitle='CANDIED' logoImage='/candy-cane.svg' logoClass='rotate-45' isLogo/>
            <NavItem buttonTitle='Nodes' icon={<Icon type='lan'/>}/>
            <NavItem buttonTitle='Messages' icon={<Icon type='mail'/>}/>
            <NavItem buttonTitle='Signals' icon={<Icon type='sensors'/>}/>
            <NavItem buttonTitle='Visual' icon={<Icon type='scatter_plot'/>}/>
            <NavItem buttonTitle='Upload' icon={<Icon type='upload_file'/>} isFooter/>
            <NavItem buttonTitle='Settings' icon={<Icon type='settings'/>} isFooter/>
        </NavBar>
        <Image src='/Data storage_Monochromatic.svg' fill alt='Background' className='-z-10 object-scale-down'/>
    </>
}
export default Editor;