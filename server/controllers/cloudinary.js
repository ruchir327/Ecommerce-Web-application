import cloudinary from "cloudinary";
import path from "path";
import multer from "multer";

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Set up multer storage
const storage = multer.memoryStorage();
const multerInstance = multer({ storage: storage });


export const upload = async (req, res) => {
  console.log(req.body)
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto", // jpeg, png
    image_name: req.body.title,
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
    image_name: req.body.title,
  });
};


// export const upload = async (req, res) => {
//   const file = req.file;
//   console.log(req);
//   // console.log("file: " + console.log(file));
//   return;
//   if (!file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   // Extracting the file name without extension
//   const fileName = path.basename(
//     file.originalname,
//     path.extname(file.originalname)
//   );

//   try {
//     // Convert Buffer to base64 string
//     const base64String = file.buffer.toString("base64");

//     // Upload to Cloudinary with the extracted file name
//     let result = await cloudinary.uploader.upload(
//       `data:${file.mimetype};base64,${base64String}`,
//       {
//         public_id: `${Date.now()}`,
//         resource_type: "auto",
//         // Include the extracted name in the response
//         image_name: fileName,
//       }
//     );

//     res.json({
//       public_id: result.public_id,
//       url: result.secure_url,
//       image_name: fileName,
//     });
//   } catch (error) {
//     console.error("Error uploading image to Cloudinary:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Export the multer instance for use in your routes
export { multerInstance };
export const remove = (req, res) => {
  let image_id = req.body.public_id;
  let image_name = req.body.image_name; // Include image_name from the request body

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    // Handle the image name as needed
    console.log("Removed image:", image_name);
    res.send("ok");
  });
};
