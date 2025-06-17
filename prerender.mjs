// // prerender.js
import { writeFileSync } from "fs";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: 'kvpqppgu',
  apiVersion: "vX",
  dataset: "production",
  useCdn: false,
  token: 'skvIkOaFQBOvwcPrwvSZGDXzyDiPbhwMlXPF4FlNKjzyDJH2g4v6w3e7UTRKoARZPaC8RJ289EzfWJ1d9iuQGqJT8E4onvgYJz4clblpnKmdq4S4zTkM62AdfDWg7OWBtpnQ6nrUhLNUSzvqI0ZIyB6Ksw435oGRAcF5geWmUkUvZodj40JP', // Optional: For private datasets
});

async function generateRoutes() {
  const query = `*[_type == "product"]{_id}`;
  const products = await client.fetch(query);
  const productRoutes = products.map((product) => `/product/${product._id}`);

  const routes = [
    "/",
    "/products",
    "/contact-us",
    "/search",
    ...productRoutes,
  ];

  writeFileSync(
    "./react-snap.routes.json",
    JSON.stringify(routes, null, 2)
  );
  console.log("Generated routes:", routes);
}

generateRoutes().catch(console.error);