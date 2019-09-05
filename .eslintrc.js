module.exports = {
  // "env": {
  //   "browser": true,
  //   "commonjs": true,
  //   "es6": true,
  //   "node": true
  // },
  globals: {
    "AMap": true,
  },

  extends: [
    'plugin:vue/essential',
    'airbnb',
  ],

  "parserOptions": {
    "parser": "babel-eslint",
    "sourceType": "module",
  },
  "plugins": [
    "vue",
    "html",
  ],
  "rules": {
    // 类方法里需要 this
    "class-methods-use-this": "warn",
    // 未使用的变量
    "no-unused-vars": "warn",
    // 优先使用解构
    "prefer-destructuring": "warn",
    // 不给参数重新赋值
    "no-param-reassign": "warn",
    "global-require": "warn",
    // 不要内嵌三元表达式
    "no-nested-ternary": "warn",

    // 不要动态设置 require
    "import/no-dynamic-require": "warn",
    // 引入的依赖不能放在 package.json 的 “dependencies”
    "import/no-extraneous-dependencies": "warn",

    "no-use-before-define": "warn",

    // 每行最大字符数（100）
    "max-len": "warn",

    // 未使用的（函数）形参
    "no-shadow": "warn",
    "prefer-template": "off",
    "object-curly-newline": "warn",
  }
};