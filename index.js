const { diff } = require('./diff');
const patch = require('./patch');

[['', '', 0],
['beauty', 'batyu', 3],
['yo', '', 2],
['', 'yo', 2],
['yo', 'yo', 0],
['tier', 'tor', 2],
['saturday', 'sunday', 3],
['mist', 'dist', 1],
['tier', 'tor', 2],
['kitten', 'sitting', 3],
['stop', 'tops', 2],
['rosettacode', 'raisethysword', 8],
['mississippi', 'swiss miss', 8]
].forEach(function (v) {
  var a = v[0], b = v[1], t = v[2], d = diff(a, b).length, diffs = diff(a, b);
  let patched = patch(a, diffs);

  if (patched !== b) {
    console.log(`patched string ${patched} shoud be ${a}`)
  }
  
  if (d !== t) {
    console.log('levenstein("' + a + '","' + b + '") was ' + d + ' should be ' + t);
  }
});