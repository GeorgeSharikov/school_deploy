import styled from "@mui/material/styles/styled.js";

export const Button = styled('div')(() => ({
    outline: 0,
    textAlign: 'center',
    display: 'inline-flex',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '16px',
    height: '40px',
    borderRadius: '8px',
    userSelect: 'none',
    boxShadow: '0 1px 1px rgb(0 0 0 / 10%), 0 2px 5px rgb(0 0 0 / 5%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 10%), 1px 0 0 rgb(0 0 0 / 10%)',
}))

export const LinkStyled = styled('div')(() => ({
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
}))