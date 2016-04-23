// 常量定义
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
var item_width = 10;
var item_height = 10;

var converter = new showdown.Converter();

var data = [];
bgsvg = d3.select('body').append('svg');

// data.json 的格式为 ["name", x_point, y_point]
$.ajax({
    url: window.data_url,
    type: 'get',
    dataType: 'json',
    success: function(ret) {
        data = ret;
        render_circle();
        render_items();
        render_axis(); // make sure to render axis after data rendered!!!
    }
});


function render_items() {
    bgsvg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return d.x
        })
        .attr("y", function(d, i) {
            return d.y
        })
        .attr("width", item_width).attr("height", item_height)
        .attr("opacity", 0.3)

    bgsvg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function(d, i) {
            return d.x
        })
        .attr("y", function(d, i) {
            return d.y
        })
        .text(function(d, i) {
          return d.name
        })
        .on("click", function(d, i) {
          var html = converter.makeHtml(d.summary);
          $("#content").html(html);
        });
}

// 绘制背景圆形
function render_circle() {
    bgsvg.attr({
        "width": svg_length,
        "height": svg_height
    });
    bgcircle = bgsvg.append('circle');
    bgcircle.attr("cx", bg_circle_cx).attr("cy", bg_circle_cy).attr("r", bg_circle_r)
        .attr("opacity", 0.1);
    // 4 个 level
    var caiyong_circle = bgsvg.append('circle');
    caiyong_circle.attr("cx", bg_circle_cx).attr("cy", bg_circle_cy).attr("r", caiyong_level)
        .attr("opacity", 0.1).attr('strok', 'yellow')
    var shiyong_circle = bgsvg.append('circle');
    shiyong_circle.attr("cx", bg_circle_cx).attr("cy", bg_circle_cy).attr("r", shiyong_level)
        .attr("opacity", 0.1).attr('strok', 'blue')
    var pinggu_circle = bgsvg.append('circle');
    pinggu_circle.attr("cx", bg_circle_cx).attr("cy", bg_circle_cy).attr("r", pinggu_level)
        .attr("opacity", 0.1).attr('strok', 'read')
}

// 绘制数轴
function render_axis() {
    var x_line = bgsvg.append("line");
    x_line.attr("x1", 0).attr("y1", bg_circle_r).attr("x2", svg_length).attr("y2", bg_circle_r)
        .attr("style", "stroke:rgb(255,255,255);stroke-width:2")
    var y_line = bgsvg.append("line");
    y_line.attr("x1", bg_circle_r).attr("y1", 0).attr("x2", bg_circle_r).attr("y2", svg_length)
        .attr("style", "stroke:rgb(255,255,255);stroke-width:2")

    bgsvg.append("text").attr("x", unit_r * 0.5).attr("y", bg_circle_r).text(window.ring_text[0]).attr("text-anchor", "middle");
    bgsvg.append("text").attr("x", unit_r * 2).attr("y", bg_circle_r).text(window.ring_text[1]).attr("text-anchor", "middle");
    bgsvg.append("text").attr("x", unit_r * 4.5).attr("y", bg_circle_r).text(window.ring_text[2]).attr("text-anchor", "middle");
    bgsvg.append("text").attr("x", unit_r * 8).attr("y", bg_circle_r).text(window.ring_text[3]).attr("text-anchor", "middle");

    bgsvg.append("text").attr("x", unit_r * 12).attr("y", bg_circle_r).text(window.ring_text[3]).attr("text-anchor", "middle");
    bgsvg.append("text").attr("x", unit_r * 15.5).attr("y", bg_circle_r).text(window.ring_text[2]).attr("text-anchor", "middle");
    bgsvg.append("text").attr("x", unit_r * 18).attr("y", bg_circle_r).text(window.ring_text[1]).attr("text-anchor", "middle");
    bgsvg.append("text").attr("x", unit_r * 19.5).attr("y", bg_circle_r).text(window.ring_text[0]).attr("text-anchor", "middle");

    bgsvg.append("text").attr("x", bg_circle_r * 0.1).attr("y", bg_circle_r * 0.1).text(window.quadrant_text[0]).attr("text-anchor", "middle");
    bgsvg.append("text").attr("x", bg_circle_r * 0.1).attr("y", 2 * bg_circle_r).text(window.quadrant_text[1]).attr("text-anchor", "middle");
    bgsvg.append("text").attr("x", 2 * bg_circle_r - bg_circle_r * 0.1).attr("y", bg_circle_r * 0.1).text(window.quadrant_text[2]).attr("text-anchor", "middle");
    bgsvg.append("text").attr("x", 2 * bg_circle_r - bg_circle_r * 0.1).attr("y", 2 * bg_circle_r).text(window.quadrant_text[3]).attr("text-anchor", "middle");
}
