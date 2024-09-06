/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        "chat-bar-msg": ["grey"],
        "chat-pending": ["#3aa13abf"],
      },
      colors: {
        "chat-bg": ["white"],
        "my-chat": ["white"],
        "frnd-chat": ["#e3f9c3"],
      },
      dropShadow: {
        "my-msg": ["1px 4px 10px #ccb6b6"],
      },
    },
  },
  plugins: [],
};
