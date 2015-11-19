## Introduction

This is a [hexo] deployer plugin which help you to embed static file stored on [qiniu]

**The point is you don't need upload files to qiniu manual**

基于[hexo-qiniu-sync]修改，删减了大部分功能，仅保留文件上传的部分。

## Installation

To install, run the following command in the root directory of hexo:
```
npm install hexo-deployer-qiniu --save
```

And add this plugin in your ``_config.yml``.

```
##七牛云存储设置
##type          类型，这里填写qiniu
##bucket        空间名称
##access_key    上传密钥AccessKey
##secret_key    上传密钥SecretKey
##sync_dir      上传目录，默认上传: public/*，填写后上传: public/qiniu_dir(包含qiniu_dir目录本身)
deploy:
- type: git
  repo: ***
  branch: master
- type: qiniu
  bucket: ***
  access_key: ***
  secret_key: ***
  sync_dir:  static

##prefix 静态文件访问的前缀，例如：http://7xo6lp.com1.z0.glb.clouddn.com/static/;用于标签解析解析
##extend 这是个特殊参数，用于生成缩略图或加水印等操作。具体请参考http://developer.qiniu.com/docs/v6/api/reference/fop/image/
qiniu:
  prefix: http://7xo6lp.com1.z0.glb.clouddn.com/static/
  extend: ?imageView2/2/w/800/h/2000
```

## 版本更新：
* 0.1.3: 修改win下因sep不同导致的重复上传问题，同时改为根据hash判断是否需要上传文件（而不是大小和时间）
* 0.1.2: 支持`qnimg`标签
* 0.1.1: 支持`_config.yml`配置并上传
* 0.1.0: 调整实现查找功能
* 0.0.1: 清理原目录和文件

[hexo]: https://github.com/tommy351/hexo
[qiniu]: http://www.qiniu.com/
[hexo-qiniu-sync]: https://github.com/gyk001/hexo-qiniu-sync