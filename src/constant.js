export const indexes = [{
    index : "in%3BNSX",
    isGlobal : "false"
},{
    index : "in%3BSEN",
    isGlobal : "false"
},{
    index : "de%3Bqx",
    isGlobal : "true"
},{
    index : "gb%3BFTSE",
    isGlobal : "true"
},{
    index : "us%3BCOMP",
    isGlobal : "true"
},{
    index : "US%3Bdji",
    isGlobal: "true"
}];

export const NEWSAPIKEY ="NEWsAPIKEY"; //https://newsapi.org/ for key register
export const NEWSAPI_BASEURL="https://newsapi.org/v2/top-headlines";
export const ALPHAAPI_BASEURL="https://www.alphavantage.co/query";
export const ALPHAAPIKEY ="ALPHAVANTAGEKEY"; //https://www.alphavantage.co for key

export const formatDate = (string) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}