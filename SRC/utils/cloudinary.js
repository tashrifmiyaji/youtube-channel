// env config
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dotenvFilePath = path.join(__dirname, "../../.env");
import dotenv from "dotenv";
dotenv.config({ path: dotenvFilePath });

// external inputs
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { log } from "util";

// cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload on cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: "mytube",
            resource_type: "auto",
        });
        // remove the locally saved temporary file as the upload operation success!
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.log(error);
        // remove the locally saved temporary file as the upload operation got failed!
        fs.unlink(localFilePath, (err) => console.log(err));
        return null;
    }
};

const deleteFromCloudinary = async (cloudinaryPublic_idForDeleting) => {
    try {
        if (!cloudinaryPublic_idForDeleting) return null
        const response = await cloudinary.uploader.destroy(cloudinaryPublic_idForDeleting);
        return response
    } catch (error) {
        console.log(error);
    }
};

// export
export { uploadOnCloudinary, deleteFromCloudinary };
