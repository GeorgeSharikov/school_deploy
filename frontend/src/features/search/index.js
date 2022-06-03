import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import {FormStyled, InputStld} from "./ui/styledComponents.js";



export const Search = (props) => {
    return (
    <Box  sx={{flexGrow: 1, maxWidth: '320px', mr: '12px'}}>
        <label>
            <FormStyled
                component={'form'}
            >
                <SearchIcon sx={{pr: '5px', pl: '8px'}}/>
                <InputStld
                    maxLength={50}
                    placeholder="Поиск"
                />
            </FormStyled>
        </label>
    </Box>
    );
}
