import { v2 as cloudinary } from 'cloudinary'
import { readdirSync, statSync } from 'fs'
import { join, relative, extname } from 'path'

cloudinary.config({
  cloud_name: 'dwlznbqoi',
  api_key: '732461731359321',
  api_secret: '7UwmO9y2JNSVL7OeVC5AhStaTog',
})

const PUBLIC_DIR = new URL('../public', import.meta.url).pathname
const FOLDERS = ['event photos', 'event videos']
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'])
const VIDEO_EXTS = new Set(['.mp4', '.mov', '.webm', '.MP4', '.MOV'])

function getAllFiles(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...getAllFiles(full))
    else files.push(full)
  }
  return files
}

async function uploadFile(filePath) {
  const ext = extname(filePath).toLowerCase()
  const isVideo = VIDEO_EXTS.has(extname(filePath)) || VIDEO_EXTS.has(ext)
  const isImage = IMAGE_EXTS.has(ext)
  if (!isVideo && !isImage) return null

  const rel = relative(PUBLIC_DIR, filePath)
  // public_id = blueocean/event photos/Sckylers/filename (no extension)
  const publicId = 'blueocean/' + rel.replace(/\.[^/.]+$/, '')
  const resourceType = isVideo ? 'video' : 'image'

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: resourceType,
      overwrite: false,
      unique_filename: false,
    })
    console.log(`✓ ${rel}`)
    return { rel, url: result.secure_url }
  } catch (err) {
    if (err.error?.message?.includes('already exists')) {
      console.log(`- skip (exists): ${rel}`)
      return null
    }
    console.error(`✗ ${rel}: ${err.message || err.error?.message}`)
    return null
  }
}

async function main() {
  const allFiles = []
  for (const folder of FOLDERS) {
    const dir = join(PUBLIC_DIR, folder)
    try { allFiles.push(...getAllFiles(dir)) } catch {}
  }

  console.log(`Found ${allFiles.length} files to upload...\n`)

  let done = 0
  for (const file of allFiles) {
    await uploadFile(file)
    done++
    if (done % 10 === 0) console.log(`[${done}/${allFiles.length}]`)
  }

  console.log('\nDone!')
}

main()
