// 导入axios
import axios from "axios";
// 引入配置文件
import requestConfig from "./request.config";
// 引入requestCatchMap
import requestCatchHandler from "./requestCatchHandler.ts";
// 引入ParamOfRequestClass
import ParamOfRequest from "./ParamOfRequestType.ts";

/**
 * 清除请求次数
 */
let clearRequestNumber = () => {
    for (let key in localStorage) {
        if (key.indexOf("requestNumberBy:") == 0) {
            localStorage.removeItem(key);
        }
    }
}

/**
 * 将uuid存入localStorage，并记录请求次数
 */
const addRequestNumber = (uuid:string) => {
    let requestNumber: any = localStorage.getItem("requestNumberBy:" + uuid);
    if (requestNumber) {
        requestNumber = parseInt(requestNumber) - -1;
    } else {
        requestNumber = 1;
    }
    localStorage.setItem("requestNumberBy:" + uuid, requestNumber + "");
}

/**
 * 获取记录的请求次数
 */
const getRequestNumber = (uuid:string) => {
    let requestNumber: any = localStorage.getItem("requestNumberBy:" + uuid);
    if (requestNumber) {
        return parseInt(requestNumber);
    }
    return 0;
}

/**
 * 获取语言编码
 */
const getLanguageCode = () => {
  const languageCode:string =
    localStorage.getItem("languageCode") || navigator.language || "en_US";
  return languageCode.replace("-", "_");
}

/**
 * 设置语言编码
 */
const setLanguageCode = (languageCode:string) => {
  localStorage.setItem("languageCode", languageCode);
}

/**
 * 获取token
 */
const getToken = () => {
  return localStorage.getItem(requestConfig.tokenStroageKey);
}

/**
 * 设置token
 */
const setToken = (token:string) => {
    localStorage.setItem(requestConfig.tokenStroageKey, token);
}

/**
 * 获取地址
 */
const getRootAddress = () => {
  const rootAddress:string =
    localStorage.getItem("rootAddress") || requestConfig.rootAddress;
  return rootAddress;
}

/**
 * 设置地址
 */
const setRootAddress = (rootAddress:string) => {
  localStorage.setItem("rootAddress", rootAddress);
}

/**
 * 获取上传路径
 */
const getUploadAddress = () => {
  const uploadAddress:string =
    localStorage.getItem("uploadAddress") || requestConfig.uploadAddress;
  return uploadAddress;
}

/**
 * 设置上传路径
 */
const setUploadAddress = (uploadAddress:string) => {
  localStorage.setItem("uploadAddress", uploadAddress);
}

/**
 * 请求
 * @param param 请求参数
 * @param uuid 请求的uuid 可选
 */
const request = (param: ParamOfRequest, uuid?:any) => {

    // 如果没有uuid，生成一个uuid
    uuid = uuid || Math.random().toString(36);
    param.url = param.url || "";
    if (param.url.indexOf("/") == 0) {
        param.url = param.url.substring(1);
    }
    axios({
        url: getRootAddress()+"/"+param.url,
        method: param.method || "post",
        data: param.data,
        headers: {
            contentType: param.contentType || "application/json;charset=UTF-8",
            token: getToken(),
            languageCode: getLanguageCode(),
            uuid: uuid,
            ...param.headers,
        },
        timeout: param.timeout,
    }).then((res) => {
        if (res.data.success) {
            param.stateSuccess(res.data);
            return;
        }
        param.stateFail(res.data);
    }).catch((err) => {
        let result = requestCatchHandler.get(err);
        console.log(result);
        // 如果是网络错误，延迟1秒后重试
        if (result.msgDictCode == "errNetwork") {
            // 如果没有uuid，生成一个uuid
            uuid = uuid || Math.random().toString(36).substring(2);

            // 将uuid存入localStorage，并记录请求次数
            addRequestNumber(uuid);

            setTimeout(() => {
                console.log("网络错误的断网重连中...");
                request(param, uuid);
            }, 1000);
            return;
        }
        // 如果是404和503的断网重连
        if (result.msgDictCode == "noService") {

            // 将uuid存入localStorage，并记录请求次数
            addRequestNumber(uuid);

            // 如果请求次数大于30次，直接返回
            if (getRequestNumber(uuid) > 180) {
                param.stateFail(requestCatchHandler.get(result));
                return;
            }

            setTimeout(() => {
                console.log("404和503的断网重连中...");
                request(param, uuid);
            }, 2000);
            return;
        }

        param.stateFail(requestCatchHandler.get(result));
    });

};



export default {
    clearRequestNumber,
    getLanguageCode,
    setLanguageCode,
    getToken,
    setToken,
    getRootAddress,
    setRootAddress,
    getUploadAddress,
    setUploadAddress,
    request,
}
