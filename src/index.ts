class EventHub {
  cache = {};
  // {
  //   "楚天都市报": [fn1, fn2, fn3],
  //   "北京日报": [fn4, fn5, fn6]
  // }
  on(eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }
  emit(eventName, data?) {
    (this.cache[eventName] || []).forEach((fn) => fn(data));
  }
  off(eventName, fn) {
    let index = indexOf(this.cache[eventName], fn);
    if (index === -1) return;
    this.cache[eventName].splice(index, 1);
  }
}

/**
 * 查询数组中目标元素的下标
 * @param arr
 * @param target
 * @returns
 */
function indexOf(arr, target) {
  let index = -1;
  if (arr === undefined) return index;
  for (let i = 0; i < arr.length; i++) {
    if (target === arr[i]) {
      index = i;
      break;
    }
  }
  return index;
}

export default EventHub;
