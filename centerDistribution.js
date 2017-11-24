function das () {
  alert(52)
}
const centerDistribution = (price, i) => {
  const w = W / 6
  const h = W * 0.1
  const data = d3.range(-3, 3, 0.1).map(n => [Math.pow(price, 1 + i * n), 1 - cdf(n)])
  //
  data.unshift([0, 1])
  svg.append("g").attr("transform", `translate(${w * 2.5},${H/2-h/2})`).attr("id", "dist")
  const x = d3.scaleLinear().domain([0, d3.max(data, n=>n[0])]).range([0, w])
  const y = d3.scaleLinear().domain([0, 1]).rangeRound([h, 0])
  const area = d3.area()
      .x(d => x(d[0]))
      .y0(h)
      .y1(d => y(d[1]))
    var line = area.lineY1()
  const dist = svg.select('#dist')
  const costData = [[0, 1],[8.2, 1]]
  dist.append('path').attr("d", area(costData)).attr("fill", '#cccccc')
  dist.append("path")
    .attr("d", area(data))
    .attr("fill", PrimaryColor)
    .attr('opacity', 0.1)
    .on('click',()=>console.log('fr'))
  dist.append("path")
    .attr("d", line(data))
    .attr("stroke", PrimaryColor)
    .attr("fill", 'none')
    .attr("stroke-width", 2)
  // 画底部axis
  dist.append("g")
    .attr("transform", "translate(0," + h + ")")
    .call(d3.axisBottom(x)
      .tickSize(0)
      .tickPadding(6)
    );

  dist.append("g")
    .call(d3.axisLeft(y)
      .ticks(1)
    );
  //画虚线
  const hintData = [[0,0.5],[20.03,0.5],[20.03,0]];
  dist.append("path").attr("stroke-dasharray", 4).attr('d', line(hintData))
      .attr("stroke", PrimaryColor)
      .attr("fill", 'none')
	  .attr("stroke-width", 1);


  // 画顶部
  const g = dist.append("g").attr("text-anchor", "middle").attr("transform", "translate(0, -40)")
  g.append('text').attr("x", w*0.25).text("Pmax")
  g.append('text').attr("x", w*0.25).attr("y", 30).attr("class", "h1").text("20.03");
  g.append('text').attr("x", w*0.75).text("σ")
  g.append('text').attr("x", w*0.75).attr("y", 30).attr("class", "h1").text("0.3");
  //g.append('text').attr("class", "h1").text("mu: 0.3").attr("text-anchor", "middle");
}


const distribS = (m) => {
  // var xz = d3.range(m),
  // yz = d3.range(n).map(() => bumps(m)),
  yMax = 10;// d3.max(yz, n => d3.max(n));
  const r = H/3 + 40;
  const c = [1.1, 0.72, 2.05, 1.35, 2.4,1.3, 1.3, 2.5]

  const arc = d3.arc()
    .innerRadius(r)
    .outerRadius((n,i) => r + n * 30)
    .startAngle((n,i) => Math.PI / 4 * i)
    .endAngle((n,i) => Math.PI / 4 * (i+0.1))
  const node = svg.select('#circle');

  const nodePath = node.selectAll('path').data(c).enter().append("path").attr('fill', PrimaryColor)
  const tweenArc = (b) => {
    return function(a, i) {
      var d = b.call(this, a, i);
      const m = d3.interpolate(0, d);
      //console.log(arc)
      // for (var k in d) a[k] = d[k]; // update data
      return function(t) { return arc(m(t), i); };
    };
  }
  nodePath.transition()
    .duration(500)
    .delay(function(d, i) { return i * 150; })
    .attrTween("d", tweenArc((d, i) => {
      return d;
    }))
    //.attrTween("d", arc([0,0,0,0,0]))
}
