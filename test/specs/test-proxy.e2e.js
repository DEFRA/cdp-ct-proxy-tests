import { ProxyAgent, fetch as undiciFetch } from 'undici'

const proxyFetch = (url, opts) => {
  return undiciFetch(url, {
    ...opts,
    dispatcher: new ProxyAgent({
      uri: 'http://localhost:3128',
      keepAliveTimeout: 10,
      keepAliveMaxTimeout: 10
    })
  })
}

describe('Proxy calls from test suite', () => {
  it('Should be able to make proxied fetch calls from inside the test suite', async () => {
    const res = await proxyFetch('https://api.github.com/', {
      method: 'GET'
    })
    expect(res.status).toBe(200)
  })

  it('Should make internal calls via the proxy', async () => {
    const env = process.env.ENVIRONMENT || 'infra-dev'
    const res = await proxyFetch(
      `https://cdp-example-node-backend.${env}.cdp-int.defra.cloud/health`,
      { method: 'GET' }
    )
    expect(res.status).toBe(200)
  })

  it('Should make internal calls without the proxy', async () => {
    const env = process.env.ENVIRONMENT || 'infra-dev'
    const res = await undiciFetch(
      `https://cdp-example-node-backend.${env}.cdp-int.defra.cloud/`,
      { method: 'GET' }
    )
    expect(res.status).toBe(200)
  })
})
