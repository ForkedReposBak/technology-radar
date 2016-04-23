var jsonfile = require('jsonfile')
var util = require('util')
var dirTree = require('directory-tree');
// var readingFileTree = dirTree.directoryTree('data/reading/', ['.md']);
// var techFileTree = dirTree.directoryTree('data/tech/', ['.md']);
var fts = [
  {
    "path": 'data/reading/',
    "quadrant": {
      "art": 1,
      "engineering": 2,
      "science": 3,
      "other": 4
    }
  },
  {
    "path": 'data/tech/',
    "quadrant": {
      "tool": 1,
      "tech": 2,
      "platform": 3,
      "language": 4
    }
  }
];
var _ = require('lodash');
var fs = require('fs');
var fm = require('front-matter')

// begin config................
var svg_length = 1024;
var unit_r = svg_length / 10 / 2;
var caiyong_level = unit_r * 4;
var shiyong_level = caiyong_level + unit_r * 3;
var pinggu_level = shiyong_level + unit_r * 2;
var zanhuan_level = pinggu_level + unit_r * 1;
var svg_width = svg_length; // svg 的宽度
var svg_height = svg_length; // svg 的高度
var bg_circle_cx = svg_length / 2;
var bg_circle_cy = svg_length / 2;
var bg_circle_r = svg_length / 2;
var item_width = 20;
var item_height = 10;


// end config................

function Item(name, quadrant, level, summary) {　　　　
    this.name = name;　　　　
    this.quadrant = quadrant;　　　　
    this.level = level;　　　　
    this.summary = summary;
}

function Point(name, x, y, summary) {　　　　
    this.name = name;
    this.x = x;　　　　
    this.y = y;
    this.summary = summary;
}

// var fts = [readingFileTree, techFileTree];
fts.forEach(function(ft){
  var path = ft.path;
  var quadrant_define = ft.quadrant;
  var fileTree = dirTree.directoryTree(path, ['.md']);
  var results = [];

  jsonfile.writeFile(path + "data.json", fileTree, function() {
      // 在读取 data.json , 重构数据结构后再次写入
      jsonfile.readFile(path + "data.json", function(err, obj) {
          var folders = obj.children;
          folders.forEach(function(f) {
              var quadrant = f.name;
              var nodes = f.children;
              nodes.forEach(function(n) {
                  fs.readFile(path + n.path, 'utf8', function(err, data) {
                      var content = fm(data);
                      var name = content.attributes.name; //n.name;
                      console.log(content.body);
                      var item = new Item(name, quadrant, content.attributes.level, content.body);
                      results.push(item);
                      var points = _.map(results, function(r) {
                          return generate_random_location(r, quadrant_define);
                      });
                      jsonfile.writeFile(path + "items.json", points, function(err) {
                          if (err) {
                              console.error(err)
                          } else {
                              console.log("build data success!");
                          }
                      });
                  });
              });
          });
      });
  });
});


// 根据象限和环生成随机的坐标
// function generate_random_location(name, quadrant, level) {
function generate_random_location(item, quadrant_define) {
    var quadrant_number = quadrant_define[item.quadrant];
    var jiaodu = _.random((quadrant_number - 1) * 90 + 20, quadrant_number * 90 - 20);
    if (item.level == 1) {
        current_r = _.random(0 + unit_r / 2, unit_r * 4 - unit_r / 3)
    }
    if (item.level == 2) {
        current_r = _.random(unit_r * 4 + unit_r / 2, unit_r * 4 + unit_r * 3 - unit_r / 3)
    }
    if (item.level == 3) {
        current_r = _.random(unit_r * 4 + unit_r * 3 + unit_r / 2, unit_r * 4 + unit_r * 3 + unit_r * 2 - unit_r / 3)
    }
    if (item.level == 4) {
        current_r = _.random(unit_r * 4 + unit_r * 3 + unit_r * 2 + unit_r / 2, unit_r * 4 + unit_r * 3 + unit_r * 2 + unit_r * 1 - unit_r / 3)
    }
    var x = bg_circle_r + current_r * Math.sin(jiaodu * (Math.PI / 180));
    var y = bg_circle_r + current_r * Math.cos(jiaodu * (Math.PI / 180));
    var point = new Point(item.name, x, y, item.summary);
    return point;
}
