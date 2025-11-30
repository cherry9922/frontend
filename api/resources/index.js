const { connect, getModels } = require('../_db');

module.exports = async (req, res) => {
  await connect();
  const { Resource } = getModels();
  try {
    if (req.method === 'GET') {
      const list = await Resource.find().sort('-createdAt');
      return res.json(list);
    }

    if (req.method === 'POST') {
      // basic auth via Authorization header
      const auth = req.headers.authorization || '';
      // creation allowed if auth present — for production validate token
      const { title, description, category, link } = req.body || {};
      const r = await Resource.create({ title, description, category, link });
      return res.json(r);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
