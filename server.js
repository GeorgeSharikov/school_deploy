import express from 'express'
import env from 'dotenv'
env.config()
import {mainRouter} from "./routes/index.js";
import cors from 'cors'
import fileupload from 'express-fileupload'
import path from 'path'
import {ErrorHandler} from "./middleware/ErrorHandlerMiddleware.js";
import {sequelize} from "./db/dbConnection.js";
import favicon from 'serve-favicon';

const __dirname = path.resolve()
const root = path.join(__dirname, "/frontend", "build",)
const PORT = process.env.PORT || 4000

const app = express()
//app.use(favicon(path.join(__dirname, "./frontend/build", 'favicon.ico')))
app.disable('etag');


app.use(express.json())
app.use(fileupload({}))
app.use(cors())
//app.use('/api/static/images', express.static(path.resolve(path.dirname(''), 'Static/images')))
//app.use('/api/static/videos', express.static(path.resolve(path.dirname(''), 'Static/videos')))

app.use(express.static(path.resolve(__dirname, "./frontend/build")));
//app.use('/api', mainRouter)
app.use(ErrorHandler)


app.get('/*', function (req, res) {
    if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
      res.sendFile('index.html', { root })
    }
    // res.sendFile("index.html", {root});
});


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
