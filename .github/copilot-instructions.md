Project snapshot
- Laravel 12 backend (PHP 8.2). Frontend uses Inertia + React + Vite.
- Server side code lives under `app/` (HTTP controllers in `app/Http/Controllers`, models in `app/Models`, Events/Notifications in `app/Events` and `app/Notifications`).
- Frontend source is `resources/js/` with pages under `resources/js/app/pages` and shared components in `resources/js/app/components`.

What I'm allowed to edit
- Code, docs, tests, build scripts inside this repository. Avoid changing production secrets or CI credentials (.env and secrets are not in repo).

Key commands (run from repo root, Windows PowerShell)
- Install PHP deps: composer install
- Install JS deps: npm ci
- Start dev environment (concurrent): composer run-script dev
  - Equivalent parts: `php artisan serve`, `php artisan queue:listen`, `php artisan pail`, `npm run dev`
- Vite dev: npm run dev
- Vite build: npm run build
- Run tests: vendor/bin/pest or ./vendor/bin/pest on Unix-like shells

Useful files & patterns
- `composer.json` — dependency matrix, dev scripts (see `dev` script that runs concurrently).
- `package.json` & `vite.config.js` — frontend build; uses `laravel-vite-plugin` and React plugin. Keep ESM `type: "module"` in mind when editing JS configs.
- `routes/` — app routes split across `web.php`, `api.php`, `auth.php`, and `channels.php`.
- `resources/js/app` — inertia entry points, page routing and layouts.
  - Pages follow nested folders matching route structure, e.g. `resources/js/app/pages/users/*`.
  - Components often use Tailwind and Ant Design; prefer existing utility classes and shared UI primitives in `resources/js/app/components`.
- `app/Http/Controllers` — controllers return Inertia responses (server-driven SPA patterns). Search for `Inertia::render`.
- Jobs/Queues — the codebase uses queues (`php artisan queue:listen` in dev) and `app/Events`/`app/Notifications` for broadcasts.

Coding conventions & gotchas
- PHP: PSR-4 autoloading is used. Types and PHP 8.2 features are available; prefer native types where present.
- JS/React: project uses ESM modules (package.json `type: "module"`) and React 18. Respect default exports used across pages.
- Frontend routing: Inertia replaces client-side routing — many pages are server-backed. When adding pages, register routes in `routes/web.php` and create the matching folder/file in `resources/js/app/pages` that Inertia will resolve.
- Assets and images: public assets are in `public/` and referenced with `/images/...` or via Vite static import when inside `resources/`.
- Environment: .env controls DB, queue, and broadcast (Pusher). Avoid hardcoding credentials.

Tests & quality
- Tests use Pest (see `phpunit.xml` and `tests/`). Run `vendor/bin/pest` for quick feedback.
- PHP linting and formatting: `laravel/pint` is present as a dev dependency.

Integration points
- Pusher/Laravel Echo: check `resources/js` for Echo usage and `composer.json` for `pusher/pusher-php-server`.
- AWS S3 via Flysystem: see `league/flysystem-aws-s3-v3` in composer.json and `config/filesystems.php`.
- Stripe and Twilio SDKs are included; search `app/Services` or usages in controllers and jobs.

When editing pull requests
- Keep changes minimal and focused. Run `composer install`, `npm ci`, and `vendor/bin/pest` locally.
- For frontend changes, run `npm run dev` and inspect Inertia responses in browser.
- If touching build configs, preserve `type: "module"` and `laravel-vite-plugin` usage.

Examples (where to look)
- Inertia controllers: search `Inertia::render` in `app/Http/Controllers`.
- Page layout pattern: `resources/js/app/layouts/` and `resources/js/app/pages/*`.
- Queue jobs and listeners: `app/Jobs`, `app/Listeners`, and `app/Events`.

If something isn't discoverable
- Ask a targeted question (which file handles X, which env variable sets Y). Provide file path examples and tests to run.

Stay conservative: prefer reading nearby files and following existing patterns rather than introducing new tooling or large refactors.
