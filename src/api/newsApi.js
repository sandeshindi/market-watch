import axios from "axios";
import { NEWSAPI_BASEURL } from "../constant";

export default axios.create({
    baseURL : NEWSAPI_BASEURL
   
})