import request from "./libs/request";
import date from "./libs/date";
import KtIcon from "./components/KtIcon/KtIcon.vue";
import KtTable from "./components/KtTable/KtTable.vue";

export default {
    request,
    date,
    install(app: any): void {
        app.component("KtIcon", KtIcon);
        app.component("KtTable", KtTable);
        app.config.globalProperties.$kt = this;
    }
}