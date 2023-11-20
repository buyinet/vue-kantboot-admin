import request from "../request";

/**
 * 新版
 */
const visit = function (id: any) {
    return `${request.getUploadAddress()}/file/visit/${id}`;
};

const visitByCode = function (code: any) {
    return `${request.getUploadAddress()}/file/visitByCode/${code}`;
}

/**
 * 上传
 * @param groupCode 分组
 */
const getUploadPath = function (groupCode: string) {
    return `${request.getUploadAddress()}/file/upload/${groupCode}`;
};

const getPreviewSrcList = function (ids: Array<any>) {
    var result = [];
    for (let i = 0; i < ids.length; i++) {
        var id = ids[i] + "";
        id = id.replace("[", "").replace("]", "");
        result.push(visit(id));
    }
    return result;
};

export default {
    visit,
    visitByCode,
    getUploadPath,
    getPreviewSrcList,
};
