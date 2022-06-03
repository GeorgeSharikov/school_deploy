import {Button, LinkStyled} from "./ui/StyledComponents.js";
import Typography from "@mui/material/Typography";
import {userAuthSelectors} from "../../store/userAuthSlice/slice.js";
import { useSelector } from "react-redux";
import React, { useState} from "react";
import { ArticleEditorModal } from "../createArticle/ModalArticleEditor/index.jsx";
import {LoginModal} from "../loginModal/index.js";

export const AddArticleButton = () => {
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
            <Button>
                <LinkStyled onClick={handleOpen}>
                    <Typography
                        sx={{p: '0 16px'}}
                        component={'div'}
                    >
                        Новая запись
                    </Typography>
                </LinkStyled>
            </Button>
            {isAuth && isOpen ? <ArticleEditorModal isVisible={isOpen} handleClose={handleClose}/> : null}
            {isLoginModalOpen ? <LoginModal isModalVisible={isLoginModalOpen}
                                            closeHandler={handleLoginModalClose}
                                            setModalVisible={setIsLoginModalOpen}/> : null}
        </>

    )
}