class EventHub {
  cache: { [key: string]: Array<(data: unknown) => void> } = {};
  on(eventName: string, fn: (data: unknown) => void) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }
  emit(eventName: string, data?: unknown) {
    (this.cache[eventName] || []).forEach((fn) => fn(data));
  }
  off(eventName: string, fn: (data: unknown) => void) {
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
function indexOf(
  arr: Array<(data: unknown) => void>,
  target: (data: unknown) => void
) {
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
