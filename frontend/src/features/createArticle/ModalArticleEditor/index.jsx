import { Modal } from "@mui/material"
import { Box } from "@mui/system"
import { ArticleEditor } from ".."
import { PortalHoc } from "../../../shared/helpers/PortalHoc"
import { modalEditorStyles } from "./ui/ui"
import {EditorForEditArticle} from "../EditorForArticleEdit/index.jsx";
import {EditorForArticleEditAdmin} from "../EditorForArticleEditAdmin/index.js";

export const ArticleEditorModal = ({isVisible, handleClose}) => {
    return (
        <PortalHoc elementPlace={document.body}>
            <Modal
                 open={isVisible}
                 onClose={handleClose}
                 >
                     <Box sx={modalEditorStyles}> 
                        <ArticleEditor close={handleClose} />
                     </Box>  
            </Modal>  
        </PortalHoc> 
    )
}

export const EditArticleEditorModal = ({isVisible, handleClose, articleData}) => {
    return (
        <PortalHoc elementPlace={document.body}>
            <Modal
                open={isVisible}
                onClose={handleClose}
            >
                <Box sx={modalEditorStyles}>
                    <EditorForEditArticle close={handleClose} articleData={articleData}/>
                </Box>
            </Modal>
        </PortalHoc>
    )
}

export const EditArticleEditorModalAdmin = ({isVisible, handleClose, articleData}) => {
    return (
        <PortalHoc elementPlace={document.body}>
            <Modal
                open={isVisible}
                onClose={handleClose}
            >
                <Box sx={modalEditorStyles}>
                    <EditorForArticleEditAdmin close={handleClose} articleData={articleData}/>
                </Box>
            </Modal>
        </PortalHoc>
    )
}