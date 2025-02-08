// // utils/cryptoUtils.ts
// import crypto from "crypto";

// const secretKeyString = process.env.NEXT_PUBLIC_SECRET_KEY ?? "";
// const secretKey = Buffer.from(secretKeyString, "base64");
// const ivLength = 16;

// export const encrypt = (text) => {
//   if (!text) return "";
//   try {
//     const iv = crypto.randomBytes(ivLength);
//     const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
//     let encrypted = cipher.update(text, "utf8", "hex");
//     encrypted += cipher.final("hex");
//     return iv.toString("hex") + ":" + encrypted;
//   } catch (err) {
//     console.error("Encryption error:", err);
//     throw new Error("Failed to encrypt content");
//   }
// };

// export const decrypt = (text) => {
//   if (!text || !text.includes(":")) return text;
//   try {
//     const parts = text.split(":");
//     const iv = Buffer.from(parts[0], "hex");
//     const encryptedText = parts[1];
//     const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
//     let decrypted = decipher.update(encryptedText, "hex", "utf8");
//     decrypted += decipher.final("utf8");
//     return decrypted;
//   } catch (err) {
//     console.error("Decryption error:", err);
//     return text;
//   }
// };
