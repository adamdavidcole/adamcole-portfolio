import { PortableText } from "@portabletext/react";
// import { PROJECT_ID, DATASET } from "./data-constants";
import dataClient from "./data-client";
import imageUrlBuilder from "@sanity/image-url";

import { PROJECT_ID, DATASET } from "./data-constants";

let builder;

function urlFor(source) {
  if (!builder) {
    builder = imageUrlBuilder(dataClient);
  }
  // Then we like to make a simple function like this that gives the
  // builder an image and returns the builder for you to specify additional
  // parameters:
  return builder.image(source);
}

export function getGraphicURL(file) {
  const ref = file.asset._ref;
  const [_file, id, extension] = ref.split("-");
  return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${id}.${extension}`;
}

export function getImageUrl(image) {
  return urlFor(image).width(1200).url();
}

export function getProjectTitle(project) {
  return project?.name;
}

export function getProjectSubtitle(project) {
  return project?.subtitle;
}

export function getProjectDate(project) {
  // TODO: maybe convert to javascript date
  return project?.date;
}

export function getProjectText(project) {
  // TODO: maybe convert to react component
  return project?.text;
}

export function getProjectTextEl(project) {
  // TODO: maybe convert to react component
  return <PortableText value={getProjectText(project)} />;
}

export function getProjectImages(project) {
  // TODO: maybe convert to URLs?
  return project?.images;
}

export function getProjectImageURLs(project) {
  const images = getProjectImages(project);
  return images?.map((image) => getImageUrl(image));
}

export function getProjectGraphics(project) {
  // TODO: maybe convert to URLs?
  return project?.graphics;
}

export function getProjectGraphicURLs(project) {
  // TODO: maybe convert to URLs?
  const graphics = getProjectGraphics(project);
  return graphics?.map((graphic) => getGraphicURL(graphic));
}

export function getProjectVideoLinks(project) {
  // TODO: maybe convert to embeds?
  return project?.videoLinks;
}

export function getProjectIsFeatured(project) {
  return project?.isFeatured;
}

export function getProjectKeywords(project) {
  return project?.keywords;
}
