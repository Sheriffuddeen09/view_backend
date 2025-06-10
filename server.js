import cors from "cors";
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";


const product = express();
const PORT = 5000;
const PRODUCTS_JSON = "./product.json"

const UPLOADS_IMAGE = "./uploads";
if (!fs.existsSync(UPLOADS_IMAGE)) fs.mkdirSync(UPLOADS_IMAGE);

product.use(cors())
product.use(express.json()); 
product.use(express.urlencoded({ extended: true })); // for form data
product.use("/uploads", express.static(path.resolve("uploads")));

let storage

storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_IMAGE),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_IMAGE),
  filenameone: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

const uploads = multer({ storage });




const readProduct = () =>{
  try {
   const data = fs.readFileSync(PRODUCTS_JSON, "utf-8");
    return JSON.parse(data || "[]");
  }catch {
    return [];
  }
  }
const writeProduct = (data) =>
  fs.writeFileSync(PRODUCTS_JSON, JSON.stringify(data, null, 2))

//GET all Products

product.get("/api/product", (req, res) =>{
  const products = readProduct()
  res.json(products)
})

//POST new product 
product.post("/api/product", uploads.fields([
  { name: 'imageUrl', maxCount: 1 },
  { name: 'imagetwo', maxCount: 1 },
  { name: 'imagethree', maxCount: 1 },
  { name: 'imagefour', maxCount: 1 },
]), (req, res) => {
  try {
    const { name, price, description, type } = req.body;
    const files = req.files;

    const products = readProduct();

    const exists = products.some(
      (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (exists) {
      return res
        .status(409)
        .json({ error: "A product with this name already exists." });
    }

    const imageUrl = `/uploads/${files.imageUrl?.[0]?.filename}`;
    const imagetwo = files.imagetwo?.[0] ? `/uploads/${files.imagetwo[0].filename}` : null;
    const imagethree = files.imagethree?.[0] ? `/uploads/${files.imagethree[0].filename}` : null;
    const imagefour = files.imagefour?.[0] ? `/uploads/${files.imagefour[0].filename}` : null;

    const newProduct = {
      id: Date.now(),
      name,
      description,
      type,
      price: parseFloat(price),
      imageUrl,
      imagetwo,
      imagethree,
      imagefour,
    };

    products.push(newProduct);
    writeProduct(products);

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    console.error("❌ Error creating product:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


//DELETE product by ID

product.delete("/api/product/:id", (req, res) => {
  const id = parseInt(req.params.id); // ✅ Correct: req.params
  let products = readProduct();

  const newProducts = products.filter((p) => p.id !== id);

  if (products.length === newProducts.length) {
    return res.status(404).json({ error: "Product not found" });
  }

  writeProduct(newProducts);
  res.json({ message: "Product deleted successfully" });
});



product.listen(PORT, () => console.log(`Backend running on http://localhost;${PORT}`))