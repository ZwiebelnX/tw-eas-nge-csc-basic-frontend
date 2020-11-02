import VueRouter, {Route} from "vue-router";
import {AxiosInstance} from 'axios';
import {Urls} from "@/utils/urls";
import {ElMessage} from "element-ui/types/message";
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter; // 这表示this下有这个东西
    $route: Route;
    $https: AxiosInstance; // 不知道类型就定为 any 吧（偷懒）
    $urls: Urls;
    $message: ElMessage;
  }
}
