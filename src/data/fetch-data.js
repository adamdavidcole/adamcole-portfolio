import { PROJECT_ID, DATASET } from "./data-constants";
import dataClient from "./data-client";

const QUERY = '*[_type == "project"]';

export default function fetchData() {
  return dataClient
    .fetch(QUERY)
    .then((result) => {
      console.log("result", result);
      return result;
    })
    .catch((err) => console.error(err));
}
