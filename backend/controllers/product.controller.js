import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if(!products) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);
        
    } catch (error) {
        console.log(`Error in get all products controller: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
}

export const addProduct = async (req, res) => {
    try {
        const { name, price, weight, category } = req.body;

        if(!name || !price || !weight || !category) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const alreadyExists = await Product.findOne({ name });

        if(alreadyExists) {
            return res.status(400).json({ message: "Product already exists" });
        }

        const newProduct = new Product({
            name,
            price,
            weight,
            category
        });

        const savedProduct = await newProduct.save();

        if(!savedProduct) {
            return res.status(400).json({ message: "Product not saved" });
        }

        res.status(201).json(savedProduct);
        
    } catch (error) {
        console.log(`Error in add product controller: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(400).json({ message: "Product ID not found" });
        }

        const product = await Product.findById({_id:id});

        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const deletedProduct = await Product.findByIdAndDelete({_id:id});

        if(!deletedProduct) {
            return res.status(400).json({ message: "Product not deleted" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
        
    } catch (error) {
        console.log(`Error in delete product controller: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
}

export const updateProduct = async (req, res) => {
    try{
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({ message: "Product ID not found" });
        }

        const product = await Product.findById({_id:id});

        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const {  price, weight, category } = req.body;

        product.price = price || product.price;
        product.weight = weight || product.weight;
        product.category = category || product.category;
        
        const updatedProduct = await product.save();

        if(!updatedProduct) {
            return res.status(400).json({ message: "Product not updated" });
        }

        res.status(200).json({ success :true ,message: "Product updated successfully" });
    }
    catch (error) {
        console.log(`Error in update product controller: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getProduct = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(400).json({ message: "Product ID not found" });
        }

        const product = await Product.findById({_id:id});

        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
        
    } catch (error) {
        console.log(`Error in get product controller: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
}