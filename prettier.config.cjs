const tailwindPluginConfig = require("prettier-plugin-tailwindcss");

module.exports = {
  plugins: [tailwindPluginConfig],
  tailwindConfig: "./tailwind.config.cjs",
};
