const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || process.env.VITE_MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('No MONGODB_URI provided — serverless API will not persist data. Please set MONGODB_URI in Vercel env vars.');
}

let cached = global.__mongo;

if (!cached) cached = global.__mongo = { conn: null, promise: null };

async function connect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => ({ conn: mongoose.connection }));
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Models
function getModels() {
  const { Schema } = mongoose;

  const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'student' },
  }, { timestamps: true });

  const ResourceSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    category: String,
    link: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
  }, { timestamps: true });

  const ProgramSchema = new Schema({
    name: String,
    category: String,
    schedule: String,
    mode: String,
    status: String,
    enrolled: { type: Number, default: 0 },
    capacity: { type: Number, default: 30 },
  }, { timestamps: true });

  const models = {
    User: mongoose.models.User || mongoose.model('User', UserSchema),
    Resource: mongoose.models.Resource || mongoose.model('Resource', ResourceSchema),
    Program: mongoose.models.Program || mongoose.model('Program', ProgramSchema),
  };
  return models;
}

module.exports = { connect, getModels };
