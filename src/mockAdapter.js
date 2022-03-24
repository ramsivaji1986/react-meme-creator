import MockAdapter from "axios-mock-adapter";
import mockApi from "./mockApi";

export function mockAxios(axios) {
  const mock = new MockAdapter(axios, { delayResponse: 300 });

  // mockAuth(mock);
  mockApi(mock);

  return mock;
}
