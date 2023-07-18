//import { Connection } from "db-conn";

export class SqlAccess {
	public quoteChar: string = '"';

	/*  public async insert(conn:Connection, table:string, o:object) {
		  await conn.execute("1", ['a']);
		  await conn.execute("2", ['b']);
		  return ;
	  }*/
	public params(o: object): any[] {
		const rt = [];
		for (const field in o) {
			rt.push(o[field]);
		}
		return rt;
	}
	public sqlInsert(table: string, o: object): string {
		const fields = this.sqlFieldsList(o);
		const params = this.sqlParams(o);
		const sql = `insert into ${this.quote(table)}(${fields}) values (${params})`;
		return sql;
	}
	public sqlSelect(table: string, id: object): string {
		const condition = this.sqlFieldEqualParamList(id," and ");
		const sql = `select * from ${this.quote(table)} where ${condition}`;
		return sql;
	}
	public sqlDelete(table: string, id: object): string {
		const condition = this.sqlFieldEqualParamList(id," and ");
		const sql = `delete from ${this.quote(table)} where ${condition}`;
		return sql;
	}
	public sqlUpdate(table: string, id: object, value:object): string {
		const condition = this.sqlFieldEqualParamList(id," and ");
		const params = this.sqlFieldEqualParamList(value,",");
		const sql = `update ${this.quote(table)} set ${params} where ${condition}`;
		return sql;
	}
	public sqlUpdateParams(id: object, value:object): any[] {
		const p1 = 	this.params(value);
		const p2  = this.params(id);
		const rt = p1.concat(p2)
		return rt;
	}
	private sqlFieldEqualParamList(id: object, sep: string) {
		let rt = "";
		for (const field in id) {
			rt = rt + `${this.quote(field)}=?${sep}`;
		}

		rt = rt.substring(0, rt.length - sep.length);
		return rt;
	}

	private quote(name: string): string {
		return this.quoteChar + name + this.quoteChar;
	}
	private sqlParams(o: object) {
		let rt = "";
		for (const field in o) {
			rt = rt + "?,";
		}

		rt = rt.substring(0, rt.length - 1);
		return rt;
	}

	private sqlFieldsList(o: object) {
		let rt = "";
		for (const field in o) {
			rt = rt + this.quote(field) + ",";
		}

		rt = rt.substring(0, rt.length - 1);
		return rt;
	}
}