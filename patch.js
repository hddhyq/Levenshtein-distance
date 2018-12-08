const { actionType } = require('./diff');

const patch = (a, diffs) => {
  let aList = a.split('');
  let delCount = 0;
  diffs.forEach((diff) => {
    switch (diff.type) {
      case actionType.TYPE_DELETE:
        aList.splice(diff.index - delCount, 1);
        delCount++
        break;
      case actionType.TYPE_NEW:
        aList.splice(diff.index, 0, diff.item);
        break;
      case actionType.TYPE_REPLACE:
        aList.splice(diff.index, 1, diff.item);
        break;
      default:
        break;
    }
  })

  // console.log(aList.join(''))

  return aList.join('')
}

module.exports = patch;