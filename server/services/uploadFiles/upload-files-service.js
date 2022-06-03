import {v4 as uuidv4} from "uuid";
import env from 'dotenv'
import path from 'path'
env.config()

export class uploadFilesService {
    static upload(file){
        try{
            let isImage = true
            let fileName = `${uuidv4()}.jpg`
            let pathToFolder = 'Static/images'
            if(path.extname(file.name) === '.mp4'){
                fileName = `${uuidv4()}.mp4`
                pathToFolder = 'Static/videos'
                isImage = false
            }
            file.mv(path.resolve(path.dirname(''), pathToFolder, fileName))

            return {
                success: 1,
                file: {
                    url: `${process.env.SERVER_URL}/api/static/${isImage ? 'images' : 'videos'}/${fileName}`,
                    isImage: isImage
                }
            }
        }catch (e) {
            console.log(e)
            return {
                success: 0
            }
        }

    }
}