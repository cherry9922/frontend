const { connect, getModels } = require('../_db');

module.exports = async (req, res) => {
  await connect();
  const { Program } = getModels();
  try {
    if (req.method === 'GET') {
      const list = await Program.find().sort('-createdAt');
      return res.json(list);
    }
    if (req.method === 'POST') {
      const { name, category, schedule, mode, status, capacity } = req.body || {};
      const p = await Program.create({ name, category, schedule, mode, status, capacity });
      return res.json(p);
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
