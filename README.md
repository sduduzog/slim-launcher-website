slimlauncher.com

## Build

Use the Node.js version in `.node-version`, then run:

```sh
npm ci
npm run build
```

The static site is generated in `dist/`. Commit `package-lock.json` when
dependencies change so local and Cloudflare builds use the same versions.

Tailwind CSS 1 is configured directly through Nuxt's PostCSS pipeline to preserve
the existing styles without the legacy Nuxt Tailwind module.

## Cloudflare Pages

Connect this repository to a **Pages** project with these settings:

- Production branch: `master`
- Root directory: repository root
- Build command: `npm run build`
- Build output directory: `dist`

The committed `.node-version` and npm lockfile configure the runtime and dependency
installation. If automatic installation still selects Bun, set the build variable
`SKIP_DEPENDENCY_INSTALL=true` and use `npm ci && npm run build` as the build command.

Check the home page and `/privacy` on the preview domain before attaching
`slimlauncher.com` under the project's custom domains.
