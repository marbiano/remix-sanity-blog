import Sanity from "picosanity";
import type { PicoSanity } from "picosanity";
import imageUrlBuilder from "@sanity/image-url";

type SanityConfig = {
  projectId: string;
  dataset?: string;
  apiVersion?: string;
  token?: string;
  useCdn?: boolean;
  withCredentials?: boolean;
};

const defaultConfig = {
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-03-25",
};

export default function createSanityClient(config: SanityConfig) {
  return new Sanity(Object.assign({}, defaultConfig, config));
}

export function getImageUrlBuilder(client: PicoSanity) {
  return imageUrlBuilder(client);
}
