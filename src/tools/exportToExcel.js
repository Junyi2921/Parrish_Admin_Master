/**
 * Created by junyi on 2018/1/26.
 */
const export2Excel = {
      exportJSON(tHeaderArr, filterArr, dataList, excelTitle){
            let _this = this;
            require.ensure( [], () =>{
                  let { export_json_to_excel } = require( 'plug/Export2Excel' );
                  let tHeader = tHeaderArr;
                  let filterVal = filterArr;
                  let list = dataList;
                  console.log( filterVal );
                  let data = _this.formatJson( filterVal, list );
                  export_json_to_excel( tHeader, data, excelTitle );
            } )
      }, formatJson(filterVal, jsonData) {
            // jsonData.map( function(v){
            //       console.log(v);
            //       return filterVal.map( function(j){
            //             console.log(j);
            //             return v[j];
            //       } )
            // } );
            return jsonData.map( v => filterVal.map( j => v[j] ) )
      }
};
export default export2Excel;