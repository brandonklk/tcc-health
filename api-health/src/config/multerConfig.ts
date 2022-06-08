import { fourMB, extensionFilesAccepted } from '@constante/index';
import multer, { Options } from 'multer';
import path from 'path';

export const configMulter = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'files'),
    filename(request, file, callback) {
      const fileName = `${Date.now()}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
  limits: {
    fileSize: fourMB, // 4MB
  },
  fileFilter: (req, file, cb) => {
    const mimeTypes = extensionFilesAccepted;

    if (!mimeTypes.includes(file.mimetype)) {
      return cb(null, false);
    }

    cb(null, true);
  },
} as Options;
