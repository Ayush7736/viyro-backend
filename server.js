require("dotenv").config();

const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

const upload = multer();

let lastImageUrl = "";

app.post("/upload", upload.single("image"), async (req,res)=>{

let form = new FormData();

form.append(
"image",
req.file.buffer.toString("base64")
);

let response = await axios.post(

`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}&expiration=300`,
form,
{headers: form.getHeaders()}

);

lastImageUrl = response.data.data.url;

res.send("ok");

});

app.get("/latest",(req,res)=>{

res.send(lastImageUrl);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{

console.log("running");

});
