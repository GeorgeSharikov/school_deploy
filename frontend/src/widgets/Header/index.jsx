import { SidebarToggle } from "../../features/sidebarToggle"
import Box from "@mui/material/Box";
import {AppBarStl, ToolbarStl} from "./ui/styledComponents.js";
import {Link} from "react-router-dom";
import {Search} from "../../features/search";
import {AddArticleButton} from "../../features/addArticle";
import {NavigationUser} from "../../features/navigationUser";

export const Header = () => {
    return (
            <AppBarStl>
                <ToolbarStl>
                    <SidebarToggle />
                    <Box>
                        <Link to={'/'} style={{color: 'black', paddingRight: '20px', userSelect: 'none' , fontSize: '20px'}}>
                            <span>Лицей</span>
                            Days
                        </Link>
                    </Box>
                    <Search/>
                    <AddArticleButton />
                    <Box sx={{ flexGrow: 1 }} />
                    <NavigationUser />
                </ToolbarStl>
            </AppBarStl>
    )
}