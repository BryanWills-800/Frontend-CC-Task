module.exports = {
  theme: {
    extend: {
      // ... your existing extend config ...
      keyframes: {
        // ... your existing keyframes ...
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "orbit-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        // ... your existing animations ...
        "spin-slow": "spin-slow 9s linear infinite",
        "orbit-spin": "orbit-spin 3.2s linear infinite",
      },
    },
  },
};