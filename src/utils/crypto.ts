import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

export function encrypt(email: string): string {
  const encrypted = AES.encrypt(
    email,
    process.env.NEXT_PUBLIC_CRYPTO_SECRET || '',
  ).toString();
  return encodeURIComponent(encrypted);
}

export function decrypt(cipherText: string): string {
  const bytes = AES.decrypt(
    decodeURIComponent(cipherText),
    process.env.NEXT_PUBLIC_CRYPTO_SECRET || '',
  );
  return bytes.toString(Utf8);
}
