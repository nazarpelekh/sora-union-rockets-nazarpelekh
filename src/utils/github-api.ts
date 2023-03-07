import axios from "axios";

export const getUsers = async (query: string) : Promise<any> => {
  let headersList = {
     "Authorization": "token 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"
  }

  let reqOptions = {
    url: `https://api.github.com/search/users?q=${query}`,
    method: "GET",
    headers: headersList,
  }
  const response = await axios.request(reqOptions);
  return response.data;
};
