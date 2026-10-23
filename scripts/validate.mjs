import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (name) => readFileSync(path.join(root, name), 'utf8');
const manifest = JSON.parse(read('.cursor-plugin/plugin.json'));
assert.equal(manifest.name, 'nexscope');
assert.equal(manifest.displayName, 'Nexscope');
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert.ok(manifest.description.trim());
assert.deepEqual(manifest.author, { name: 'Nexscope', email: 'service@nexscope.ai' });
assert.equal(manifest.repository, 'https://github.com/nexscope-ai/cursor-nexscope-plugin');
assert.equal(manifest.homepage, 'https://www.nexscope.ai');
assert.equal(manifest.license, 'MIT');
assert.equal(manifest.logo, 'assets/logo.png');
assert.ok(!('variables' in manifest), 'This release uses host OAuth, not API-key variables');
const clientId = 'https://learn.nexscope.ai/cursor-nexscope-plugin/oauth-client.json';
assert.deepEqual(JSON.parse(read('mcp.json')), {
  mcpServers: {
    nexscope: {
      url: 'https://api.nexscope.ai/api/skill-api/v2/mcp',
      auth: { CLIENT_ID: clientId, scopes: ['mcp:tools'] },
    },
  },
});
assert.deepEqual(JSON.parse(read('oauth-client.json')), {
  client_id: clientId,
  client_name: 'Nexscope for Cursor',
  redirect_uris: ['http://localhost:8787/callback', 'https://www.cursor.com/agents/mcp/oauth/callback'],
  token_endpoint_auth_method: 'none',
  grant_types: ['authorization_code', 'refresh_token'],
  response_types: ['code'],
  scope: 'mcp:tools',
});
assert.deepEqual(readdirSync(path.join(root, 'skills')), ['nexscope']);
const skill = read('skills/nexscope/SKILL.md');
assert.match(skill, /^---\r?\nname: nexscope\r?\ndescription: [^\r\n]+\r?\n---/);
assert.match(skill, /Let Cursor handle OAuth/);
assert.match(skill, /potentially chargeable request/);
const png = readFileSync(path.join(root, manifest.logo));
assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
assert.equal(png.readUInt32BE(16), 320);
assert.equal(png.readUInt32BE(20), 320, 'Marketplace logo must be square');
assert.match(read('LICENSE'), /^MIT License/);
assert.match(read('README.md'), /## Try it before marketplace publication/);
console.log('PASS: manifest, OAuth-only MCP configuration, Skill, square PNG logo, MIT license, and README. No network or paid calls made.');
