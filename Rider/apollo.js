import { createUploadLink } from "apollo-upload-client";

export const serverUrl = {
  uri: "http://3.38.0.73:4000",
};

export default createUploadLink(serverUrl);
