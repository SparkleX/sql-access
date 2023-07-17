export class SqlAccess {
    private quoteChar: string = '"';

    public insertSql(table:string, o:object):string {
        const fields = this.sqlFieldsList(o);
        const params = this.sqlParams(o);
        const sql = `insert into ${this.quote(table)}(${fields}) values (${params})`;
        return sql;
    }


    private quote(name: string): string {
        return this.quoteChar + name + this.quoteChar;
    }
    private sqlParams(o:object) {
        let rt = "";
        for (const field in o) {
            rt = rt + "?,";
        }

        rt = rt.substring(0, rt.length - 1);
        return rt;
    }

    private sqlFieldsList(o:object) {
        let rt = "";
        for (const field in o) {
            rt = rt + this.quote(field) + ",";
        }

        rt = rt.substring(0, rt.length - 1);
        return rt;
    }
}