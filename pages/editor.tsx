import {NextPage} from "next";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavBar/NavItem";
import Icon from "../components/Icon/Icon";

const Editor: NextPage = () => {
    return <>
        <NavBar>
            <NavItem buttonTitle='CANDIED' logoImage='/candy-cane.svg' logoClass='rotate-45' isLogo/>
            <NavItem buttonTitle='Nodes' icon={<Icon type='lan'/>}/>
            <NavItem buttonTitle='Messages' icon={<Icon type='mail'/>}/>
            <NavItem buttonTitle='Signals' icon={<Icon type='sensors'/>}/>
            <NavItem buttonTitle='Visual' icon={<Icon type='scatter_plot'/>}/>
            <NavItem buttonTitle='Settings' icon={<Icon type='settings'/>} isFooter/>
        </NavBar>
    </>
}
export default Editor;