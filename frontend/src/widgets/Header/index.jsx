import { SidebarToggle } from "../../features/sidebarToggle"
import Box from "@mui/material/Box";
import {AppBarStl, ToolbarStl} from "./ui/styledComponents.js";
import {Link} from "react-router-dom";
import {Search} from "../../features/search";
import {AddArticleButton} from "../../features/addArticle";
import {NavigationUser} from "../../features/navigationUser";
import { useWindowDimensions } from "../../shared/hooks/useWindowDimensions";

export const Header = () => {
    const {width} = useWindowDimensions()
    return (
            <AppBarStl>
                <ToolbarStl>
                    <SidebarToggle />
                    <Box>
                        <Link to={'/'} style={{color: 'black', paddingRight: '20px', userSelect: 'none' , fontSize: '20px'}}>
                            <span>{width > 700 ? 'Лицей' : 'Л'}</span>
                            Days
                        </Link>
                    </Box>
                    <Search/>
                    <AddArticleButton />
                    {width > 700 && <Box sx={{ flexGrow: 1 }} />}
                    <NavigationUser />
                </ToolbarStl>
            </AppBarStl>
    )
}