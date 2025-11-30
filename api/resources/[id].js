const { connect, getModels } = require('../_db');

module.exports = async (req, res) => {
  await connect();
  const { Resource } = getModels();
  const { id } = req.query || {};
  try {
    if (req.method === 'PUT') {
      const updated = await Resource.findByIdAndUpdate(id, req.body, { new: true });
      return res.json(updated);
    }
    if (req.method === 'DELETE') {
      await Resource.findByIdAndDelete(id);
      return res.json({ message: 'Deleted' });
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
