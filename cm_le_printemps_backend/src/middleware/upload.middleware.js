import multer from "multer";
import path from "path";

export const uploadImage = (dossier) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join('src', 'public', 'uploads', dossier));
        },
        filename: (req, file, cb) => {   
          cb(null, `${Date.now()}-${file.originalname}`);
        },
    });
    
    return multer({ storage });
}

export const upload = (dossier, champs) => {
  return uploadImage(dossier).single(champs);
}