/**
 * 分页参数
 * @param data 请求的数据
 * @param pageSize 每页的大小
 * @param pageNumber 页码
 * @return PageParam 分页参数
 */
type PageRequestParam<T> = {
    /**
     * @param data 请求的数据
     */
    data: T | any;
    /**
     * @param pageSize 每页的大小
     */
    pageSize: number;
    /**
     * @param pageNumber 页码
     */
    pageNumber: number;
}

export default PageRequestParam;