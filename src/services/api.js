// If you want to run the frontend without a backend, set VITE_USE_MOCK=true in .env
const useMock = import.meta.env.VITE_USE_MOCK === 'true' || (import.meta.env.VITE_API_URL === 'mock');

// Determine backend base URL. Prefer explicit VITE_API_URL. If not set, use the page hostname
// so frontend and backend share the same hostname (helps when one uses `127.0.0.1` vs `localhost`).
const DEFAULT_BACKEND_PORT = 5000;
const envApiUrl = import.meta.env.VITE_API_URL;
let baseUrl;
if (envApiUrl && envApiUrl !== 'mock') {
  baseUrl = envApiUrl;
} else if (typeof location !== 'undefined' && location.hostname) {
  baseUrl = `${location.protocol}//${location.hostname}:${DEFAULT_BACKEND_PORT}`;
} else {
  baseUrl = `http://localhost:${DEFAULT_BACKEND_PORT}`;
}

let authHeaders, getJson, postJson, putJson, deleteJson;

if(useMock){
  // dynamic import of mock to keep bundle small when not used
  let mock;
  async function ensure(){ if(!mock) mock = await import('./mockApi.js'); return mock; }

  authHeaders = async function(){ const m = await ensure(); return m.authHeaders(); };
  getJson = async function(url, opts={}){ const m = await ensure(); return m.getJson(url, opts); };
  postJson = async function(url, body, opts={}){ const m = await ensure(); return m.postJson(url, body, opts); };
  putJson = async function(url, body, opts={}){ const m = await ensure(); return m.putJson(url, body, opts); };
  deleteJson = async function(url, opts={}){ const m = await ensure(); return m.deleteJson(url, opts); };

} else {
  authHeaders = function(){
    const token = localStorage.getItem('sw_token');
    return token ? { Authorization: 'Bearer '+token } : {};
  };

  getJson = async function(url, opts={}){
    const res = await fetch(baseUrl + url, { headers: { 'Content-Type':'application/json', ...opts.headers } });
    return res.json();
  };

  postJson = async function(url, body, opts={}){
    const res = await fetch(baseUrl + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...opts.headers },
      body: JSON.stringify(body)
    });
    return res.json();
  };

  putJson = async function(url, body, opts={}){
    const res = await fetch(baseUrl + url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...opts.headers },
      body: JSON.stringify(body)
    });
    return res.json();
  };

  deleteJson = async function(url, opts={}){
    const res = await fetch(baseUrl + url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...opts.headers }
    });
    return res.json();
  };

}

export { authHeaders, getJson, postJson, putJson, deleteJson };
