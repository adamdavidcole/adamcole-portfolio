const cacheResponses = {};

export default function getVimeoEmbed({
  url,
  color = "599bde",
  responsive = true,
  speed = false,
  autoplay = false,
} = {}) {
  if (!url) return Promise.resolve();

  if (cacheResponses[url]) return cacheResponses[url];

  const apiUrl = `https://vimeo.com/api/oembed.json?url=${url}&color=${color}&responsive=${responsive}&speed=false&title=false&portrait=false&byline=false&autoplay=${autoplay}`;
  return fetch(apiUrl).then((response) => {
    const responseJSON = response.json();
    cacheResponses[url] = responseJSON;

    return responseJSON;
  });
}
