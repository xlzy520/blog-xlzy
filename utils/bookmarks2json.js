var cheerio = require('cheerio'),
  fs = require('fs');

// 读取书签html文件
fs.readFile('./bookmarks_2021_6_7.html', 'utf-8',function(err,data){
  if(err){
    console.log("error");
  }else{
    parse(data);
  }
});

function parse(html){
  
  // 加载html，使用常用的$符号
  var $ = cheerio.load(html);
  
  // 获取最外层的dt标签
  var $dl = $("dl").first();
  var $dt = $dl.children("dt").eq(0);
  
  // 从dt开始遍历dom树，生成对象
  var obj = foo($dt);
  
  // 将对象转化为json字符串，添加额外参数使json格式更易阅读
  var s = JSON.stringify(obj, null, 4);
  
  // 将json字符串写入json文件
  fs.writeFileSync('output.md', s);
  
  function foo($dt){
    
    // h3标签为文件夹名称
    var $h3 = $dt.children("h3");
    
    if($h3.length == 0){
      
      // a标签为网址
      var $a = $dt.children("a");
      
      // 返回该书签的名称和网址组成的对象
      // `- [${$a.text()}](${$a.attr('href')})`
      return $a.length > 0 ? `- [${$a.text()}](${$a.attr('href')})` : null;
    }
    
    var h3 = $h3.text();
    var arr = [];
    var obj = {};
    
    // 获取下一级dt标签集合
    var $dl = $dt.children("dl");
    var $dtArr = $dl.children("dt");
    for(var i = 0; i < $dtArr.length; i++){
      
      // 遍历下一级dt标签
      var tmp = foo($dtArr.eq(i));
      
      // 将返回的对象push至子文件数组
      arr.push(tmp);
    }
    
    // 创建文件夹与子文件数组的键值对
    obj[h3] = arr;
    
    // 返回该对象
    return obj;
  }
}
