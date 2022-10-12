import { PortableText } from "@portabletext/react";
import { BrowserRouter as Link } from "react-router-dom";

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

export function getImageUrl(
  image,
  { getHD = false, width = 800, height = 450, format = "png" } = {}
) {
  if (getHD) return urlFor(image).url();

  return urlFor(image).width(width).height(height).format(format).url();
}

export function getProjectId(project) {
  return project?._id;
}

export function getProjectURL(project) {
  const projectTitle = getProjectTitle(project);
  let url = projectTitle?.toLowerCase()?.replace(/ /g, "-").replace(/[,]/g, "");
  return url;
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

export function getProjectGraphicsOld(project) {
  // TODO: maybe convert to URLs?
  return project?.graphics;
}

export function getProjectGraphicsURLsOld(project) {
  // TODO: maybe convert to URLs?
  const graphics = getProjectGraphicsOld(project);
  return graphics?.map((graphic) => getGraphicURL(graphic));
}

export function getProjectVideoLinks(project) {
  // TODO: maybe convert to embeds?
  return project?.videoLinks;
}

export function getProjectGraphicVideo(graphic, { getHD = false } = {}) {
  // TODO: maybe convert to URLs?
  return getHD ? graphic?.videoHD : graphic?.videoMedium;
}

export function getProjectGraphicImage(graphic) {
  // TODO: maybe convert to URLs?
  return graphic?.image;
}

export function getProjectGraphicAspectRatio(graphic) {
  // TODO: maybe convert to URLs?
  return graphic?.aspectRatio;
}

export function getProjectGraphics(project) {
  // TODO: maybe convert to URLs?
  return project?.graphics2;
}

export function getProjectGraphicsURLs(
  project,
  { getHD = false, width = 800, height = 450 } = {}
) {
  // DEPRECATED API
  const graphicURLsOld = getProjectGraphicsURLsOld(project);
  if (graphicURLsOld && graphicURLsOld.length) {
    return graphicURLsOld;
  }

  // NEW API with option for HD graphics
  const graphics = getProjectGraphics(project);

  return graphics
    ?.map((graphic) => {
      const graphicVideo = getProjectGraphicVideo(graphic, { getHD });
      const graphicImage = getProjectGraphicImage(graphic);

      if (graphicVideo) return getGraphicURL(graphicVideo);
      if (graphicImage) {
        const aspectRatio = getProjectGraphicAspectRatio(graphic);
        if (aspectRatio === "square") {
          height = width;
        }
        return getImageUrl(graphicImage, { getHD, width, height });
      }

      return null;
    })
    .filter((url) => url != null);
}

export function getProjectThumbnailImage(project) {
  return project?.thumbnailImage;
}

export function getProjectThumbnailImageURL(project) {
  // TODO: get smaller image
  const projectThumbnailImage = getProjectThumbnailImage(project);
  return getImageUrl(projectThumbnailImage);
}

export function getProjectThumbnailVideo(project) {
  return project?.thumbnailVideo;
}

export function getProjectThumbnailVideoURL(project) {
  const projectThumbnailVideo = getProjectThumbnailVideo(project);
  if (!projectThumbnailVideo) return;

  return getGraphicURL(projectThumbnailVideo);
}

export function getVimeoThumbnailURL(project) {
  return project?.vimeoThumbnailURL;
}

export function getProjectIsFeatured(project) {
  return project?.isFeatured;
}

export function getProjectFeaturedSortOrder(project) {
  return project?.featuredSortOrder;
}

export function getProjectKeywords(project) {
  return project?.keywords;
}

export function getSortedFeaturedProjects(data) {
  return data
    ?.filter((project) => getProjectIsFeatured(project))
    .sort(
      (projectA, projectB) =>
        getProjectFeaturedSortOrder(projectA) -
        getProjectFeaturedSortOrder(projectB)
    );
}

export function getSortedProjects(data) {
  return data?.sort((projectA, projectB) => {
    const dateA = getProjectDate(projectA);
    const dateB = getProjectDate(projectB);
    return dateB.localeCompare(dateA);
  });
}

export function projectHasVideoLinks(project) {
  const videoLinks = getProjectVideoLinks(project);
  return !!(videoLinks && videoLinks.length > 0);
}

export function projectHasGraphics(project) {
  const graphics = getProjectGraphicsURLs(project);
  return !!(graphics && graphics.length > 0);
}
