import { expect, test } from '@playwright/test'

const sourceUrl = 'https://github.com/sduduzog/slim-launcher'
const policy = [
  'This policy covers the Slim Launcher Android app, maintained by Sdu (sduduzog).',
  'Slim Launcher has no internet permission, accounts, analytics, advertising, or telemetry.',
  'It does not send your launcher data to the developer or sell or share it with third parties.',
  'Slim Launcher reads the apps available in your personal and work profiles so you can find, select, and launch them.',
  'It stores your selected apps, their names and launch identifiers, profile identifiers, custom labels, and display order in a local database.',
  "These records are used only for launcher features and are protected by Android's app-private storage.",
  'The app requests the Ubuntu font from Google Play services, which may download it.',
  "Clear Slim Launcher's storage in Android settings or uninstall it to remove its local app data.",
  'The app disables Android cloud backup; device-to-device transfers may still depend on your device manufacturer and Android version.',
  'The developer holds no server copy of your launcher data.',
  'Posts are public: do not include personal or sensitive information.',
  'Slim Launcher is open source. You can review the code to see how it works.',
]

test('home page preserves links, images, metadata, and responsive layout', async ({
  page,
}, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error' || /hydration/i.test(message.text())) {
      errors.push(message.text())
    }
  })

  await page.goto('/')
  await expect(page).toHaveTitle('Slim launcher')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Less distraction, more life - a minimalist launcher for your android phone',
  )
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'A minimalist launcher that only allows you to use fewer apps on your phone',
  )
  await expect(
    page.getByRole('link', { name: 'Google Play badge' }),
  ).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=com.sduduzog.slimlauncher',
  )
  await expect(
    page.getByRole('link', { name: 'F-droid badge' }),
  ).toHaveAttribute(
    'href',
    'https://f-droid.org/en/packages/com.sduduzog.slimlauncher',
  )
  await expect(
    page.getByRole('link', { name: 'Slim Launcher on GitHub' }),
  ).toHaveAttribute('href', sourceUrl)
  await expect(
    page.getByRole('link', { name: 'Sdu', exact: true }),
  ).toHaveAttribute('href', 'https://iamsdu.online')
  await expect(page.getByRole('link', { name: 'community' })).toHaveAttribute(
    'href',
    `${sourceUrl}/graphs/contributors`,
  )
  await expect(page.locator('img')).toHaveCount(4)
  for (const image of await page.locator('img').all()) {
    await expect(image).toBeVisible()
    await expect
      .poll(() =>
        image.evaluate((node) => node.complete && node.naturalWidth > 0),
      )
      .toBe(true)
  }

  const screenshot = page.getByAltText('Home screen screenshot')
  await expect(screenshot).toHaveCSS('width', '256px')
  await expect(screenshot).toHaveCSS(
    'box-shadow',
    /rgba\(0, 0, 0, 0\.25\) 0px 25px 50px -12px$/,
  )
  await expect(page.locator('header')).toHaveCSS('height', '64px')
  const viewport = page.viewportSize()!
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS(
    'line-height',
    viewport.width < 1024 ? '36px' : '45px',
  )
  const imageBox = await screenshot.boundingBox()
  const headingBox = await page.getByRole('heading', { level: 1 }).boundingBox()
  expect(imageBox).not.toBeNull()
  expect(headingBox).not.toBeNull()
  if (viewport.width < 1024) {
    expect(imageBox!.y + imageBox!.height).toBeLessThan(headingBox!.y)
  } else {
    expect(imageBox!.x).toBeGreaterThanOrEqual(
      headingBox!.x + headingBox!.width,
    )
  }
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(viewport.width)
  await page.screenshot({
    path: testInfo.outputPath('home.png'),
    fullPage: true,
  })

  await page.getByRole('link', { name: 'Privacy Policy' }).click()
  await expect(page).toHaveURL('/privacy')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Privacy Policy',
  )
  await expect(page).toHaveTitle('Privacy Policy | Slim Launcher')
  await page.getByRole('link', { name: 'Slim Launcher home' }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'A minimalist launcher',
  )
  expect(errors).toEqual([])
})

test('privacy route and assets work on direct load and refresh', async ({
  page,
}, testInfo) => {
  for (const route of ['/privacy', '/privacy/']) {
    const response = await page.goto(route)
    expect([200, 304]).toContain(response?.status())
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Privacy Policy',
    )
    for (const text of policy) {
      await expect(page.getByRole('main')).toContainText(text)
    }
    await expect(page.getByRole('main')).not.toContainText(
      /email address|phone number|geographic location|ticker around/i,
    )
    await expect(
      page.getByRole('link', { name: 'open source', exact: true }),
    ).toHaveAttribute('href', sourceUrl)
    await expect(
      page.getByRole('link', { name: 'GitHub Issues' }),
    ).toHaveAttribute('href', `${sourceUrl}/issues`)
    await expect(
      page.getByRole('link', { name: "Google's privacy policy" }),
    ).toHaveAttribute('href', 'https://policies.google.com/privacy')
    const logo = page.getByAltText('Slim logo')
    await expect(logo).toHaveAttribute('src', '/img/slim-logo.jpg')
    await expect
      .poll(() => logo.evaluate((node) => node.naturalWidth))
      .toBeGreaterThan(0)
    expect([200, 304]).toContain((await page.reload())?.status())
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Privacy Policy',
    )
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(page.viewportSize()!.width)
  }
  await page.screenshot({
    path: testInfo.outputPath('privacy.png'),
    fullPage: true,
  })
})

test('both pages and navigation work without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  })
  const page = await context.newPage()
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'A minimalist launcher',
  )
  await page.getByRole('link', { name: 'Privacy Policy' }).click()
  for (const text of policy) {
    await expect(page.getByRole('main')).toContainText(text)
  }
  await page.getByRole('link', { name: 'Slim Launcher home' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'A minimalist launcher',
  )
  await context.close()
})

test('keyboard navigation can reach the policy and return home', async ({
  page,
  browserName,
}) => {
  await page.goto('/')
  // Safari on macOS uses Option-Tab to include links in keyboard navigation.
  const tabKey =
    browserName === 'webkit' && process.platform === 'darwin'
      ? 'Alt+Tab'
      : 'Tab'
  for (let tab = 0; tab < 7; tab++) {
    await page.keyboard.press(tabKey)
  }
  await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Privacy Policy',
  )
  await page.getByRole('link', { name: 'Slim Launcher home' }).focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL('/')
})

test('static server returns a real 404 instead of the home page', async ({
  request,
  page,
}) => {
  const response = await request.get('/this-page-does-not-exist')
  expect(response.status()).toBe(404)
  expect(await response.text()).not.toContain(
    'A minimalist launcher that only allows you to use fewer apps',
  )
  await page.goto('/this-page-does-not-exist')
  await expect(
    page.getByRole('heading', { name: 'Page not found', exact: true }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Return to the home page' }).click()
  await expect(page).toHaveURL('/')
})

test('privacy uses static HTML and canonical URLs', async ({ request }) => {
  const response = await request.get('/privacy')
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('text/html')
  expect(await response.text()).toContain(
    'Slim Launcher has no internet permission, accounts, analytics,',
  )

  const redirect = await request.get('/privacy/', { maxRedirects: 0 })
  expect(redirect.status()).toBe(307)
  expect(redirect.headers().location).toBe('/privacy')
})

test('public assets return their actual file types', async ({ request }) => {
  for (const [path, contentType] of [
    ['/img/slim-logo.jpg', 'image/jpeg'],
    ['/img/screenshot-min.png', 'image/png'],
    ['/img/google-play-badge.png', 'image/png'],
    ['/img/badge_get-it-on-en-us.png', 'image/png'],
  ] as const) {
    const response = await request.get(path)
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain(contentType)
  }
  expect((await request.get('/favicon.ico')).status()).toBe(200)
})
