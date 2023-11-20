// 用来处理请求的catch，防止错误信息被重复弹出

import {AxiosError} from "axios";

let requestCatchHandler: any = {};

requestCatchHandler.get = (param:AxiosError) => {

    if (param.code == "ERR_NETWORK") {
        return {
            success: false,
            errMsg: "请检查网络或稍后重试",
            msg: "请检查网络或稍后重试",
            msgDictCode: "errNetwork",
        };
    }

    if (param.message.indexOf("404")!=-1 || param.message.indexOf("503")!=-1) {
        return {
            success: false,
            errMsg: "没有服务或服务未开启",
            msg: "没有服务或服务未开启",
            msgDictCode: "noService",
        };
    }

    if (param.message.indexOf("500")!=-1) {
        return {
            success: false,
            errMsg: "系统错误",
            msg: "系统错误",
            msgDictCode: "systemError",
        };
    }

    return {
        success: false,
        errMsg: "系统错误",
        msg: "系统错误",
        msgDictCode: "systemError",
    };
}

export default requestCatchHandler;
