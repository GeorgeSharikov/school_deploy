import styled from "@mui/material/styles/styled.js";
import InputBase  from '@mui/material/InputBase';
import Paper from "@mui/material/Paper";

export const InputStld = styled(InputBase)(() => ({
    width: '100%',
    height: '100%',
    paddingRight: '11px',
    backgroundColor: 'transparent',
    font: 'inherit',
    boxSizing:' border-box',
    outline: 'none',
    border: 'none',
    bottomLine: 'none',
    transition: 'background-color 0.2s linear, border-color 0.2s linear, box-shadow 0.2s linear, -webkit-box-shadow 0.2s linear !important',
}))

export const FormStyled = styled(Paper)(() => ({
    border: '1px solid rgba(0,0,0,0.03)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    height: '38px',
    minWidth: '240px',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
    boxShadow: 'none',
    color: '#000',
    transition: 'background-color 0.2s linear, border-color 0.2s linear, box-shadow 0.2s linear, -webkit-box-shadow 0.2s linear !important',
    '&:focus-within': {
            backgroundColor: '#fff',
            borderColor: '#e6a140',
            boxShadow: '0 0 0 3px rgb(229 160 64 / 12%)'
    },
    '&:hover': {
        backgroundColor: '#fff',
        borderColor: '#e6a140',
        boxShadow: '0 0 0 3px rgb(229 160 64 / 12%)',
    },
}))