module.exports = {
  presets: [
    '@babel/preset-env',
    '@vue/app',
    "es2015"
  ],
  plugins: [
    '@babel/plugin-syntax-object-rest-spread',
    '@babel/plugin-transform-runtime',
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}