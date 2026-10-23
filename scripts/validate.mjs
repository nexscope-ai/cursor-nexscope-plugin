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
assert.equal(manifest.logo, 'assets/logo.svg');
assert.ok(!('variables' in manifest), 'This release uses host OAuth, not API-key variables');
assert.deepEqual(JSON.parse(read('mcp.json')), {
  mcpServers: { nexscope: { url: 'https://api.nexscope.ai/api/skill-api/v2/mcp' } },
});
assert.deepEqual(readdirSync(path.join(root, 'skills')), ['nexscope']);
const skill = read('skills/nexscope/SKILL.md');
assert.match(skill, /^---\r?\nname: nexscope\r?\ndescription: [^\r\n]+\r?\n---/);
assert.match(skill, /Let Cursor handle OAuth/);
assert.match(skill, /potentially chargeable request/);
const logo = read(manifest.logo);
assert.match(logo, /viewBox="0 0 320 320"/);
assert.match(logo, /<rect[^>]+fill="#ffffff"/);
const embeddedLogo = logo.match(/href="data:image\/png;base64,([A-Za-z0-9+/=]+)"/);
assert.ok(embeddedLogo, 'Logo must embed the existing brand asset, without external dependencies');
const png = Buffer.from(embeddedLogo[1], 'base64');
assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
assert.equal(png.readUInt32BE(16), png.readUInt32BE(20), 'Source logo must be square');
assert.match(read('LICENSE'), /^MIT License/);
assert.match(read('README.md'), /## Try it before marketplace publication/);
assert.match(read('SUBMISSION.md'), /draft; do not submit yet/);
assert.match(read('SUBMISSION.md'), /Pending manual acceptance/);
console.log('PASS: manifest, OAuth-only MCP configuration, Skill, self-contained square logo, MIT license, and release documents. No network or paid calls made.');
