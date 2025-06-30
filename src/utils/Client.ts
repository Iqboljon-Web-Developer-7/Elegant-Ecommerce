import createClient from "@sanity/client";
import urlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_DATASET_ID,
  apiVersion: "vX",
  dataset: "production",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_USER_TOKEN,
});

export const builder = urlBuilder(client);
export const urlFor = (source: string) => builder.image(source)
