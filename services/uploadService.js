const path = require('path')
const supabase = require('../../back-origin/src/config/supabaseClient')

class UploadService {
  constructor(bucket = 'uploads') {
    this.bucket = bucket
  }

  async upload(file, folder = '') {
    if (!file || !file.buffer) {
      throw new Error('Arquivo inválido ou não fornecido.')
    }
    if (!folder) {
      throw new Error('Arquivo inválido ou não fornecido.')
    }

    const fileExt = path.extname(file.originalname)
    const baseName = path.basename(file.originalname, fileExt)
    const safeName = `${baseName}-${Date.now()}${fileExt}`
    const filePath = `${folder}/${safeName}`

    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    })
    if (error) {
      throw new Error(`Erro no upload do arquivo: ${error.message}`)
    }
    return {
      fileName: safeName,
      path: filePath,
      publicUrl: this.getPublicUrl(filePath),
    }
  }
  getPublicUrl(path) {
    const { data } = supabase.storage.from(this.bucket).getPublicUrl(path)
    return data.publicUrl
  }
}

module.exports = UploadService
