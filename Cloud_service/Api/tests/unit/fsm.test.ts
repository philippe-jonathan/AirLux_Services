import { describe, expect, beforeAll, test } from '@jest/globals';
import { FSM } from "./../../src/fsm/fsm";

let fsm : FSM;

describe('Testing fsm class', () => {
  let string = `tocloud//captor_values//{"captor_id": "0001", "value": "23", "created_at": "${new Date().getTime()}"}//insert`;
  
  describe('Normal creation', () => {
    beforeAll(async () => {
      
      fsm = await new FSM()
      
      fsm.setContext(string);
      fsm.startFsm();

    });
    test('Should be done & sucess', () => {
      expect(fsm.context.done).toBe(true);
      expect(fsm.context.success).toBe(true);
    });
  });
  
  describe("Should be done but shouldn't be a sucess", () => {
    beforeAll(() => {
      string = `tocloud//captor_values//{"value": "23", "created_at": "${new Date().getTime()}"}//insert`;
      fsm.setContext(string);
      fsm.startFsm();

    });
    test('done = true', () => {
      expect(fsm.context.done).toBe(true);
    });
    test('success = false', () => {
      expect(fsm.context.success).toBe(false);
    });
  });
});
