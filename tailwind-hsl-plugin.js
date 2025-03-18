// tailwind-hsl-plugin.js
module.exports = function () {
  return ({ addUtilities }) => {
    const newUtilities = {
      ".bg-primary": {
        backgroundColor: "hsl(var(--primary))",
      },
      ".text-primary-foreground": {
        color: "hsl(var(--primary-foreground))",
      },
      // Add other color utilities as needed
    };
    addUtilities(newUtilities);
  };
};
