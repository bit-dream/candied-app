import {NextPage} from "next";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavBar/NavItem";
import Icon from "../components/Icon/Icon";

const Editor: NextPage = () => {
    return <>
        <NavBar>
            <NavItem buttonTitle='test' icon={<Icon type='arrow_forward'/>}/>
            <NavItem buttonTitle='test' icon={<Icon type='arrow_forward'/>}/>
            <NavItem buttonTitle='test' icon={<Icon type='arrow_forward'/>}/>
            <NavItem buttonTitle='test' icon={<Icon type='arrow_forward'/>}/>
        </NavBar>
    </>
}
export default Editor;