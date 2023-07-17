import { SqlAccess } from "../SqlAccess.js";



test('insert', async () => {
	const oTest = new SqlAccess();
	const o = { field1:1, field2:2};
	const sql = oTest.sqlInsert("TEST", o);
	const params = oTest.params(o);
	expect(sql).toStrictEqual(`insert into "TEST"("field1","field2") values (?,?)`);
	expect(params).toStrictEqual([1,2]);
});