import React, {useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import {FormStyled, InputStld} from "./ui/styledComponents.js";
import { useWindowDimensions } from '../../shared/hooks/useWindowDimensions.jsx';



export const Search = (props) => {
    const {width} = useWindowDimensions();
    
    return (
    <Box  sx={{flexGrow: 1, maxWidth: '320px', mr: '12px', justifyContent: 'flex-end', display: 'flex', alignItems: 'center'}}>
        {width < 700 
                ? <SearchIcon sx={{pr: '5px', pl: '8px',color: 'black', width: '35px', height: '35px'}}/>
                :<label>
                    <FormStyled
                    component={'form'}
                    >
                        <SearchIcon sx={{pr: '5px', pl: '8px'}}/>
                        <InputStld
                            maxLength={50}
                            placeholder="Поиск" />
                    </FormStyled>
                </label>}
    </Box>
    );
}
