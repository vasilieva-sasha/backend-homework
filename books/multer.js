import multer from 'multer'

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, './public/uploads/')
  },
  filename(_, file, cb) {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`
    )
  },
})

const allowedTypes = ['image/jpeg', 'image/png']

const fileFilter = (_, file, cb) => {
  const { mimetype } = file

  if (allowedTypes.includes(mimetype)) {
    cb(null, true)
  } else {
    cb(new Error(`Sorry, I cannot accept file with this type: ${mimetype}`))
  }
}

const uploadFiles = multer({ storage, fileFilter })

export default uploadFiles
