import { SqlAccess } from "../SqlAccess.js";



test('insert', async () => {
	const oTest = new SqlAccess();
	const o = { field1:1, field2:2};
	const sql = oTest.sqlInsert("TEST", o);
	const params = oTest.params(o);
	expect(sql).toStrictEqual(`insert into "TEST"("field1","field2") values (?,?)`);
	expect(params).toStrictEqual([1,2]);
});
test('select', async () => {
	const oTest = new SqlAccess();
	const o = { field1:1, field2:2};
	const sql = oTest.sqlSelect("TEST", o);
	const params = oTest.params(o);
	expect(sql).toStrictEqual(`select * from "TEST" where "field1"=? and "field2"=?`);
	expect(params).toStrictEqual([1,2]);
});
test('delete', async () => {
	const oTest = new SqlAccess();
	const o = { field1:1, field2:2};
	const sql = oTest.sqlDelete("TEST", o);
	const params = oTest.params(o);
	expect(sql).toStrictEqual(`delete from "TEST" where "field1"=? and "field2"=?`);
	expect(params).toStrictEqual([1,2]);
});

test('update', async () => {
	const oTest = new SqlAccess();
	const ids = { field1:1, field2:2};
	const values = { field3:3, field4:4};
	const sql = oTest.sqlUpdate("TEST", ids, values);
	const params = oTest.sqlUpdateParams(ids, values);
	expect(sql).toStrictEqual(`update "TEST" set "field3"=?,"field4"=? where "field1"=? and "field2"=?`);
	expect(params).toStrictEqual([3,4,1,2]);
});