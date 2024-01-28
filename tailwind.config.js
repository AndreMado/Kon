/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**.html", "./public/class1.html"],
  theme: {
    extend: {
      backgroundImage: {
        bgPetsCanvas:
          "url('https://static.platzi.com/media/user_upload/mokemap-ca51ea18-7ac8-492f-be96-6181d766a99d.jpg')",
        arcadeMachineSmall:
          "url('https://acdn.mitiendanube.com/stores/902/154/themes/amazonas/img-1545770635-1670794267-39599f23a60df1c2b871f2f8ba1e43771670794267.png?693587397')",
      },
      fontFamily: {
        Play: ["Play", "sans-serif"],
        Arcade: ["ArcadeClassic", "sans-serif"],
      },

      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#F6F1E9",
        secondary: "#FFD93D",
        terciary: "#FF8400",
        four: "#4F200D",
      }),
      borderColor: (theme) => ({
        ...theme("colors"),
        primary: "#F6F1E9",
        secondary: "#FFD93D",
        terciary: "#FF8400",
        four: "#4F200D",
      }),
      textColor: (theme) => ({
        ...theme("colors"),
        primary: "#F6F1E9",
        secondary: "#FFD93D",
        terciary: "#FF8400",
        four: "#4F200D",
      }),
    },
    plugins: [],
  },
};
