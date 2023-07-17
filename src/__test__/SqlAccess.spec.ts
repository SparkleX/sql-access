
import { DummyConnection } from "db-conn";
import { SqlAccess } from "../SqlAccess.js";

const mockExecute = jest.fn();
jest.mock('db-conn',() => {
	return {
		DummyConnection: jest.fn().mockImplementation(() => {
		return {
			execute: mockExecute
		}
	  }),
	}});


test('test', async () => {
	const oTest = new SqlAccess();
	const conn = new DummyConnection();
	const o = {};
	await oTest.insert(conn,"", o);
	expect(mockExecute).toBeCalledTimes(2);
	expect(mockExecute.mock.calls[0]).toEqual(["1", ['a']]);
	expect(mockExecute.mock.calls[1]).toEqual(["2", ['b']]);
	expect(1).toBe(1);
});