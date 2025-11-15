import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  slug: String,
  title: String,
  description: String,
  photos: [
    {
      url: { type: String, required: true },
      publicId: { type: String}
    }
  ]
}, { _id: false })

const TestimonialSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  text: String,
}, { _id: false })

const MapUrlSchema = new mongoose.Schema({
  key: String,
  name: String,
  url: String,
}, { _id: false })

const SiteDataSchema = new mongoose.Schema({
  about: {
    intro: String,
    mission: String,
    vision: String,
    philosophy: String,
  },
  projects: [ProjectSchema],
  testimonials: [TestimonialSchema],
  contact: {
    phone: String,
    email: String,
    socials: {
      instagram: String,
      facebook: String,
      linkedin: String,
    },
    mapUrls: [MapUrlSchema]
  }
}, { timestamps: true })

export default mongoose.model('SiteData', SiteDataSchema)
