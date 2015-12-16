/* eslint-env browser */
/* global $, d3 */

'use strict';

var fill = d3.scale.category20();

$(function() {

  var svgD3 = d3.select('#word-cloud');
  var dimensions = svgD3.node().getBoundingClientRect();
  var width = dimensions.width;
  var height = dimensions.height;

  // Scale to translate from tag counts to font size in pixels.
  var textScale = d3.scale.log()
    .domain([window.minTagCount, window.maxTagCount])
    .range([10, 80]);

  d3.layout.cloud().size([width, height])
    .words(window.processedTags)
    .rotate(function() { return ~~(Math.random() * 160) - 80; })
    .font('Impact')
    .fontSize(function(d) { return textScale(d.size); })
    .on('end', draw)
    .start();

  function draw(words) {
    var wordContainersD3 = svgD3
      .attr('width', width)
      .attr('height', height)
    .append('g')
      .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')')
    .selectAll('g')
      .data(words)
    .enter().append('g');

    wordContainersD3.append('text')
      .style('font-size', function(d) { return d.size + 'px'; })
      .style('font-family', 'Impact')
      .style('fill', function(d, i) { return fill(i); })
      .attr('text-anchor', 'middle')
      .attr('transform', function(d) {
        return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
      })
      .text(function(d) { return d.text; });

    wordContainersD3.append('title')
      .text(function(d) { return d.text + '\ncount: ' + d.count; });
  }
});
