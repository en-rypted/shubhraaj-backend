import mongoose from 'mongoose'

const SettingsSchema = new mongoose.Schema({
  seedSecretHash: { type: String },
}, { timestamps: true })

export default mongoose.model('Settings', SettingsSchema)
