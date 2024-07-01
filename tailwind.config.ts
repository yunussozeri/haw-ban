import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default <Partial<Config>>{
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "winter"],
  },
  theme: { fontFamily: { mono: ["Inter var"] } },
  content: ["docs/content/**/*.md"],
  // 50-swn 950-w  kdr aciktan koyuya renkleri yaz
};
