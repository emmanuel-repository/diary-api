import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    const alias = req.body.alias || 'archivo';
    const ext = path.extname(file.originalname);

    // Sanear alias (evitar espacios, acentos, etc.)
    const safeAlias = alias.replace(/[^\w\-]/g, '_');

    cb(null, `${safeAlias}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
});