/**
 * Created by junyi on 2018/1/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/store/modules/login';
import user from '@/store/modules/user'
import permission from '@/store/modules/permission'
import common from '@/store/modules/common'
import tabs from '@/store/modules/tabs'
Vue.use( Vuex );
const store = new Vuex.Store( {
      modules : {
            login, user, permission, common, tabs
      }
} );
export default store
