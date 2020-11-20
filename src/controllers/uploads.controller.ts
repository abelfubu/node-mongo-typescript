import { RequestHandler } from 'express';
import path from 'path';
import fs from 'fs';
import uuid from 'uuid';
import { ServerResponse } from '../models/ServerResponse';
import { updateImage } from '../utils/imageUpdate';

export const upload: RequestHandler = (req, res) => {
  const { entity, id } = req.params;
  const validEntities = ['hospitals', 'users', 'doctors'];
  if (!validEntities.includes(entity)) {
    const message = 'Not a valid entity...';
    return res.status(400).json(new ServerResponse(false, message));
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    const message = 'No files were uploaded.';
    return res.status(400).json(new ServerResponse(false, message));
  }

  const image = req.files.image;
  const ext = path.extname(image.name);
  const validExt = ['png', 'jpg', 'jpeg', 'gif'];
  if (!validExt.includes(ext)) {
    const message = 'Not a valid extension';
    return res.status(400).json(new ServerResponse(false, message));
  }

  const filename = uuid.v4() + ext;
  const filepath = `uploads/${entity}/${filename}`;
  image.mv(filepath, error => {
    if (error) {
      console.log('error', error);
      return res.status(500).json({ success: false, error });
    }

    updateImage(entity, id, filename);

    res.status(201).json({ success: true, file: filename });
  });
};

export const getImage: RequestHandler = (req, res) => {
  const { entity, id } = req.params;

  const imgPath = path.join(__dirname, `../../uploads/${entity}/${id}`);
  const noImgPath = path.join(__dirname, '../../uploads/no-img.png');
  if (!fs.existsSync(imgPath)) {
    return res.sendFile(noImgPath);
  }
  res.sendFile(imgPath);
};
