#############################################################################################

# H5项目结构

## html css javascript
## 引用库   javascript\store      
## 引用插件 javascript\io
## 公共JS   javascript\common
## 模板JS   javascript\base   
## 项目逻辑 javascript\module
## 自定义组件 javascript\util
## 备用     javascript\page

# sass使用
##  ruby
安装RUBY 安装COMPASS SASS                                                     

$ gem sources --remove https://rubygems.org/                                                     

$ gem sources -a https://ruby.taobao.org/                                                     

$ gem sources -l                                                     

$ gem install compass                                                     

##  compass 
$compass init                                                     
$compass watch

## 通过compass编译出来的css文件，在html中直接引用css文件夹下的文件路径

------------------------------------------------------------------------------------------
## webpage-config.js 
### js统一通过entries（）方法打包，例如：glob.sync(jsDir + '/common/*.{js,jsx}') 去添加打包项目的路径 
	
	webpack执行

	entry: Object.assign(entries(), {
        vendor: ['babel-polyfill'],
        common: utils.assetsRootPath('src/common.js')
    }),
### html 统一通过 config.plugins.push(new HtmlWebpackPlugin(conf));动态添加多入口文件，HTML只能配置在HTML文件夹下

## 规范
### HTML与JS文件名称必须保持一致，后缀不一样即可，另外CSS文件都在对应的JS文件下引入，HTML通过HtmlWebpackPlugin处理，
### 对应的JS不用单独引入，已具备自动打包功能，除非有额外业务需求，才需要新建JS文件然后在HTML引入，一个HTML对应一个CSS和一个公共CSS，不能再多
-----------------------------------------------------------------------------------------------
## html命名规范
### 一级描述 如：demo 二级描述 如：demoDetail 三级描述 如demoSomeDel

## JS命名规范
### 一个主的JS对应一个HTML，命名一样，引用CSS在这个JS引用，可以有多个JS对应HTML（插件单独作为一个JS引入）

## css规范
### 允许有多个CSS（一般保持一个，不排除用插件的情况，因此允许多个），但是必须在对应HTML的JS里面引用，注意，所有CSS不能有相同的名称命名

                          
