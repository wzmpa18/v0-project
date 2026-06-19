import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const args = process.argv.slice(2)

function readArg(name, fallbackValue) {
  const key = `--${name}`
  const item = args.find((arg) => arg.startsWith(`${key}=`))
  if (!item) {
    return fallbackValue
  }
  return item.slice(key.length + 1)
}

const inputDir = path.resolve(projectRoot, readArg('input', 'public'))
const outputFile = path.resolve(projectRoot, readArg('output', 'public/assets/runtime-manifest.json'))

const CATEGORY_BY_PREFIX = {
  data: 'data',
  models: 'models',
  tcm: 'tcm',
  assets: 'assets',
}

const CATEGORY_BY_EXT = {
  '.js': 'scripts',
  '.mjs': 'scripts',
  '.css': 'styles',
  '.png': 'images',
  '.jpg': 'images',
  '.jpeg': 'images',
  '.svg': 'images',
  '.webp': 'images',
  '.gif': 'images',
  '.ico': 'images',
  '.json': 'json',
  '.txt': 'text',
  '.md': 'docs',
}

async function collectFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      return collectFiles(fullPath)
    }
    return [fullPath]
  }))

  return nested.flat()
}

function toUnixPath(filePath) {
  return filePath.split(path.sep).join('/')
}

function detectCategory(relativePath) {
  const normalized = toUnixPath(relativePath)
  const firstSegment = normalized.split('/')[0]
  if (CATEGORY_BY_PREFIX[firstSegment]) {
    return CATEGORY_BY_PREFIX[firstSegment]
  }

  const ext = path.extname(normalized).toLowerCase()
  return CATEGORY_BY_EXT[ext] || 'other'
}

async function sha256ForFile(filePath) {
  const content = await fs.readFile(filePath)
  return {
    hash: createHash('sha256').update(content).digest('hex'),
    size: content.byteLength,
  }
}

async function buildManifest() {
  const files = await collectFiles(inputDir)
  const relativeOutput = toUnixPath(path.relative(inputDir, outputFile))

  const manifestFiles = []
  for (const filePath of files) {
    const relativePath = toUnixPath(path.relative(inputDir, filePath))
    if (relativePath === relativeOutput) {
      continue
    }

    const { hash, size } = await sha256ForFile(filePath)
    manifestFiles.push({
      path: `/${relativePath}`,
      category: detectCategory(relativePath),
      size,
      sha256: hash,
    })
  }

  manifestFiles.sort((a, b) => a.path.localeCompare(b.path))

  const categories = {}
  let totalBytes = 0
  for (const item of manifestFiles) {
    totalBytes += item.size
    if (!categories[item.category]) {
      categories[item.category] = []
    }
    categories[item.category].push(item)
  }

  const payload = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    baseDir: toUnixPath(path.relative(projectRoot, inputDir)),
    totalFiles: manifestFiles.length,
    totalBytes,
    categories,
    files: manifestFiles,
  }

  await fs.mkdir(path.dirname(outputFile), { recursive: true })
  await fs.writeFile(outputFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')

  console.log(`Manifest generated: ${toUnixPath(path.relative(projectRoot, outputFile))}`)
  console.log(`Files: ${payload.totalFiles}, Bytes: ${payload.totalBytes}`)
  console.log(`Categories: ${Object.keys(categories).join(', ')}`)
}

buildManifest().catch((error) => {
  console.error('Failed to generate manifest:', error)
  process.exit(1)
})
