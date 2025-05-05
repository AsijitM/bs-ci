import axios, { AxiosResponse } from 'axios';
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
    expect(res.data).toEqual({ message: 'Hello APIS' });
  });

  it('flaky test - sometimes fails due to timing', async () => {
    const randomDelay = Math.floor(Math.random() * 100);

    mock.onGet('http://localhost:3000/delayed').reply(async () => {
      await new Promise(resolve => setTimeout(resolve, randomDelay));
      return [200, { data: 'Delayed response' }];
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), 50)
    );

    try {
      const response = await Promise.race([
        axios.get<{ data: string }>('http://localhost:3000/delayed'),
        timeoutPromise
      ]) as AxiosResponse<{ data: string }>;

      expect(response.status).toBe(200);
      expect(response.data).toEqual({ data: 'Delayed response' });
    } catch (error) {
      fail('Request should not timeout');
    }
  });
});
