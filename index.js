hexo.extend.deployer.register('qiniu', require('./lib/deployer'));

var htmlTag = require('hexo-util').htmlTag;
var log = hexo.log;
var prefix_url = hexo.config.qiniu.prefix;
/**
 * 将markdown里的tag 数组解析成配置对象<br/>
 * 如标签: {% qnimg test/demo.png title:图片标题 alt:图片说明 'class:class1 class2' %}<br/>
 * 则传入参数为: ['test/demo.png', 'title:图片标题', 'alt:图片说明', 'class:class1 class2'] <br/>
 * 解析结果为:{ title: '图片标题',  alt: '图片说明', class: 'class1 class2'}<br/>
 * 注意：参数值有空格的需要用引号将整个配置项括起来
 */
var parseAttrs = function (argArray) {
  var attrs = {};

  for (var i = 1; i < argArray.length; i++) {
    var txt = argArray[i];

    if (txt.length > 2) {
      if (txt[0] === '\'' || txt[0] === '"') {
        txt = txt.substring(1, txt.length - 1);
      }
    }

    var parseAttr = txt.split(':');
    attrs[parseAttr[0]] = parseAttr[1];
  }
  return attrs;
}

/**
 * 如标签: {% qnimg test/demo.png title:图片标题 alt:图片说明 'class:class1 class2' 'extend：?imageView2/2/w/800/h/2000' %}<br/>
 * 解析结果为:<br/>
 * <img title="图片标题" alt="图片说明" class="class1 class2" src="http://gyk001.qiniudn.com/images/test/demo.png?imageView2/2/w/800/h/2000">
 * 注意：参数值有空格的需要用引号将整个配置项括起来
 */
var qnImgTag = function (args, content) {
  var imageName = args[0];
  var imgAttr = parseAttrs(args);

  var process = imgAttr.extend ? imgAttr.extend : hexo.config.qiniu.extend;
  delete imgAttr.normal;
  delete imgAttr.extend;
  imgAttr.src  = [prefix_url, imageName, process].join('');
  return htmlTag('img', imgAttr);
};

hexo.extend.tag.register('qnimg', qnImgTag);