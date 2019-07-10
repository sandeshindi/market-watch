import axios from "axios";
import { ALPHAAPI_BASEURL } from "../constant";

export default axios.create({
  baseURL: ALPHAAPI_BASEURL
});
