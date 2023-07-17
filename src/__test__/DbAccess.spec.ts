
import { Connection, Result } from "db-conn";
import { DbAccess } from "../DbAccess.js";



let mockExecute=jest.fn().mockResolvedValue('test');
let mockExecuteQuery=jest.fn()

const mockConn = {} as Connection;
mockConn.execute=mockExecute;
mockConn.executeQuery=mockExecuteQuery;

beforeEach(() => {
	mockExecute.mockClear();
	mockExecuteQuery.mockClear();
});

test('select', async () => {
	const oTest = new DbAccess();

	const id = {
		id: 100
	}
	await oTest.select(mockConn,"TEST", id);
	expect(mockExecuteQuery).toBeCalledTimes(1);
	expect(mockExecuteQuery.mock.calls[0][0]).toStrictEqual(`select * from "TEST" where "id"=?`);
	expect(mockExecuteQuery.mock.calls[0][1]).toStrictEqual([100]);
});
test('insert', async () => {
	const oTest = new DbAccess();
	const o = {
		a:1,
		b:2
	};
	await oTest.insert(mockConn,"TEST", o);
	expect(mockExecute).toBeCalledTimes(1);
	expect(mockExecute.mock.calls[0][0]).toStrictEqual(`insert into "TEST"("a","b") values (?,?)`);
	expect(mockExecute.mock.calls[0][1]).toStrictEqual([1,2]);
});
test('update', async () => {
	mockExecute.mockResolvedValue({affectedRows:1});
	const oTest = new DbAccess();
	const o = {
		a:1,
		b:2
	};
	const id = {
		id: 100
	}
	await oTest.update(mockConn,"TEST", id, o);
	expect(mockExecute).toBeCalledTimes(1);
	expect(mockExecute.mock.calls[0][0]).toStrictEqual(`update "TEST" set "a"=?,"b"=? where "id"=?`);
	expect(mockExecute.mock.calls[0][1]).toStrictEqual([1,2, 100]);
});
test('update failed', async () => {
	mockExecute.mockResolvedValue({affectedRows:0});
	const oTest = new DbAccess();
	const o = {
		a:1,
		b:2
	};
	const id = {
		id: 100
	}
	let error = false;
	try {
		await oTest.update(mockConn,"TEST", id, o);
	} catch {
		error = true;
	}
	expect(error).toStrictEqual(true);
	expect(mockExecute).toBeCalledTimes(1);
	expect(mockExecute.mock.calls[0][0]).toStrictEqual(`update "TEST" set "a"=?,"b"=? where "id"=?`);
	expect(mockExecute.mock.calls[0][1]).toStrictEqual([1,2, 100]);
});
test('delete', async () => {
	const oTest = new DbAccess();

	const id = {
		id: 100
	}
	await oTest.delete(mockConn,"TEST", id);
	expect(mockExecute).toBeCalledTimes(1);
	expect(mockExecute.mock.calls[0][0]).toStrictEqual(`delete from "TEST" where "id"=?`);
	expect(mockExecute.mock.calls[0][1]).toStrictEqual([100]);
});