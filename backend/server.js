import epxress from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import connectMongoDb from "./db/connectMongoDB.js";
import path from "path"
import productRoutes from "./routes/product.routes.js";

dotenv.config();
const app = epxress();

const __dirname = path.resolve()

const PORT = process.env.PORT || 3000
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
))
app.use(cookieParser())
app.use(epxress.urlencoded({extended : true}))
app.use(epxress.json({limit :"5mb"})) // to parse req.body

app.use("/api/auth" , authRoutes)
app.use("/api/product" , productRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(epxress.static(path.join(__dirname , "/frontend/build")))
    app.get("*" , (req , res)=>{
        res.sendFile(path.resolve(__dirname , "frontend" , "build" , "index.html"))
    }
    )
}
app.listen(PORT ,()=>{
    console.log(`Server is running on port number ${PORT} `)
    connectMongoDb()
})