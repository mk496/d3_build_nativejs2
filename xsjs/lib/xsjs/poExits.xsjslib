/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0, camelcase:0 */
/*eslint-env node, es6 */
function po_create_before_exit(param) {
    $.trace.error("Start of Exit");
    var after = param.afterTableName;
    var pStmt = null;
    var poid = "";
   
    try {
        pStmt = param.connection
        		 .prepareStatement(`select "purchaseOrderSeqId".NEXTVAL 
        		                      from "DUMMY"`);
        var rs = pStmt.executeQuery();
        while (rs.next()) {
           	poid = rs.getInteger(1);
        }
        $.trace.error(poid);
        pStmt.close();

        pStmt = param.connection.prepareStatement(`UPDATE "${after}" 
                                                      SET PURCHASEORDERID = ?`);
        pStmt.setInteger(1, poid);
        pStmt.execute();
        pStmt.close();
    } catch (e) {
    	$.trace.error(e.message);
        pStmt.close();
    }

}

function po_create(param){
	$.trace.error("Insert");
}