/**
 * 请求参数
 * 用于配置请求的参数
 */
type ParamOfRequest={
    /**
     * 请求地址
     */
    url: string;
    /**
     * 请求方法
     */
    method?: string;

    /**
     * contentType
     */
    contentType?: string;

    /**
     * 请求数据
     */
    data?: any;
    /**
     * 请求参数
     */
    params?: any;
    /**
     * 请求头
     */
    headers?: any;
    /**
     * 请求超时时间
     */
    timeout?: number;
    /**
     * 请求成功回调
     */
    stateSuccess?: any;
    /**
     * 请求失败回调
     * @param res
     */
    stateFail?: any;
}

export default ParamOfRequest;
