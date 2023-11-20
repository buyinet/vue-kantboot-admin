import { defineStore } from 'pinia'
import { store } from '../../store'

export type ManageMenuType = {
    /**
     * code
     */
    code: string;

    /**
     * 标题
     */
    title: string;
    /**
     * 图标
     */
    fileCodeOfIcon: string;
    /**
     * 路径
     */
    path: string;

    /**
     * 组件路径
     */
    componentPath: string;


    /**
     * 子菜单
     */
    children: ManageMenuType[];
}

export interface IManageMenuStore {
    /**
     * 管理菜单列表
     */
    manageMenuList: ManageMenuType[];

    /**
     * 面包屑集合
     */
    breadCrumbList: ManageMenuType[];

}

const useManageMenuStore = defineStore({
    id: 'manageMenu',
    state: (): IManageMenuStore => ({
        manageMenuList: [],
        breadCrumbList: [],
    }),
    getters: {
        getManageMenuList(): IManageMenuStore['manageMenuList'] {
            return this.manageMenuList;
        },
        getBreadCrumbList(): IManageMenuStore['breadCrumbList'] {
            return this.breadCrumbList;
        }
    },
    actions: {
        setManageMenuList(list: IManageMenuStore['manageMenuList']) {
            this.manageMenuList = list;
        },
        setBreadCrumbList(list: IManageMenuStore['breadCrumbList']) {
            this.breadCrumbList = list;
        },
        addBreadCrumbItem(item: ManageMenuType) {
            // 如果已经存在，则删除之前的
            let index = this.breadCrumbList.findIndex((x) => x.code === item.code);
            if (index >= 0) {
                this.breadCrumbList.splice(index, 1);
            }
            // 超过10个，删除第一个
            if (this.breadCrumbList.length >= 10) {
                this.breadCrumbList.shift();
            }
            this.breadCrumbList.push(item);
            localStorage.setItem("breadCrumbList", JSON.stringify(this.breadCrumbList));
        }
    }
});

const useManageMenuStoreWithOut = () => {
    return useManageMenuStore(store);
}

export {
    useManageMenuStore,
    useManageMenuStoreWithOut
}

