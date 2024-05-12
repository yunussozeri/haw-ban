import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: ["docs/content/**/*.md"],
  // 50-swn 950-w  kdr aciktan koyuya renkleri yaz
  theme: {
    // colors: {
    //   blue: {},
    // },
    fontFamily: {
      "comic-sans-ms": ["Comic Sans MS"],
    },
  },
};
