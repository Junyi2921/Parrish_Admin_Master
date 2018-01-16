/**
 * Created by junyi on 2018/1/15.
 */

const tabView = {
      addTab : function(tabs){
            sessionStorage.setItem( 'tabs', JSON.stringify( tabs ) );
      }, getTabs : function(){
            return JSON.parse( sessionStorage.getItem( "tabs" ) );
      }
};
export default tabView;

