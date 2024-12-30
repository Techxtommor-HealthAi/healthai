import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public/reports');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'File upload error' });
    }

    console.log('Fields:', fields);
    console.log('Files:', files);

    const reportType = fields.reportType;
    const username = Array.isArray(fields.username) ? fields.username[0] : fields.username;
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file || !file.filepath) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const userDir = path.join(form.uploadDir, username);

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    const newFilePath = path.join(userDir, `${reportType}.png`);

    fs.rename(file.filepath, newFilePath, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'File save error' });
      }

      res.status(200).json({ success: true, message: 'File uploaded successfully' });
    });
  });
};
