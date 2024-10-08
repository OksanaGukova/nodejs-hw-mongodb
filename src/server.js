import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';

import { errorHandler } from './midlewares/errorHandler.js';
import { notFoundHandler } from './midlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constans/index.js';
import { swaggerDocs } from './midlewares/swaggerDocs.js';


const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
    app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  app.use(errorHandler);
  app.use('*', notFoundHandler);


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
