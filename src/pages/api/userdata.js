import fs from 'fs';
import path from 'path';
import connectDB from '../../utils/db';
import ActiveComplaint from '../../models/ActiveComplaint';
import HealthHistories from '../../models/HealthHistories';

export default async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    const { username } = req.query;

    try {
      if (!username) {
        return res.status(400).json({ success: false, message: 'Username is required' });
      }

      const activeComplaint = await ActiveComplaint.findOne({ username });
      const healthHistories = await HealthHistories.find({ username });

      const userDir = path.join(process.cwd(), 'public/reports', username);
      let images = [];

      if (fs.existsSync(userDir)) {
        const files = fs.readdirSync(userDir);
        images = files.map((file) => {
          const [reportType] = file.split('.');
          return {
            filename: file,
            reportType
          };
        });
      }

      if (!activeComplaint && !healthHistories.length && !images.length) {
        return res.status(404).json({ success: false, message: 'No data found for the user' });
      }

      res.status(200).json({
        success: true,
        data: {
          activeComplaint,
          healthHistories,
          images
        }
      });
    } catch (err) {
      console.error('Server error:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};