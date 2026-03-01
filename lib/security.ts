import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "crypto"

const NONCE_TTL_MS = 5 * 60 * 1000

function b64url(input: Buffer) {
  return input
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

function fromB64url(input: string) {
  const pad = 4 - (input.length % 4 || 4)
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad)
  return Buffer.from(b64, "base64")
}

function keyFromSecret(secret: string) {
  return createHash("sha256").update(secret).digest()
}

export function signNonce(secret: string, nonce: string) {
  return b64url(createHmac("sha256", secret).update(nonce).digest())
}

export function createSignedNonce(secret: string) {
  const ts = Date.now().toString()
  const rand = b64url(randomBytes(16))
  const nonce = `${ts}.${rand}`
  const signature = signNonce(secret, nonce)
  return { nonce, signature, expiresInMs: NONCE_TTL_MS }
}

export function verifySignedNonce(secret: string, nonce?: string | null, signature?: string | null) {
  if (!nonce || !signature) return false
  const [ts] = nonce.split(".")
  const issuedAt = Number(ts)
  if (!Number.isFinite(issuedAt)) return false
  if (Math.abs(Date.now() - issuedAt) > NONCE_TTL_MS) return false

  const expected = signNonce(secret, nonce)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function encryptLeadField(value: string | null | undefined, secret?: string) {
  const plaintext = (value || "").trim()
  if (!plaintext) return null
  if (!secret) return plaintext

  const key = keyFromSecret(secret)
  const iv = randomBytes(12)
  const cipher = createCipheriv("aes-256-gcm", key, iv)
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()])
  const tag = cipher.getAuthTag()

  return `enc:v1:${b64url(iv)}:${b64url(tag)}:${b64url(encrypted)}`
}

export function decryptLeadField(value: string | null | undefined, secret?: string) {
  const ciphertext = (value || "").trim()
  if (!ciphertext) return null
  if (!secret) return ciphertext
  if (!ciphertext.startsWith("enc:v1:")) return ciphertext

  const parts = ciphertext.split(":")
  if (parts.length !== 5) return null

  try {
    const iv = fromB64url(parts[2])
    const tag = fromB64url(parts[3])
    const encrypted = fromB64url(parts[4])
    const key = keyFromSecret(secret)
    const decipher = createDecipheriv("aes-256-gcm", key, iv)
    decipher.setAuthTag(tag)
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
    return decrypted.toString("utf8")
  } catch {
    return null
  }
}

