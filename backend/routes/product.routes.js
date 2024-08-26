import express from "express"
import {getAllProducts,addProduct,deleteProduct,updateProduct} from "../controllers/product.controller.js"

const router  = express.Router()

    router.get("/" ,getAllProducts)
    router.post("/create" ,addProduct)
    router.delete("/delete/:id" ,deleteProduct)
    router.put("/update/:id" ,updateProduct)



export default router;