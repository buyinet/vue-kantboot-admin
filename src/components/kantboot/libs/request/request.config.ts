/**
 *  请求配置
 *  用于配置请求的根地址、响应数据字段、通用状态码、登录页面路径等
 *  该配置文件会被打包到项目中，不要在此文件中配置敏感信息
 */
const config = {
  /**
   * 根地址，用于配置请求的根地址，如：http://localhost:8889，
   * 注意：不要以“/”结尾，否则会导致请求地址错误
   *
   */
  // rootAddress: "http://192.168.31.130:10001",
  // uploadAddress: "http://192.168.31.130:8881",
  // rootAddress: "https://dev.fc.aaarfyh.com/",
  // uploadAddress: "https://dev.fc.file.aaarfyh.com",
  // rootAddress: "http://192.168.85.246:10001",
  // uploadAddress: "http://192.168.85.246:8881",
  rootAddress: "http://127.0.0.1:10001",
  uploadAddress: "http://127.0.0.1:8881",

  /**
   * 根WebSocket地址，用于配置WebSocket请求的根地址，如：ws://localhost:8889，
   */
  rootWebSocketAddressList: "wss://localhost:8889/taskSocket",

  /**
   * 请求头字段
   */
  headerField: {
    /**
     * token字段
     */
    token: "token",
  },

  /**
   * token存储字段，用于配置token存储的字段，如：token
   */
  tokenStroageKey: "token",

  /**
   * 响应数据字段
   */
  responseDataField: {
    stateCode: "stateCode", // 状态码字段
    stateSuccessMessage: "msg", // 状态为“成功”时的字段
    stateFalidMessage: "errMsg", // 状态为“失败”时的字段
    bodyData: "data", //主体数据字段
  },

  /**
   * 通用状态码
   */
  stateCode: {
    /**
     * 成功状态码，用于配置请求成功的状态码，如：0
     */
    success: "SUCCESS",
    /**
     * 失败状态码，用于配置请求失败的状态码，如：-1
     */
    notLogin: "NOT_LOGIN",
  },

  /**
   * 登录页面路径，用于配置登录页面的路径，如：/login/login
   */
  loginPagePath: "/login/login",
};

export default config;
