/**
 * Post-build: finish the SPA fallback that public/_redirects and
 * public/.htaccess start.
 *
 * Some static hosts have no rewrite configuration at all and simply serve
 * 404.html for any path they can't resolve. Handing them a copy of index.html
 * makes that the third fallback layer, so a refresh on /journey renders the app
 * instead of an error page.
 *
 * This can't be a file in public/: that copy would be the pre-build template,
 * still pointing at /src/main.jsx. The asset URLs in index.html are only
 * rewritten to their hashed dist/assets/* names during the build, so the copy
 * has to be taken afterwards.
 */
import { copyFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const index = resolve(dist, 'index.html')

if (!existsSync(index)) {
  console.error('[spa-fallback] dist/index.html not found — did `vite build` run?')
  process.exit(1)
}

copyFileSync(index, resolve(dist, '404.html'))

// Vite copies public/ into dist/, but dotfiles are easy to lose to a stray
// glob or an upload client that hides them. Verify rather than assume: a
// silently missing .htaccess is exactly the 404 bug coming straight back.
const expected = ['404.html', '_redirects', '.htaccess']
const missing = expected.filter((f) => !existsSync(resolve(dist, f)))

if (missing.length > 0) {
  console.error(`[spa-fallback] missing from dist/: ${missing.join(', ')}`)
  process.exit(1)
}

console.log(`[spa-fallback] dist/ contains ${expected.join(', ')}`)
