import express from 'express'
import env from 'dotenv'
env.config()
import {mainRouter} from "./routes/index.js";
import cors from 'cors'
import fileupload from 'express-fileupload'
import path from 'path'
import {ErrorHandler} from "./middleware/ErrorHandlerMiddleware.js";
import {sequelize} from "./db/dbConnection.js";

const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(fileupload({}))
app.use(cors())
app.use('/api/static/images', express.static(path.resolve(path.dirname(''), 'Static/images')))
app.use('/api/static/videos', express.static(path.resolve(path.dirname(''), 'Static/videos')))
app.use('/api', mainRouter)
app.use(ErrorHandler)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        // await sequelize.close()
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
    }catch (e) {
        console.log(e)
    }
}

start()
