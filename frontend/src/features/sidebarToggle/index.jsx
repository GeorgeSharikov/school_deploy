import MenuIcon from '@mui/icons-material/Menu';
import styled from "@mui/material/styles/styled.js"
import {useActions} from "../../shared/hooks/useActions.jsx";
import {toggleActions} from "./model/slice.js";

const MenuIconStyled = styled(MenuIcon)(() => ({
    fontSize: 30,
    cursor: 'pointer',
    color: 'black',
    paddingRight: 15
}))


export const SidebarToggle = () => {
    const {setActive} = useActions(toggleActions)

    return (
            <MenuIconStyled onClick={() => setActive()} />
    )
}