# SendDock Documentation

This is the official documentation site for SendDock, built with [Docusaurus](https://docusaurus.io/).

## 🌐 Multi-language Support

The documentation is available in:
- **English** (default): `/en/`
- **Spanish**: `/es/`

## Installation

```bash
npm install
# or
yarn
```

## Local Development

```bash
npm start
# or
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

To start with Spanish locale:

```bash
npm start -- --locale es
```

## Build

```bash
npm run build
# or
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## 📁 Project Structure

```
docs-website/
├── docs/                          # English documentation
│   ├── intro.md
│   ├── api-reference/             # API documentation
│   ├── guides/                    # Usage guides
│   └── deployment/                # Deployment guides
├── i18n/
│   └── es/                        # Spanish translations
│       └── docusaurus-plugin-content-docs/
│           └── current/           # Spanish documentation
├── src/
│   ├── components/
│   ├── css/
│   └── pages/
├── static/
│   └── img/
├── docusaurus.config.ts           # Main configuration
└── sidebars.ts                    # Sidebar configuration
```

## 📝 Adding New Documentation

### English Documentation

1. Add your `.md` file to `docs/`
2. Update `sidebars.ts` if needed

### Spanish Translation

1. Create the corresponding file in `i18n/es/docusaurus-plugin-content-docs/current/`
2. Keep the same filename and folder structure

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
