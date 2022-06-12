import styled from "@mui/material/styles/styled.js";
import AppBar from "@mui/material/AppBar";
import {Toolbar} from "@mui/material";

export const AppBarStl = styled(AppBar)(() => ({
    zIndex: 20,
    boxShadow: '0px -1px 0px 0px #fff4e2',
    position: 'sticky',
    backgroundColor: '#fff4e2',
    height: 60,
    '@media (min-width: 0px) and (orientation: landscape)' :{
        '.css-c65obd-MuiToolbar-root': {
            minHeight: '56px'
        }   
    }
}))

export const ToolbarStl = styled(Toolbar)(() => ({
    paddingLeft: 18,
    paddingRight: 40,
}))