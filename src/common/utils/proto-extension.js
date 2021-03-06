
/**
 * 不管Promise对象最后状态是 Fulfilled | Rejected, 最后执行的finally函数
 * @param {Function} 回调函数
 */ 
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    let p = this.constructor
    return this.then(
      value => Promise.resolve(callback.call(this, value)),
      reason => Promise.reject(callback.call(this, reason)).then(null, () => { throw reason })
    )
  }
}

/**
 * Date.prototype下的格式方法
 * @param {String} format 格式化方式
 * @example
 *    年-月-日 时:分:秒
 *    yyyy-MM-dd hh:mm:ss:SS => 2016-10-29 10:22:22.176
 *    yyyy年MM月dd日 hh:mm:ss:SS => 2016年10月29日 10:22:22.176
 */
Date.prototype.format = function (format) {
  let date = {
    'y+': this.getFullYear(),
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S+': this.getMilliseconds()
  }
  let k

  for (k in date) {
    let re = new RegExp('(' + k + ')')
    format = format.replace(re, function ($1) {
      return date[k] < 10 ? '0' + date[k] : date[k]
    })
  }

  return format
}

// oppo r7 有这个问题
if (!Array.prototype.find) {
  Array.prototype.find = function (operator) {
    for (var i = 0, len = this.length; i < len; i++) {
      if (operator.call(this, this[i], i)) {
        return this[i]
      }
    }
  }
}

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (operator) {
    for (var i = 0, len = this.length; i < len; i++) {
      if (operator.call(this, this[i], i)) {
        return i
      }
    }
  }
}

if (!Array.prototype.some) {
  Array.prototype.some = function (operator) {
    for (var i = 0, len = this.length; i < len; i++) {
      if (operator.call(this, this[i], i)) {
        return true
      }
    }
    return false
  }
}

if (!Array.prototype.every) {
  Array.prototype.every = function (operator) {
    var n = 0
    for (var i = 0, len = this.length; i < len; i++) {
      if (operator.call(this, this[i], i)) {
        n++
      }
    }

    if (n === len) {
      return true
    }

    return false
  }
}