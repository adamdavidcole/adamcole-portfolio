import { PROJECT_ID, DATASET } from "./data-constants";
import dataClient from "./data-client";

export default function fetchData() {
  const QUERY = encodeURIComponent('*[_type == "project"]');
  const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

  console.log("URL", URL);

  const query2 = '*[_type == "project"]';

  return dataClient
    .fetch(query2)
    .then((result) => {
      return result;
    })
    .catch((err) => console.error(err));
}
