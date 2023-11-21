/**
 * 分页结果
 */
export type PageResult<T> = {

    /**
     * @param data 数据
     */
    content: T[];

    /**
     * @param number 当前页码
     */
    number: number;

    /**
     * @param size 每页的大小
     */
    size: number;

    /**
     * @param totalElements 总数
     */
    totalElements: number;

    /**
     * @param totalPages 总页数
     */
    totalPages: number;

}
