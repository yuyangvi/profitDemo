const cdf = function(z) {
  var cd,
      Z = Math.abs(z);
  if (Z > 37) {
    cd = 0;
  } else {
    var sum, exp = Math.exp(-Z*Z/2);
    if (Z < 7.07106781186547) {
      sum = 3.52624965998911e-02 * Z + 0.700383064443688;
      sum = sum * Z + 6.37396220353165;
      sum = sum * Z + 33.912866078383;
      sum = sum * Z + 112.079291497871;
      sum = sum * Z + 221.213596169931;
      sum = sum * Z + 220.206867912376;
      cd = exp * sum;
      sum = 8.83883476483184e-02 * Z + 1.75566716318264;
      sum = sum * Z + 16.064177579207;
      sum = sum * Z + 86.7807322029461;
      sum = sum * Z + 296.564248779674;
      sum = sum * Z + 637.333633378831;
      sum = sum * Z + 793.826512519948;
      sum = sum * Z + 440.413735824752;
      cd = cd / sum;
    } else {
      sum = Z + 0.65;
      sum = Z + 4 / sum;
      sum = Z + 3 / sum;
      sum = Z + 2 / sum;
      sum = Z + 1 / sum;
      cd = exp / sum / 2.506628274631;
    }
  }
  return z > 0 ? 1 - cd : cd;
};

// Returns an array of m psuedorandom, smoothly-varying non-negative numbers.
// Inspired by Lee Byron’s test data generator.
// http://leebyron.com/streamgraph/
function bumps(m) {
var values = [], i, j, w, x, y, z;

// Initialize with uniform random values in [0.1, 0.2).
for (i = 0; i < m; ++i) {
  values[i] = 0.1 + 0.1 * Math.random();
}

// Add five random bumps.
for (j = 0; j < 5; ++j) {
  x = 1 / (0.1 + Math.random());
  y = 2 * Math.random() - 0.5;
  z = 10 / (0.1 + Math.random());
  for (i = 0; i < m; i++) {
    w = (i / m - y) * z;
    values[i] += x * Math.exp(-w * w);
  }
}

// Ensure all values are positive.
for (i = 0; i < m; ++i) {
  values[i] = Math.max(0, values[i]);
}

return values;
}

//节流函数
var throttle = function (fn, interval) {
    var  timer, firstTime = true;

    return function () {
      var args = arguments;
      var _me = this;

       if ( firstTime ) {
         fn.apply(_me, args)
         return firstTime = false;
       }

       if ( timer ) {
         return false
       }

       timer = setTimeout(function () {
         clearTimeout(timer);
         timer=null;
         fn.apply(_me, args)
       }, interval || 500)
    }

}
