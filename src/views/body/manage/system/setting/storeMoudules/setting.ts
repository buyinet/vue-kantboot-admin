import { defineStore } from 'pinia'
import { store } from '/src/store'

export interface ISettingStore {
    /**
     * 选中的group
     */
    groupOfSelected: {
        /**
         * code
         */
        code: string;
        /**
         * 名称
         */
        name: string;
    }
}

const useSettingStore = defineStore({
    id: 'setting',
    state: (): ISettingStore => ({
        groupOfSelected: {
            code: '',
            name: ''
        }
    }),
    getters: {
        getGroupOfSelected(): ISettingStore['groupOfSelected'] {
            return this.groupOfSelected;
        }
    },
    actions: {
        setGroupOfSelected(group: ISettingStore['groupOfSelected']) {
            this.groupOfSelected = group;
        }
    }
})

const useSettingStoreWithOut = () => {
    return useSettingStore(store);
}


export {
    useSettingStore,
    useSettingStoreWithOut
}

