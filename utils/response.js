export function ok(res, data = {}, message = 'OK') {
  return res.json({ success: true, message, data })
}

export function created(res, data = {}, message = 'Created') {
  return res.status(201).json({ success: true, message, data })
}

export function badRequest(res, message = 'Bad Request') {
  return res.status(400).json({ success: false, message })
}

export function unauthorized(res, message = 'Unauthorized') {
  return res.status(401).json({ success: false, message })
}

export function serverError(res, message = 'Server Error') {
  return res.status(500).json({ success: false, message })
}
