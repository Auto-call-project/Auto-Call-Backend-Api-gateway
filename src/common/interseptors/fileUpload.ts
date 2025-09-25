// src/common/interceptors/excel-upload.interceptor.ts

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export function ExcelUploadInterceptor() {
  return FileInterceptor('file', {
    storage: diskStorage({
      destination: './excel-files',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + uuidv4();
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        cb(null, true);
      } else {
        cb(new Error('Faqat Excel fayllar qabul qilinadi!'), false);
      }
    },
  });
}

// audio-upload.interceptor.ts

export function AudioUploadInterceptor() {
  return FileInterceptor('audio', {
    storage: diskStorage({
      destination: './audio-files',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + uuidv4();
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('audio/')) {
        cb(null, true);
      } else {
        cb(new Error('Faqat audio fayllar qabul qilinadi!'), false);
      }
    },
  });
}
