# ExUIWeb3.4

## 1. 介绍

编写此文档的目的：

* 记录构建流程
* 便于理解和维护

## 2. 编撰

孙震（496549@qq.com）

## 3. 架构流程

### 3.1. 初始化并安装依赖包

```shell
# 初始化项目，根据 package.json 安装依赖包
$ npm i --save-dev

# 开发环境调试命令
$ npm run dev


```

### 3.2. 新建项目页面
```shell
# 1、复制src/pages/Demo文件夹，生成新平台项目，给复制的文件夹重新命名
# 2、修改该文件夹下的main.js(入口js文件)、router.js(初始路由文件)
# 3、运行发布命令，自动在dist文件夹下生成项目页面
$ npm run build  // 发布模式

$ npm run dev  //开发模式

```






## 4. 架构说明

```shell
# 框架架构说明

dist --------------------------------------------------------  发布页面文件夹，发布时自动清理
src ---------------------------------------------------------  源文件仓库
  |___ common -----------------------------------------------  公共文件库
  |        |___  lib ----------------------------------------  外部引用JS库
  |        |___  plugin -------------------------------------  引用插件JS库
  |        |       |___ theme-blue --------------------------  主题sass文件夹(蓝色主题)
  |        |       |___ theme-blue.scss ---------------------  主题sass外部修改文件(蓝色主题)
  |        |       |___  axios.js ---------------------------  http请求JS封装文件
  |        |       |___  echart.js --------------------------  echartJS封装文件 / 大数据图形化工具
  |        |       |___  element.js -------------------------  element封装文件  / UI前端基础框架库
  |        |___  stastic ------------------------------------  公共资源库
  |        |       |___  img --------------------------------  公共图片库
  |        |       |___  style.less -------------------------  自定义less/css文件
  |___ component --------------------------------------------  公共组件库
  |        |___  Error --------------------------------------  系统404页面入口  
  |        |       |___  notFound.vue -----------------------  系统404页面
  |        |___  Layout -------------------------------------  自定义布局类组件
  |        |       |___  pHeader.vue ------------------------  平台类头部组件 
  |        |___  components.js ------------------------------  自定义组件封装文件
  |___ pages ------------------------------------------------  生产页面文件夹
  |        |___  Demo ---------------------------------------  DEMO演示平台  
  |        |       |___  template.ejs -----------------------  DEMO演示平台首页模板文件
  |        |       |___  Configs ----------------------------  配置文件夹
  |        |       |      |___  main.js ---------------------  入口JS文件
  |        |       |      |___  router.js -------------------  路由JS文件
  |        |       |___  Home -------------------------------  DEMO演示平台首页文件夹 
  |        |       |      |___  dHome.vue -------------------  DEMO演示平台首页vue文件
  |        |       |      |___  service.home.js -------------  DEMO演示平台首页请求js文件


 

```

## 5. 使用规范

### 框架使用规范
```shell
# 命名规范
1、所有JS、CSS、LESS、SASS以及图片文件均用小写英文单词命名
2、自定义组件使用首字母大写驼峰形式命名，与该组件名称及TAG保持一致
3、系统文件夹使用首字母大写驼峰形式命名
4、VUE文件命名为首字母小写驼峰形式命名，首字母对应各自平台文件夹首字母
5、每个Vue页面可对应相应的js文件，http请求建议使用service.*.js命名方式


# 建立新工程用法
1、以pages/Demo Demo演示平台为例进行页面构建，pages以外文件夹不建议自行修改
2、对应不同的平台，可在webpack.base.config.js里进行entry入口的相应修改，会自动根据配置生成不同平台的发布文件，发布文件会生成在dist文件夹中


# 样式主题修改规范
1、本项目默认主题为ElementUI自带主题包，目前已修改部分参数，为了不与依赖包里发生冲突，所以单独Copy至 src/common/plugin文件夹，并以theme-blue重命名
2、如需修改scss颜色等参数，建议在 src/common/plugin/theme-blue.scss 文件中修改相关参数，不要轻易修改主题包


```

## 6. 更新说明

```shell
# 框架更新说明

1、在原有3.3版本的基础上，根据目前实际情况及招聘情景，更换原 iViewUI 为 ElementUI 作为 基础前端UI框架
2、对原3.3版本进行常用组件封装化及规范化
3、更新为多入口工程，对应未来需求

```

## 参考





