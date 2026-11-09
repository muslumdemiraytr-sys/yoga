// Projeyi yerelde sunan küçük statik sunucu (bağımlılık yok)
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.md': 'text/markdown', '.png': 'image/png' };
export function serve(port = 4173) {
  const server = http.createServer(async (req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    const file = path.endsWith('/') ? path + 'index.html' : path;   // dosya türü son dosya adından belirlenir
    try { const body = await readFile(join(ROOT, file)); res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(body); }
    catch { res.writeHead(404); res.end('404'); }
  });
  return new Promise(r => server.listen(port, () => r(server)));
}
