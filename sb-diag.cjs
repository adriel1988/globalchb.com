const { createClient } = require('@supabase/supabase-js');

const URL_SB  = 'https://wdsellaywiykhhnnzkfm.supabase.co';
const ANON    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkc2VsbGF5d2l5a2hobm56a2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4MjY4NTksImV4cCI6MjA5OTQwMjg1OX0.0yAZs_gGLLXg6VWR2mSE7myNmZitZLQWCSnY87Ud9XM';
const SERVICE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkc2VsbGF5d2l5a2hobm56a2ZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzgyNjg1OSwiZXhwIjoyMDk5NDAyODU5fQ.TuUL8kmRb6JY8SMUrbJgtuysCGG6bTKdY5W2QAorgv0';

const anon    = createClient(URL_SB, ANON,    { auth: { persistSession: false } });
const service = createClient(URL_SB, SERVICE, { auth: { persistSession: false } });

async function check(label, client, table, filters) {
  // Total sin filtro
  const total = await client.from(table).select('*', { count: 'exact', head: true });
  // Muestra con filtro
  let q = client.from(table).select('*').limit(1);
  if (filters) {
    for (const [col, val] of Object.entries(filters)) {
      q = q.eq(col, val);
    }
  }
  const sample = await q;

  console.log('\n=== ' + label + ' (' + table + ') ===');
  console.log('  Total filas (sin filtro):', total.count, '| RLS error:', total.error ? total.error.message : 'ninguno');
  if (sample.error) {
    console.log('  ERROR al hacer SELECT   :', sample.error.message);
  } else if (sample.data && sample.data.length > 0) {
    console.log('  Columnas disponibles    :', Object.keys(sample.data[0]).join(', '));
    const row = JSON.stringify(sample.data[0]);
    console.log('  Primera fila            :', row.length > 300 ? row.substring(0, 300) + '...' : row);
  } else {
    console.log('  Resultado               : [] (sin datos visibles con esta key)');
  }
}

async function main() {
  console.log('\n======== ANON KEY ========');
  await check('ANON > portfolio_gallery',  anon, 'portfolio_gallery', { is_published_to_web: true });
  await check('ANON > product_catalog',    anon, 'product_catalog',   { is_active: true });
  await check('ANON > service_catalog',    anon, 'service_catalog',   { is_active: true });

  console.log('\n======== SERVICE ROLE KEY (bypass RLS) ========');
  await check('SVC > portfolio_gallery',   service, 'portfolio_gallery', null);
  await check('SVC > product_catalog',     service, 'product_catalog',   null);
  await check('SVC > service_catalog',     service, 'service_catalog',   null);
}

main().catch(console.error);
