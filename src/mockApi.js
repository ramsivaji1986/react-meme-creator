import customerTableMock from "./mockTable";

export default function mockApi(mock) {
  mock.onGet("api/images/").reply((config) => {
    const customer = customerTableMock;
    if (!customer) {
      return [400];
    }

    return [200, customer];
  });
}
