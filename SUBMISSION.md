# Cursor Marketplace application draft

Prepared: October 23, 2026. Target version: 0.1.0. Status: **draft; do not submit yet**.

Acceptance environment: Windows, Cursor 3.24.18. Runtime source verified against public commit `d3ab5ac` (the report can be updated independently of runtime files).

Core workflow acceptance passed: local plugin loading, user OAuth consent, authenticated tool discovery, one live search, and a verified 48-row CSV export. Remaining limits and publisher checks are listed below; the application is still unsubmitted.

## Application fields

These values match the fields observed at [Cursor Marketplace / Publish](https://cursor.com/marketplace/publish). The organization handle is a proposed namespace; availability has not been checked.

| Form field | Prepared value |
| --- | --- |
| Organization name | Nexscope |
| Organization handle | nexscope-ai |
| Contact email | service@nexscope.ai |
| Logotype URL | https://raw.githubusercontent.com/nexscope-ai/cursor-nexscope-plugin/main/assets/logo.png |
| GitHub repository | https://github.com/nexscope-ai/cursor-nexscope-plugin |
| Website URL | https://www.nexscope.ai |
| Owner | Select the GitHub/Cursor account or organization authorized to publish for Nexscope. This is chosen by the signed-in applicant; it is not set by this repository. |

The logo is a 320 × 320 PNG with a white background plate and the existing Nexscope artwork. It is exported from the original SVG wrapper so the image does not depend on embedded image loading under GitHub's SVG content security policy.

### Description — ready to paste

Nexscope brings ecommerce research into Cursor. Connect your Nexscope account through Cursor's MCP connection flow, then research products, keywords, markets, competitors, and reviews using Nexscope's remote tools. The plugin includes a focused research Skill and can help summarize retrieved results or save them to your workspace. A Nexscope account is required, and research calls may consume Nexscope credits. No local CLI or runtime installation is required.

### 中文核对稿

Nexscope 将电商研究带入 Cursor。用户通过 Cursor 的 MCP 连接流程授权 Nexscope 账户后，可调用远程工具研究商品、关键词、市场、竞品和评论。插件提供一个聚焦研究的 Skill，可帮助总结已获取的结果，或将结果保存到工作区。需要 Nexscope 账户，研究调用可能消耗 Nexscope 积分；无需安装本地 CLI 或运行时。

## Supporting information

- Plugin identifier: `nexscope`; display name: Nexscope; version: `0.1.0`.
- Category suggestion: Data & Analytics / Ecommerce, if offered by the form.
- Open-source plugin license: MIT. This does not change the licenses of existing Codex repositories or the remote Nexscope service.
- Remote MCP: `https://api.nexscope.ai/api/skill-api/v2/mcp` (existing service).
- Authentication: host-managed OAuth with PKCE. Cursor uses a fixed public client metadata URL; the existing Nexscope server resolves that CIMD document. No token, API key, client secret, or bundled credential is included. The metadata is hosted by GitHub Pages from this public repository.
- Privacy: https://www.nexscope.ai/privacy
- Service terms: https://www.nexscope.ai/terms
- Documentation/support: https://www.nexscope.ai/mcp-map and service@nexscope.ai
- First release: one MCP connection and one research Skill. No hooks, local CLI, binaries, background jobs, or Canvas promise.

## Verification evidence

Only completed checks should be represented as passed in an application.

| Check | Result |
| --- | --- |
| Repository contents | Ten files in the public candidate. Fetched `main` at `d3ab5ac`; all runtime files matched the tested local files. Only this acceptance report had a subsequent documentation update. |
| Public endpoint, unauthenticated GET | October 23, 2026: existing MCP endpoint and `/mcp` both returned HTTP 401 with an OAuth resource-metadata challenge. No research calls were made. |
| Protected resource metadata | HTTP 200; resource is the existing `/api/skill-api/v2/mcp` endpoint, authorization server is `https://api.nexscope.ai`, scope is `mcp:tools`. |
| OAuth authorization-server metadata | HTTP 200; advertises authorization/token endpoints and PKCE S256. No dynamic `registration_endpoint` was advertised. This alone does not prove Cursor can authenticate. |
| Privacy, terms, and MCP guide | Public pages were accessible on October 23, 2026. |
| Static plugin validation | Passed on October 23, 2026: manifest, OAuth-only MCP configuration, Skill frontmatter, square PNG logo, MIT license, and release documents. Run `node scripts/validate.mjs` to repeat. |
| Unauthenticated MCP initialize | Passed on October 23, 2026: an unauthenticated JSON-RPC `initialize` returned HTTP 401 with an OAuth resource-metadata challenge. No research was executed. |
| Local installation | Copied to `%USERPROFILE%\.cursor\plugins\local\nexscope` on Windows; validation passed from the installed directory. Cursor executable reports version 3.24.18. |
| Cursor local discovery | Passed in Cursor 3.24.18: Customize displays Nexscope 0.1.0 as Local, with exactly one MCP server and one research Skill. |
| Public OAuth client metadata | Passed on October 23, 2026: the canonical `https://learn.nexscope.ai/cursor-nexscope-plugin/oauth-client.json` returns HTTP 200 without redirect, `Content-Type: application/json`, and the exact expected client ID and callback allowlist. GitHub Pages publishes this repository under the organization's existing docs domain. |
| Cursor OAuth | Passed after the user completed Nexscope consent: Cursor's MCP configuration shows `Local / Connected` and the plugin view shows `545 tools enabled`. The initial URL-only dynamic-registration error was resolved by `auth.CLIENT_ID` and the public CIMD document. An earlier authentication-timeout notification remained visible, but the current connection and subsequent authenticated call succeeded. No API key was substituted. |
| Authenticated tool discovery and Skill | Passed: Cursor read the installed `nexscope` Skill and obtained the real schemas for `nexscope_amazon_market_product_search` and `nexscope_amazon_search` through its dynamic-tool discovery. This discovery step made no research call. |
| Live research | Passed for one bounded call to `nexscope_amazon_search`: keyword `insulated travel mug`, `amazonDomain=amazon.com`, `page=1`, `language=en_US`, `device=desktop`. Cursor reported business success `code: 0, msg: ok`. No additional research, pagination, or retry was requested. This checks one workflow, not all 545 tools. |
| CSV export | Passed: `amazon-search.csv` contains 48 data rows and seven columns (`asin,title,price,currency,rating,ratings,link`). Every exported field was checked against the actual MCP output shown in Cursor; numeric formatting such as `35.0` versus `35` is equivalent. The response reports `total=48` and contains 48 products. Export reused that response without another research call. This is one search page, not all Amazon results. |
| Raw response archive | Passed after correction: the first host-generated JSON archive added text to one product's `delivery` field. Comparison with the actual MCP output caught it; Cursor corrected only that field without another research call. A subsequent deep comparison of the whole parsed archive against the observed MCP response passed. Treat model-written archives as exports requiring verification, not as automatically exact raw captures. |
| Missing inputs and unsupported marketplace | Passed at the assistant/schema level without a business call: a new request lacking marketplace and product/keyword led to a request for missing inputs; `marketplace=aq` was identified as unsupported, with no invented data or silent substitution of `us`. This did not test server-side rejection responses. |
| Public repository and logo URL | Passed on October 23, 2026: Public repository and raw PNG GET both returned HTTP 200. The original SVG's embedded image failed direct browser rendering despite HTTP 200; the PNG export preserves the brand artwork and displays correctly in Cursor's local plugin view. |
| Marketplace application | Not submitted. |

## Manual acceptance before submission

1. Copy the plugin to `~/.cursor/plugins/local/nexscope`, reload Cursor, and confirm exactly one research Skill and one Nexscope MCP server. Record the Cursor version.
2. Verify that the public client metadata URL in `mcp.json` returns HTTP 200 and `Content-Type: application/json`, and its `client_id` and callback allowlist match the committed document. Connect using Cursor's MCP OAuth flow. Verify approval, cancellation, denied access, disconnect, and reconnection without exposing credentials. The fixed client ID avoids Cursor's dynamic-registration requirement; Nexscope resolves the public document using existing CIMD support. Do not add a guessed OAuth client ID or switch authentication methods.
3. Ask for tool names only. Verify that discovery does not trigger a paid research request.
4. With an authorized reviewer account and explicit agreement to any credit use, run one bounded product query using an actual published schema. Check business success and the original result.
5. Export that existing result as CSV. Verify the file contents and that exporting does not repeat the paid query.
6. Try missing required inputs and an unavailable marketplace. The assistant must ask for missing inputs or explain the service limitation rather than fabricate results.
7. Verify handling of an observed authentication failure or uncertain tool outcome without an automatic paid replay. Do not deliberately spend credits just to simulate a failure.
8. Verify the repository and raw logo URL without a GitHub login after making the repository Public. Confirm the proposed Cursor namespace and the applicant's authority/contact details.
9. Review the current Publisher Terms in the application. Keep the application unsubmitted until explicitly authorized.

Cursor performs its own manual review. Repository structure and these checks do not guarantee acceptance. No demo recording was created. The CSV and JSON acceptance artifacts remain local, outside this public repository.

### Remaining acceptance limits

- Pending manual acceptance: OAuth cancellation, denied consent, logout/reconnection, and access-token refresh have not been exercised. The successful connection does not prove these paths.
- A real request can consume Nexscope credits; the published schemas do not state a specific credit price. No price or debit amount is claimed here.
- Only one US search page was exercised. It returned 48 products and `sellerSpriteEnriched=false`; optional fields were not complete for every product. The CSV preserves the returned `ratings` field as rating count, which is not a separately verified count of written reviews.
- `nexscope_amazon_market_product_search` refers to a `SKILL.md Query Types` enumeration that is not present in this focused plugin Skill. Do not guess its query-type mapping. The accepted search used the separate, self-contained `nexscope_amazon_search` schema.
- Namespace availability, applicant authority, and final Publisher Terms review remain with the publisher. The Marketplace application is still unsubmitted.

## Official references

- [Plugin formats and submission checklist](https://cursor.com/docs/reference/plugins)
- [Local plugin testing](https://cursor.com/docs/plugins)
- [MCP transports and authentication](https://cursor.com/docs/mcp)
- [Marketplace security and open-source requirement](https://cursor.com/help/security-and-privacy/marketplace-security)
