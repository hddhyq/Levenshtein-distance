const ld = (a, b) => {
  let t = [],
    u,
    i,
    j,
    m = a.length,
    n = b.length;

  if (!m) return b;
  if (!n) return a;

  for (j = 0; j <= m; j++) {
    t[j] = j;
  }

  console.log(t);

  for (i = 1; i <= n; i++) {
    for (u = [i], j = 1; j <= m; j++) {
      u[j] = a[j - 1] === b[i - 1] ? t[j - 1] : Math.min(t[j - 1], t[j], u[j - 1]) + 1  // Levenshtein Distance 算法核心
    }

    t = u;
    console.log(t);
  }

  return u[m];
}

[['beauty', 'batyu', 3],
].forEach(function (v) {
  var a = v[0], b = v[1], t = v[2], d = ld(a, b);
  if (d !== t) {
    console.log('levenstein("' + a + '","' + b + '") was ' + d + ' should be ' + t);
  }
});