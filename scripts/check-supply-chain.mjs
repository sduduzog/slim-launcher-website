import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const manifest = JSON.parse(read('package.json'))
const lock = JSON.parse(read('package-lock.json'))
const exactVersion = /^\d+\.\d+\.\d+$/

assert.equal(lock.lockfileVersion, 3, 'Use the committed npm v3 lockfile')
for (const section of ['dependencies', 'devDependencies']) {
  assert.deepEqual(
    manifest[section],
    lock.packages[''][section],
    `${section} must match the lockfile`,
  )
  for (const [name, version] of Object.entries(manifest[section])) {
    assert.match(version, exactVersion, `${name} must use an exact release`)
    assert.equal(
      lock.packages[`node_modules/${name}`]?.version,
      version,
      `${name} must resolve to its pinned release`,
    )
  }
}

assert.equal(manifest.engines.node, read('.node-version').trim())
assert.match(manifest.engines.node, exactVersion)
assert.match(manifest.engines.npm, exactVersion)
assert.equal(manifest.packageManager, `npm@${manifest.engines.npm}`)
for (const setting of [
  'registry=https://registry.npmjs.org/',
  'save-exact=true',
  'package-lock=true',
  'engine-strict=true',
  'ignore-scripts=true',
]) {
  assert(
    read('.npmrc').split(/\r?\n/).includes(setting),
    `Required npm setting missing: ${setting}`,
  )
}

for (const [path, entry] of Object.entries(lock.packages)) {
  if (!path) continue
  assert(!entry.link, `${path}: local links are not allowed`)
  // Bundled packages are covered by their containing package's integrity hash.
  if (entry.inBundle) continue
  assert(
    entry.resolved?.startsWith('https://registry.npmjs.org/'),
    `${path}: dependencies must come from the npm HTTPS registry`,
  )
  assert.match(
    entry.integrity ?? '',
    /^sha512-/,
    `${path}: missing SHA-512 integrity`,
  )
}

const workflowDirectory = new URL('../.github/workflows/', import.meta.url)
for (const file of readdirSync(workflowDirectory)) {
  if (!/\.ya?ml$/.test(file)) continue
  const content = readFileSync(new URL(file, workflowDirectory), 'utf8')
  for (const match of content.matchAll(/^\s*(?:-\s*)?uses:\s*(\S+)/gm)) {
    assert.match(
      match[1],
      /^[\w.-]+\/[\w./-]+@[a-f0-9]{40}$/,
      `${file}: actions must use full commit SHAs`,
    )
  }
}

console.log(
  'Dependency versions, lockfile sources, runtime pins, and action SHAs verified.',
)
