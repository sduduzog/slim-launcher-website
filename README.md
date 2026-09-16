# Slim Launcher website

[slimlauncher.com](https://slimlauncher.com) is a static Nuxt 4 / Vue 3 site.
The home page and privacy policy are prerendered and hosted with Cloudflare
Workers Static Assets. No application server, Worker script, or database runs
in production.

## Development

Use Node.js from `.node-version` and npm. The lint toolchain requires Node
24.15.0 or newer within the Node 24 release line:

```sh
npm ci
npm run dev
```

Pages and components live in `app/`; public images live in `public/img/` and are
referenced with root-relative `/img/...` URLs. Global styles use Tailwind CSS 4
through its Vite plugin. The original system-font stack, typography, and layout
are retained without the previously unused Google Fonts import.

Tailwind 4 requires modern browsers: Chrome 111+, Safari 16.4+, and Firefox 128+.
The build uses TypeScript 5.9 with `vue-tsc` for Vue template checking.

## Validation

```sh
npx playwright install chromium firefox webkit
npm run check
```

`check` runs ESLint, Prettier, type checking, static generation, a Wrangler deploy
dry run, and browser tests against the local Cloudflare runtime.
CI runs the same checks on pushes to `master` and pull requests. The tests cover
desktop/mobile layouts, direct loads and refreshes, working images and links,
privacy wording, keyboard navigation, no-JavaScript rendering, and 404 behavior.
Browser screenshots and failure traces are saved as CI artifacts.

To inspect a production build locally:

```sh
npm run build
npm run preview
```

The preview uses local Wrangler to serve `.output/public` at
`http://127.0.0.1:4173`, without a catch-all SPA rewrite or remote deployment.
Run `npm test` after building to rerun just the browser tests.

## Cloudflare Workers Static Assets

Use the existing `slim-launcher-website` **Workers** project with these build settings:

| Setting           | Value                          |
| ----------------- | ------------------------------ |
| Production branch | `master`                       |
| Root directory    | Repository root                |
| Build variable    | `SKIP_DEPENDENCY_INSTALL=true` |
| Build command     | `npm ci && npm run build`      |
| Deploy command    | `npm run deploy`               |

The `.node-version` file pins the build runtime and `package-lock.json` pins
dependency resolution, including Wrangler. Remove any dashboard `NODE_VERSION`
override that still selects an older Node release. Include dev dependencies when
building. Workers Builds provides deployment authentication; no credentials
belong in the repository.

The committed `wrangler.jsonc` deploys **only `.output/public`**. It intentionally
has no `main` entry point and no build hook: Cloudflare's build step already runs
`nuxt generate`, which produces no server entry point. Keep Nitro's `static`
preset. Do not run Wrangler's Nuxt auto-setup or change to `cloudflare-module`.
The explicit `--config wrangler.jsonc` in the deploy script also avoids selecting
an old generated `.wrangler/deploy/config.json` from a cached server build.

Do not restore the old `/* /index.html 200` redirect. `/privacy` serves the
prerendered policy, `/privacy/` redirects to `/privacy`, and unknown paths return
HTTP 404 using the generated `404.html`.

For a manual release after authenticating with Cloudflare:

```sh
npm run build
npm run deploy:check
npm run deploy
```

Before promoting the migration, confirm the preview uses the intended commit.
Check `/`, `/privacy`, `/privacy/`, and an unknown URL; verify images and download
links at desktop and mobile widths, including with JavaScript disabled. Only then
promote production or attach `slimlauncher.com` as a Worker custom domain.

Keep the last working production deployment available for Cloudflare rollback.
Dependabot branch builds are previews, not proof that `master` failed.

## Dependency updates

Commit the npm lockfile with dependency changes and use `npm ci` in CI/hosting.
Dependabot groups minor/patch npm updates and opens major updates separately.
Require the `validate` CI job and human review through GitHub branch protection;
this repository does not enable auto-merge. Major Nuxt, Vue, and Tailwind upgrades
need migration review rather than a blind dependency bump. Close obsolete Nuxt 2
upgrade PRs after this migration lands.

Review `npm audit` results in context: this project deploys static files, but
build-tool vulnerabilities can still affect CI and development. Do not use
`npm audit fix --force` to bypass compatibility review.
