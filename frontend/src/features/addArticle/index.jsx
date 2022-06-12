import {Button, LinkStyled} from "./ui/StyledComponents.js";
import Typography from "@mui/material/Typography";
import {userAuthSelectors} from "../../store/userAuthSlice/slice.js";
import { useSelector } from "react-redux";
import React, {useEffect, useState} from "react";
import { ArticleEditorModal } from "../createArticle/ModalArticleEditor/index.jsx";
import {LoginModal} from "../loginModal/index.js";
import AddIcon from '@mui/icons-material/Add';
import { useWindowDimensions } from "../../shared/hooks/useWindowDimensions.jsx";

export const AddArticleButton = () => {
    const {width} = useWindowDimensions()

    const isAuth = useSelector(state => userAuthSelectors.getIsUserAuth(state))
    const [isOpen, setIsOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    const handleClose = () => setIsOpen(false)
    const handleLoginModalClose = () => setIsLoginModalOpen(false)

    const handleOpen = () => {
        if(isAuth){
            setIsOpen(true)
        }else{
            setIsLoginModalOpen(true)
        }
    }
    return (
        <>
            <Button >
                <LinkStyled onClick={handleOpen}>
                   {width > 700 
                   ? <Typography
                        sx={{p: '0 16px'}}
                        component={'div'}
                    >
                        Новая запись
                    </Typography>
                    : <div style={{padding: '10px', paddingTop: '13px'}}>
                        <AddIcon />
                    </div>}
                </LinkStyled>
            </Button>
            {isAuth && isOpen ? <ArticleEditorModal isVisible={isOpen} handleClose={handleClose}/> : null}
            {isLoginModalOpen ? <LoginModal isModalVisible={isLoginModalOpen}
                                            closeHandler={handleLoginModalClose}
                                            setModalVisible={setIsLoginModalOpen}/> : null}
        </>

    )
}