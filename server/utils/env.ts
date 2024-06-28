// read dependencies
import { z } from "zod";

const env = z.object({
  NEW_DB_URL: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  AUTH_SECRET: z.string(),
  AUTH_URL: z.string(),
});
console.log("env: ", process.env);
// manuel env variable dogrulugunu kontrol etme
// env var kullanacagimiz zaman buraya yüklüyoruz
export default env.parse(process.env);
