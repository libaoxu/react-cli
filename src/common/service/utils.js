import config from './config'

/**
 * 序列化参数
 */
export const getSerializeParam = function (params) {
  let key
  let str = ''
  for (key in params) {
    str += '&' + key + '=' + params[key]
  }
  return str.substring(1)
}



/**
 * 可扩展的api对象
 * @param {Function) fRule 扩展前的规则函数
 * @return {Object} 扩展的方法集合
 * extend 方法, 根据扩展规则, 扩展到源对象上
 */
export const getExtendObject = function (fRule) {
  var _service = Object.create(null)

  return Object.defineProperty(_service, '$extend', {
    ...config.definePropertySet,
    value: function serviceExtend (obj) {
      return Object.assign(this, fRule(obj))
    }
  })
}

const _defaultSetting = config.urlCurrySettings

export const getCurryUrl = (rootURL, reqType) => {
  /**
   * @param {Object} options vue-resource 相关对象
   * @param {Object} settings 接口请求相关配置
   */
  return (urlName, options, settings) => {
    return {
      url: rootURL + urlName,
      type: reqType,
      options: options || {},
      settings: Object.assign({}, _defaultSetting, settings)
    }
  }
}

export const getRequestRoots = (root) => {
  const self = {
    /**
     * root地址 的 get 请求函数,
     * @type {Function}
     */
    getRoot: getCurryUrl(root, config.REQ_TYPE.GET),

    /**
     * root地址 的 post 请求函数, 次函数执行后得到 apiConfig需要的json对象
     * @type {Function}
     */
    postRoot: getCurryUrl(root, config.REQ_TYPE.POST),

    /**
     * 给postRoot 增加默认的参数, 变成x-www-form-urlencoded形势
     */
    postRootXForm: (url, options, settings) => {
      return self.postRoot(url, {
        ...config.xFormOptions,
        ...options
      }, settings)
    }
  }

  return self
}