import multer from 'multer';

export const upload = multer({
  limits: { fileSize: 500 * 1024 * 1024 }, // 100MB
  storage: multer.memoryStorage(), // puedes usar diskStorage para guardar archivos en disco
});