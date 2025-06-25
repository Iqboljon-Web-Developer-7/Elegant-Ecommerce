import { writeFileSync } from 'fs';
import { createClient } from '@sanity/client';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

const client = createClient({
  projectId: 'kvpqppgu',
  apiVersion: '2023-05-03', // Stable version to avoid warning
  dataset: 'production',
  useCdn: false,
  token: process.env.VITE_SANITY_USER_TOKEN, // Use env variable
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

async function run() {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'),
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
  });

  // Optional: Test browser launch
  const page = await browser.newPage();
  await page.goto('http://localhost:5173'); // Adjust for Vite dev server
  await browser.close();

  await generateRoutes();
}

run().catch(console.error);