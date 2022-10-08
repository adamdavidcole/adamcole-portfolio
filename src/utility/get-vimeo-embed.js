export default function getVimeoEmbed({
  url,
  color = "599bde",
  responsive = true,
  speed = false,
} = {}) {
  if (!url) return Promise.resolve();

  const apiUrl = `https://vimeo.com/api/oembed.json?url=${url}&color=${color}&responsive=${responsive}&speed=false&title=false&portrait=false&byline=false`;
  return fetch(apiUrl).then((response) => {
    return response.json();
  });
}
