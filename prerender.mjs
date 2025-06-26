// prerender.mjs
import { writeFileSync } from 'fs';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'kvpqppgu',
  apiVersion: 'vX', // Stable version to fix experimental warning
  dataset: 'production',
  useCdn: false,
  token: import.meta.env.VITE_SANITY_USER_TOKEN, // Use secure env variable
});

async function generateRoutes() {
  const query = `*[_type == "product"]{_id}`;
  const products = await client.fetch(query);
  const productRoutes = products.map((product) => `/product/${product._id}`);

  const routes = [
    '/',
    '/products',
    '/contact-us',
    '/search',
    ...productRoutes,
  ];

  writeFileSync(
    './react-snap.routes.json',
    JSON.stringify(routes, null, 2)
  );
  console.log('Generated routes:', routes);
}

generateRoutes().catch(console.error);