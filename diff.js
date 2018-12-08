const actionType = {
  TYPE_REPLACE: 'TYPE_REPLACE',
  TYPE_NEW: 'TYPE_NEW',
  TYPE_DELETE: 'TYPE_DELETE'
}

/**
 * 
 * @param { array } r 替换操作 replace
 * @param { array } n 新建操作 new
 * @param { array } d 删除操作 delete
 * @param { number } i 需要转换元素的 index
 * @param { number } j 需要删除元素的 index
 * @param { string } b 比较字符串
 */

const compare = (r, n, d, i, j, b) => {
  // console.group('r:', i, r.length);
  // console.groupEnd()
  // console.group('n:', i, n.length);
  // console.groupEnd()
  // console.group('d:', i, d.length);
  // console.groupEnd()
  const min = Math.min(r.length, n.length, d.length);

  switch (min) {
    case r.length:
      return [...r, patchObj(i, actionType.TYPE_REPLACE, b[i])];
    case n.length:
      return [...n, patchObj(i, actionType.TYPE_NEW, b[i])];
    case d.length:
      return [...d, patchObj(j, actionType.TYPE_DELETE)];
  }
}

const patchObj = (index, type, item = '') => {
  return {
    index,
    type,
    item
  }
}

const diff = (a, b) => {
  let t = [[]],
    u = [],
    i,
    j,
    m = a.length,
    n = b.length;

  if (!m) {
    let ret = []
    b.split('').forEach((item, index) => {
      ret = [...ret, patchObj(index, actionType.TYPE_NEW, item)]
    })

    return ret;
  };

  if (!n) {
    let ret = [];
    a.split('').forEach((item, index) => {
      ret = [...ret, patchObj(index, actionType.TYPE_DELETE)]
    })

    return ret;
  };

  for (j = 1; j <= m; j++) {
    t[j] = [...t[j - 1], patchObj(j - 1, actionType.TYPE_DELETE)];
  }

  // let ret = [];

  // t.forEach((item) => {
  //   ret.push(item.length)
  // })

  // console.log(ret)

  for (i = 1; i <= n; i++) {
    u = [];
    u[0] = [...t[0], patchObj(i - 1, actionType.TYPE_NEW, b[i - 1])];

    for (j = 1; j <= m; j++) {
      u[j] = a[j - 1] === b[i - 1]
        ? [...t[j - 1]]
        : compare(t[j - 1], t[j], u[j - 1], i - 1, j - 1, b)
    }

    t = u;

    // ret = [];
    // t.forEach((item) => {
    //   ret.push(item.length)
    // });
    // console.log(ret);
  }

  return u[m];
}

module.exports = { diff, actionType };