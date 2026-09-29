import multer from "multer";

const storage = multer.memoryStorage();

const imageFileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  callback
) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedImageTypes.includes(file.mimetype)) {
    callback(
      new Error(
        "Only JPEG, PNG and WebP images are allowed"
      )
    );

    return;
  }

  callback(null, true);
};

const pdfFileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  callback
) => {
  if (file.mimetype !== "application/pdf") {
    callback(
      new Error("Only PDF files are allowed")
    );

    return;
  }

  callback(null, true);
};

const uploadImage = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const uploadPdf = multer({
  storage,
  fileFilter: pdfFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export {
  uploadImage,
  uploadPdf,
};