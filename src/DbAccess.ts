import { SqlAccess } from "./SqlAccess.js";
import { Connection } from "db-conn";
export class DbAccess extends SqlAccess{
	public async insert(conn: Connection, table: string, o: object) {
        const sql = this.sqlInsert(table, o);
		const params = this.params(o);
		await conn.execute(sql,params);
	}
	public async select(conn: Connection, table: string, id: object): Promise<object> {
		const sql = this.sqlSelect(table, id);
		const params = this.params(id);
		const rt = await conn.executeQuery(sql, params);
        return rt;
	}
	public async delete(conn: Connection, table: string, id: object) {
		const sql = this.sqlDelete(table, id);
		const params = this.params(id);
		const rt = await conn.execute(sql, params);
	}
	public async update(conn: Connection, table: string, id: object, value:object){
		const sql = this.sqlUpdate(table, id, value);
		const params = this.sqlUpdateParams(id, value);
		const rt = await conn.execute(sql, params);
		if (rt.affectedRows !=1) {
			throw new Error("Update failed")
		}
	}
}