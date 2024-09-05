/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor:{
        "chat-bar-msg":['grey'],
        "chat-pending":['#553ce4']
      },
      colors:{
        "chat-bg":["#faf6f3"],
        "my-chat" :['#fdfdfd'],
        "frnd-chat": ['#e3f9c3']
      },
      dropShadow:{
        "my-msg":['1px 4px 10px #ccb6b6']
      }
    },
  },
  plugins: [],
}