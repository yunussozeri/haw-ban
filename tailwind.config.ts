import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: ["docs/content/**/*.md"],
  // 50-swn 950-w  kdr aciktan koyuya renkleri yaz
  theme: {
    colors: {
      'darkblue': '#004e98',
      'lightblue': '#3a6ea5',
      'darkgray': '#c0c0c0',
      'lightgray': '#ebebeb',
      'orange': '#ff6700',
    },
    fontFamily: {
      "comic-sans-ms": ["Comic Sans MS"],
      "lato": ["Lato"],
      "cooper-hewitt-heavy": ["Cooper Hewitt Heavy"],
      "neue-helvetica": ["Neue Helvetica"]
      
    },
  },
};
