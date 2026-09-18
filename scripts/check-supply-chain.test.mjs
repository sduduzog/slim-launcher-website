import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

const root = new URL('../', import.meta.url)

const cases = [
  ['current configuration passes', null, true],
  [
    'rejects version ranges',
    (files) => {
      const manifest = JSON.parse(files['package.json'])
      manifest.dependencies.nuxt = '^4.5.2'
      files['package.json'] = JSON.stringify(manifest)
    },
    false,
  ],
  [
    'rejects mutable action tags',
    (files) => {
      files['.github/workflows/ci.yml'] = '- uses: actions/checkout@v6'
    },
    false,
  ],
  [
    'rejects lifecycle script opt-in',
    (files) => {
      files['.npmrc'] = files['.npmrc'].replace(
        'ignore-scripts=true',
        'ignore-scripts=false',
      )
    },
    false,
  ],
  [
    'rejects untrusted package sources',
    (files) => {
      const lock = JSON.parse(files['package-lock.json'])
      lock.packages['node_modules/nuxt'].resolved =
        'https://example.com/nuxt.tgz'
      files['package-lock.json'] = JSON.stringify(lock)
    },
    false,
  ],
  [
    'rejects missing integrity',
    (files) => {
      const lock = JSON.parse(files['package-lock.json'])
      delete lock.packages['node_modules/nuxt'].integrity
      files['package-lock.json'] = JSON.stringify(lock)
    },
    false,
  ],
]

for (const [name, mutate, succeeds] of cases) {
  test(name, () => {
    const directory = mkdtempSync(join(tmpdir(), 'slim-supply-chain-'))
    try {
      const files = Object.fromEntries(
        [
          'package.json',
          'package-lock.json',
          '.node-version',
          '.npmrc',
          '.github/workflows/ci.yml',
          'scripts/check-supply-chain.mjs',
        ].map((file) => [file, readFileSync(new URL(file, root), 'utf8')]),
      )
      mutate?.(files)
      mkdirSync(join(directory, 'scripts'))
      mkdirSync(join(directory, '.github/workflows'), { recursive: true })
      for (const [path, content] of Object.entries(files)) {
        writeFileSync(join(directory, path), content)
      }
      const result = spawnSync(
        process.execPath,
        [join(directory, 'scripts/check-supply-chain.mjs')],
        { encoding: 'utf8' },
      )
      assert.ifError(result.error)
      assert.equal(result.status, succeeds ? 0 : 1, result.stderr)
    } finally {
      rmSync(directory, { recursive: true, force: true })
    }
  })
}
