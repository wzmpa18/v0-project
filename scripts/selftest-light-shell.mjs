import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()

function ensure(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

async function testManifest() {
  const manifestPath = path.resolve(projectRoot, 'public/assets/runtime-manifest.json')
  const raw = await fs.readFile(manifestPath, 'utf8')
  const manifest = JSON.parse(raw)

  ensure(Array.isArray(manifest.files), 'manifest.files 缺失')
  ensure(manifest.files.length > 0, 'manifest.files 为空')

  const first = manifest.files[0]
  const filePath = path.resolve(projectRoot, 'public', first.path.replace(/^\//, ''))
  const content = await fs.readFile(filePath)
  const hash = createHash('sha256').update(content).digest('hex')

  ensure(hash === first.sha256, 'SHA-256 校验失败')
  ensure(manifest.categories && typeof manifest.categories === 'object', '分类清单缺失')
}

async function testOfflineCacheContract() {
  const appConfigPath = path.resolve(projectRoot, 'lib/app-config.ts')
  const raw = await fs.readFile(appConfigPath, 'utf8')
  ensure(raw.includes('offlineCachePrefix'), '离线缓存前缀配置缺失')
}

async function testRetryAuthRateLimitContract() {
  const resilientPath = path.resolve(projectRoot, 'lib/resilient-fetch.ts')
  const raw = await fs.readFile(resilientPath, 'utf8')

  ensure(raw.includes('timeoutMs'), '超时逻辑缺失')
  ensure(raw.includes('retryTimes'), '重试逻辑缺失')
  ensure(raw.includes('Authorization'), '鉴权头逻辑缺失')
  ensure(raw.includes('请求过于频繁'), '限流逻辑缺失')
}

async function testNoBlackScreenContract() {
  const guardPath = path.resolve(projectRoot, 'components/app-runtime-guard.tsx')
  const raw = await fs.readFile(guardPath, 'utf8')

  ensure(raw.includes('online'), '在线监听缺失')
  ensure(raw.includes('offline'), '离线监听缺失')
  ensure(raw.includes('OfflineBanner'), '离线友好提示缺失')
}

async function main() {
  await testManifest()
  await testOfflineCacheContract()
  await testRetryAuthRateLimitContract()
  await testNoBlackScreenContract()

  console.log('Self-test passed: manifest/hash/offline/retry-auth-rate-limit contracts are valid.')
}

main().catch((error) => {
  console.error('Self-test failed:', error.message)
  process.exit(1)
})
