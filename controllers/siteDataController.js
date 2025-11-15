import SiteData from '../models/SiteData.js'
import { ok, created, badRequest } from '../utils/response.js'

async function getSingleton() {
  let doc = await SiteData.findOne({})
  if (!doc) doc = await SiteData.create({})
  return doc
}

export async function getData(req, res) {
  const doc = await getSingleton()
  return ok(res, doc)
}

export async function upsertData(req, res) {
  const payload = req.body || {}
  const doc = await getSingleton()
  doc.about = payload.about ?? doc.about
  doc.projects = payload.projects ?? doc.projects
  doc.testimonials = payload.testimonials ?? doc.testimonials
  doc.contact = payload.contact ?? doc.contact
  await doc.save()
  return ok(res, doc, 'Site data updated')
}

export async function patchAbout(req, res) {
  const doc = await getSingleton()
  doc.about = { ...(doc.about || {}), ...(req.body || {}) }
  await doc.save()
  return ok(res, doc.about, 'About updated')
}

export async function patchContact(req, res) {
  const doc = await getSingleton()
  doc.contact = { ...(doc.contact || {}), ...(req.body || {}) }
  await doc.save()
  return ok(res, doc.contact, 'Contact updated')
}

export async function patchProjects(req, res) {
  if (!Array.isArray(req.body)) return badRequest(res, 'Body must be an array of projects')
  const doc = await getSingleton()
  doc.projects = req.body
  await doc.save()
  return ok(res, doc.projects, 'Projects updated')
}

export async function patchTestimonials(req, res) {
  if (!Array.isArray(req.body)) return badRequest(res, 'Body must be an array of testimonials')
  const doc = await getSingleton()
  doc.testimonials = req.body
  await doc.save()
  return ok(res, doc.testimonials, 'Testimonials updated')
}
