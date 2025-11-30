const users = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', password: 'adminpass' },
  { id: '2', name: 'Student One', email: 'student@example.com', role: 'student', password: 'studentpass' }
];

let resources = [
  { id: 'r1', title: 'Campus Counseling Services', description: 'Free confidential mental health counseling for students.', category: 'Mental Health', link: 'https://campus.example/counseling' }
];

// additional health resources
resources.push(
  { id: 'r2', title: 'Campus Telehealth', description: 'Access telehealth services for urgent care and mental health.', category: 'Mental Health', link: 'https://campus.example/telehealth' },
  { id: 'r3', title: 'On-Campus Fitness Classes', description: 'Weekly yoga and pilates classes open to students.', category: 'Fitness', link: 'https://campus.example/fitness' }
);

let programs = [
  { id: 'p1', title: 'Mindful Mornings', description: '6-week mindfulness and meditation program.', category: 'Mental Health', sessions: [], members: ['2'] },
  { id: 'p2', title: 'Strength Training Basics', description: '4-week introduction to strength training.', category: 'Fitness', sessions: [], members: [] }
];

// additional wellness programs
programs.push(
  { id: 'p3', title: 'Virtual Yoga Series', description: '8-session virtual yoga program to improve flexibility and reduce stress.', category: 'Fitness', sessions: [], members: [] },
  { id: 'p4', title: 'Healthy Habits Challenge', description: '30-day challenge focusing on sleep, hydration, and nutrition.', category: 'Nutrition', sessions: [], members: [] }
);

function delay(ms=200){ return new Promise(res => setTimeout(res, ms)); }

function makeToken(user){
  // simple mock token (not secure)
  return btoa(JSON.stringify({ id: user.id, role: user.role, email: user.email }));
}

function parseToken(token){
  try{ return JSON.parse(atob(token)); }catch(e){ return null; }
}

export async function authHeaders(){
  const token = localStorage.getItem('sw_token');
  return token ? { Authorization: 'Bearer '+token } : {};
}

export async function getJson(url, opts={}){
  await delay();
  // normalize '/api' prefix
  const path = url.replace(/^\/api/, '');
  // metrics endpoint used by AdminDashboard
  if(path.startsWith('/metrics')){
    return { users: users.length, resources: resources.length, programs: programs.length };
  }
  if(path.startsWith('/programs')) return programs;
  if(path.startsWith('/resources')) return resources;
  if(path.startsWith('/auth/me')){
    const token = (opts.headers && (opts.headers.Authorization || opts.headers.authorization) || '').split(' ')[1];
    const info = parseToken(token);
    if(!info) return { error: 'Unauthorized' };
    const user = users.find(u=>u.id===info.id);
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }
  return { success: false, error: 'Not found' };
}

export async function postJson(url, body, opts={}){
  await delay();
  const path = url.replace(/^\/api/, '');
  if(path === '/auth/login'){
    const u = users.find(x => x.email === body.email && x.password === body.password);
    if(!u) return { error: 'Invalid credentials' };
    const token = makeToken(u);
    return { token, user: { id: u.id, name: u.name, email: u.email, role: u.role } };
  }
  if(path === '/resources'){
    const id = 'r'+(resources.length+1);
    const r = { id, ...body };
    resources.push(r);
    return r;
  }
  if(path === '/programs'){
    const id = 'p'+(programs.length+1);
    const p = { id, ...body, members: body.members||[] };
    programs.push(p);
    return p;
  }
  return { error: 'Not found' };
}

export async function putJson(url, body, opts={}){
  await delay();
  const path = url.replace(/^\/api/, '');
  if(path.startsWith('/programs/')){
    const id = path.split('/')[2];
    const idx = programs.findIndex(p=>p.id===id);
    if(idx===-1) return { error: 'Not found' };
    programs[idx] = { ...programs[idx], ...body };
    return programs[idx];
  }
  return { error: 'Not found' };
}

export async function deleteJson(url, opts={}){
  await delay();
  const path = url.replace(/^\/api/, '');
  if(path.startsWith('/resources/')){
    const id = path.split('/')[2];
    resources = resources.filter(r=>r.id!==id);
    return { ok: true };
  }
  return { error: 'Not found' };
}

export default { authHeaders, getJson, postJson, putJson, deleteJson };
