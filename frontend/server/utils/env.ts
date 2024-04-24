// read dependencies
import { z } from "zod";

const env = z.object({
  DB_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_URL: z.string()
});

// manuel env variable dogrulugunu kontrol etme
// env var kullanacagimiz zaman buraya yüklüyoruz
export default env.parse(process.env);