function errorHandler(error, req, res, _next) {
  if (error.code === '23505') {
    return res.status(409).json({ message: 'ID number already exists.' });
  }

  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'Uploaded photo exceeds size limit.' });
  }

  return res.status(500).json({ message: 'Internal server error.' });
}

module.exports = errorHandler;
