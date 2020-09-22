import { createUploadLink } from "apollo-upload-client";

export const serverUrl = {
  // uri: "http://localhost:4000"
  uri: "http://116.120.58.241:4000",
  // uri: "http://192.168.0.39:4000" //사무실
  // uri: "http://192.168.1.205:4000" //집
  // uri: "http://192.168.219.107:4000" //병욱이집
};

export default createUploadLink(serverUrl);
