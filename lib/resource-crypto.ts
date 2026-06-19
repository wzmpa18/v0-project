const encoder = new TextEncoder()
const decoder = new TextDecoder()

async function deriveKey(secret: string): Promise<CryptoKey> {
  const keyData = encoder.encode(secret.padEnd(32, '0').slice(0, 32))
  return crypto.subtle.importKey('raw', keyData, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt'])
}

export async function encryptPayload(plainText: string, secret: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(secret)
  const cipherBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoder.encode(plainText))

  const cipherBytes = new Uint8Array(cipherBuffer)
  const joined = new Uint8Array(iv.length + cipherBytes.length)
  joined.set(iv)
  joined.set(cipherBytes, iv.length)

  return btoa(String.fromCharCode(...joined))
}

export async function decryptPayload(payload: string, secret: string): Promise<string> {
  const allBytes = Uint8Array.from(atob(payload), (c) => c.charCodeAt(0))
  const iv = allBytes.slice(0, 12)
  const cipher = allBytes.slice(12)
  const key = await deriveKey(secret)

  const plainBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher)
  return decoder.decode(plainBuffer)
}
