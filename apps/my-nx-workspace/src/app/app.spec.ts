import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('GET /', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('should return a message', async () => {
    // Mock the GET request
    mock.onGet('http://localhost:3000/').reply(200, { message: 'Hello API' });

    const res = await axios.get('http://localhost:3000/');

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});
