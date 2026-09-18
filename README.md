# Slim Launcher website

[slimlauncher.com](https://slimlauncher.com) is a static Nuxt 4 / Vue 3 site.
The home page and privacy policy are prerendered and hosted with Cloudflare
Workers Static Assets. No application server, Worker script, or database runs
in production.

## Development

Use Node.js **24.18.0** from `.node-version` and npm **11.11.0**.
The project enforces these exact versions to keep local, CI, and hosting installs
consistent:

```sh
npm ci
npm run setup
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
npm run browsers:install
npm run check
npm run audit
```

`check` verifies dependency/runtime pins, lockfile sources and integrity metadata,
and immutable Action references, then runs ESLint, Prettier, type checking, static generation, a Wrangler deploy
dry run, and browser tests against the local Cloudflare runtime.
CI runs these checks plus an npm advisory audit on pushes to `master`, pull
requests, and weekly so newly reported vulnerabilities are detected without a code
change. The tests cover
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

All direct dependencies use exact versions; the npm v3 lockfile pins transitive
dependencies and their integrity hashes. `.npmrc` enables exact saves, enforces
the toolchain versions, and disables automatic lifecycle scripts, including
dependency `preinstall`, `install`, and `postinstall` hooks. `npm run setup`
explicitly generates Nuxt's editor types; builds and lint also prepare Nuxt as
needed. Keep optional dependencies enabled: native build tools use their
platform-specific packages instead of install-script downloads.

Use `npm ci` in CI/hosting. To update a dependency, choose a reviewed release and
run `npm install --save-exact package-name@version` (add `--save-dev` for tooling),
then commit both manifests after `npm run check` and `npm run audit` pass.
Do not bypass `ignore-scripts` globally to make an update install. If a dependency
needs an install hook, review that code and its downloads before explicitly
running it or choosing an alternative.

Dependabot groups minor/patch npm updates and opens major updates separately.
It also updates the full commit SHA pins on GitHub Actions. Keep the version
comments beside these pins for readability; do not replace them with mutable
tags. CI uses a read-only token, does not persist checkout credentials, and has a
job timeout. Browser installation uses the locked local CLI, not an `npx`
fallback that could download an unreviewed package.

Require the `validate` CI job and human review through GitHub branch protection;
enable Dependabot alerts and security updates in GitHub settings as well.
These repository-level controls require configuration on GitHub; committing this
workflow does not enable them. This repository does not enable auto-merge.
Major Nuxt, Vue, and Tailwind upgrades
need migration review rather than a blind dependency bump. Close obsolete Nuxt 2
upgrade PRs after this migration lands.

Review the weekly audit results in context: this project deploys static files, but
build-tool vulnerabilities can still affect CI and development. Do not use
`npm audit fix --force` to bypass compatibility review. Pinning and integrity
verification prevent unexpected resolution changes, not malicious code already
present in an approved release. Audits cover known advisories, not every possible
compromise; reviewed dependencies still execute during builds.
