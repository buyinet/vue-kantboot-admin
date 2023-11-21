import { defineStore } from 'pinia'
import { store } from '../../store'

export interface IRajasStore {
    /**
     * 浏览器窗口大小
     */
    windowSize: {
        width: number,
        height: number
    },
    /**
     * Header高度
     */
    headerHeight: number,
    /**
     * Main高度
     */
    mainHeight: number,
    /**
     * 管理后台Main高度
     */
    manageMainHeight: number,
}

const useRajasStore = defineStore({
    id: 'rajas',
    state: (): IRajasStore => ({
        windowSize: {
            width: 0,
            height: 0
        },
        headerHeight: 0,
        mainHeight: 0,
        manageMainHeight: 500,
    }),
    getters: {
        getWindowSize(): IRajasStore['windowSize'] {
            return this.windowSize;
        },
        getHeaderHeight(): IRajasStore['headerHeight'] {
            return this.headerHeight;
        },
        getMainHeight(): IRajasStore['mainHeight'] {
            return this.mainHeight;
        },
        getManageMainHeight(): IRajasStore['manageMainHeight'] {
            return this.manageMainHeight;
        }
    },
    actions: {
        setWindowSize(size: IRajasStore['windowSize']) {
            this.windowSize = size;
        },
        setHeaderHeight(height: IRajasStore['headerHeight']) {
            this.headerHeight = height;
        },
        setMainHeight(height: IRajasStore['mainHeight']) {
            this.mainHeight = height;
        },
        setManageMainHeight(height: IRajasStore['manageMainHeight']) {
            this.manageMainHeight = height;
        }
    }
})

const useRajasStoreWithOut = () => {
    return useRajasStore(store);
}


export {
    useRajasStore,
    useRajasStoreWithOut
}

