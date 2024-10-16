import { browser, expect } from '@wdio/globals'

describe('Chrome Proxy', () => {
  it('Should open pages outside the platform via the proxy', async () => {
    await browser.url('https://example.com')
    await expect(browser).toHaveTitle('Example Domain')
  })

  it('Should open http pages outside the platform via the proxy', async () => {
    await browser.url('http://example.com')
    await expect(browser).toHaveTitle('Example Domain')
  })

  it('Should fail to open a page outside the platform that isnt permitted by the proxy', async () => {
    await browser.url('https://www.google.com')
    // This will fail
    await expect(browser).toHaveTitle('Google')
  })
})
