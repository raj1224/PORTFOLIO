import multer from "multer";
import ApiError from "../utils/ApiError.js";

const storage = multer.memoryStorage();
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const imageFileFilter: multer.Options["fileFilter"] = (_req, file, callback) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedImageTypes.includes(file.mimetype)) {
    callback(new ApiError(400, "Only JPEG, PNG and WebP images are allowed"));
    return;
  }
  callback(null, true);
};

const pdfFileFilter: multer.Options["fileFilter"] = (_req, file, callback) => {
  if (file.mimetype !== "application/pdf") {
    callback(new ApiError(400, "Only PDF files are allowed"));
    return;
  }
  callback(null, true);
};

export const uploadImage = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

export const uploadPdf = multer({
  storage,
  fileFilter: pdfFileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});
