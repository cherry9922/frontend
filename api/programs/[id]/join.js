const { connect, getModels } = require('../../../_db');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  await connect();
  const { Program, User } = getModels();
  try {
    const { id } = req.query || {};
    // basic auth: extract user id from JWT if provided
    const auth = req.headers.authorization || '';
    let userId = null;
    if (auth.startsWith('Bearer ')) {
      try {
        const decoded = jwt.verify(auth.slice(7), process.env.JWT_SECRET || 'secret');
        userId = decoded.id;
      } catch (e) {
        // ignore
      }
    }
    const p = await Program.findById(id);
    if (!p) return res.status(404).json({ message: 'Program not found' });
    if (p.enrolled < p.capacity) {
      p.enrolled = (p.enrolled || 0) + 1;
      await p.save();
      return res.json({ ok: true, program: p });
    }
    return res.status(400).json({ message: 'Program full' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
