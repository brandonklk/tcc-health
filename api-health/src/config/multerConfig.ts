import multer, { Options } from 'multer';
import path from 'path';

export const configMulter = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'files'),
    filename(request, file, callback) {
      console.log('file ', file);

      const fileName = `${Date.now()}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB
  },
  fileFilter: (req, file, cb) => {
    const mimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!mimeTypes.includes(file.mimetype)) {
      return cb(null, false);
    }

    cb(null, true);
  },
} as Options;
