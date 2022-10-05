import sanityClient from "@sanity/client";

export const PROJECT_ID = "90x01i7i";
export const DATASET = "production";

export default sanityClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "v2021-10-21", // use current UTC date - see "specifying API version"!
  // token: "sanity-auth-token", // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});
