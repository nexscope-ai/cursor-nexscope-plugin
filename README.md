# Nexscope for Cursor

Research ecommerce products, keywords, markets, competitors, and reviews from Cursor using [Nexscope](https://www.nexscope.ai).

This is a small Cursor Marketplace plugin: one research Skill and a connection to the existing Nexscope remote MCP service. It bundles no CLI, executable, hooks, or Canvas UI.

## Requirements

- A current Cursor version with plugin and remote MCP support.
- A Nexscope account with the permissions and credits required by the tools you use.
- Network access to Nexscope. Research calls may consume credits under your Nexscope plan; the plugin does not include service credits.

## Try it before marketplace publication

This repository is a listing candidate, not an approved Marketplace listing.

1. Download or clone this repository.
2. Copy its contents, including the hidden `.cursor-plugin` directory, into `~/.cursor/plugins/local/nexscope/`. On Windows this is `%USERPROFILE%\.cursor\plugins\local\nexscope\`. Copy the files directly into that folder, without an extra repository folder level. Do not use a symlink pointing outside the local plugins directory.
3. Restart Cursor or run **Developer: Reload Window**.
4. Open **Customize** and confirm that the Nexscope Skill and MCP server are discovered. If your organization disables local plugin imports, ask its administrator to permit a local test.
5. Use Cursor's MCP connection flow to sign in to Nexscope and approve the connection. Cursor manages OAuth credentials; no API key or local runtime is configured by this plugin.
6. Ask: **Which Nexscope tools can you use? List their names without running research.** Then try a research prompt below and review the tool inputs and potential credit use.

The MCP configuration reuses the existing service at `https://api.nexscope.ai/api/skill-api/v2/mcp`. The URL determines the remote HTTP transport. The public guide also documents `/mcp`; this plugin keeps the existing Codex MCP plugin's endpoint. No new backend service is deployed.

## Example requests

- Find Amazon US travel mugs for the keyword `insulated travel mug` and summarize the returned products. Tell me about credit use before running the query.
- Compare keywords for the competitor ASINs I provide, using the selected marketplace.
- Analyze reviews for this product and separate recurring complaints from positive feedback.
- Save the results already retrieved in this chat as a CSV in my workspace.

Available tools, marketplaces, required arguments, and results depend on the live Nexscope service and your account. The Skill reads the actual published schemas instead of bundling a stale tool catalog. Advertising mutations, workflow creation, and Research Canvas are outside this release's scope.

## Data and authentication

Research tool arguments are sent to Nexscope, and returned results become available to Cursor for the requested task. The service may query its data providers. Cursor handles the MCP connection and OAuth credentials. This repository contains no credentials, analytics code, or local credential store; the remote service has its own data handling and retention policies.

Never paste tokens, passwords, or API keys into chat, commit them to Git, or include them in exported results. Account authorization does not grant permission to send messages, purchase products, or alter advertising campaigns. After an uncertain paid call, check available status/results before retrying.

[Privacy policy](https://www.nexscope.ai/privacy) · [Terms of service](https://www.nexscope.ai/terms) · [MCP guide](https://www.nexscope.ai/mcp-map) · Support: service@nexscope.ai

## Validation and release status

Run the dependency-free packaging check with Node.js 22 or later:

```sh
node scripts/validate.mjs
```

This checks the manifest, MCP configuration, Skill metadata, logo, license, and required documents. It makes no network requests. Static validation is not proof of a working Cursor OAuth connection or a successful live research call. See [SUBMISSION.md](SUBMISSION.md) for the application text, manual acceptance checks, and outstanding release evidence.

## License

The plugin files and documentation in this repository are licensed under [MIT](LICENSE). The Nexscope remote service is governed by its service terms and is not distributed by this repository. The Nexscope name and logo remain Nexscope trademarks; the MIT license does not grant trademark rights.
