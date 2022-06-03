import {uploadFilesService} from "../services/uploadFiles/upload-files-service.js";

class UploadFiles{
    async upload(req, res, next){
        const {image: file} = req.files
        const response = uploadFilesService.upload(file)
        res.send(response)
    }

}

export const UploadFilesController = new UploadFiles()