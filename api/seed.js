const bcrypt = require('bcryptjs');
const { connect, getModels } = require('./_db');

module.exports = async (req, res) => {
  // Protect seeding with a secret key set in Vercel env vars (SEED_KEY)
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const incoming = req.headers['x-seed-key'] || req.query.seedKey || req.body.seedKey;
  if (!process.env.SEED_KEY || incoming !== process.env.SEED_KEY) {
    return res.status(403).json({ message: 'Forbidden: invalid seed key' });
  }

  try {
    await connect();
    const { User, Resource, Program } = getModels();

    // Demo users
    const users = [
      { name: 'Admin User', email: 'admin@example.com', password: 'adminpass', role: 'admin' },
      { name: 'Student User', email: 'student@example.com', password: 'studentpass', role: 'student' },
    ];

    for (const u of users) {
      let existing = await User.findOne({ email: u.email });
      if (!existing) {
        const hashed = await bcrypt.hash(u.password, 10);
        existing = await User.create({ name: u.name, email: u.email, password: hashed, role: u.role });
      }
    }

    // Demo resources (only if empty)
    const resCount = await Resource.countDocuments();
    if (resCount === 0) {
      const demoResources = [
        { title: 'Getting Started with Campus Mental Health Support', category: 'Mental Health', description: 'A concise orientation to campus counselling services, confidentiality, and how to make an appointment.', link: '/resources/campus-mental-health-start' },
        { title: 'Exam Stress Survival Toolkit', category: 'Mental Health', description: 'Practical daily steps to reduce exam-related overwhelm, including quick breathing exercises and brief study-break routines.', link: '/resources/exam-stress-toolkit' },
        { title: 'Beginner Bodyweight Workout Plan', category: 'Fitness', description: 'A no-equipment, progressive plan focused on strength and mobility for students new to exercise.' },
        { title: 'Eating Healthy on a Tight Budget', category: 'Nutrition', description: 'Practical strategies for affordable, nutritious meals using common hostel ingredients and a small stove.' },
      ];
      await Resource.insertMany(demoResources);
    }

    // Demo programs (only if empty)
    const progCount = await Program.countDocuments();
    if (progCount === 0) {
      const demoPrograms = [
        { name: 'Mindfulness & Meditation', category: 'Mental Wellness', schedule: 'Mon, Wed, Fri 10:00 AM', mode: 'online', status: 'open', enrolled: 0, capacity: 50 },
        { name: 'Yoga for Beginners', category: 'Fitness', schedule: 'Tue, Thu 6:00 PM', mode: 'in-person', status: 'open', enrolled: 0, capacity: 30 },
      ];
      await Program.insertMany(demoPrograms);
    }

    res.json({ ok: true, message: 'Seed complete (demo users/resources/programs created if absent)'});
  } catch (err) {
    console.error('Seed error', err);
    res.status(500).json({ message: err.message });
  }
};
