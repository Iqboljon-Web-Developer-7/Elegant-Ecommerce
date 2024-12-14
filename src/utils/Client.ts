import sanityClient from "@sanity/client";
import urlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "kvpqppgu",
  apiVersion: "vX",
  dataset: "production",
  useCdn: true,
  token: import.meta.env.VITE_SANITY_USER_TOKEN,
});

const builder = urlBuilder(client);
export const urlFor = (source: string) => builder.image(source);
