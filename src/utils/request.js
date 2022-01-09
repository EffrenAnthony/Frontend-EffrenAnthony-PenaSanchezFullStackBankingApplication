import axios from "axios";

export const httpPost = async (API, route, body, authorization) => {
  const response = await axios.post(API + route, body, {
    headers: {
      'Authorization': 'Bearer ' + authorization,
    }
  })
  return response.data
}
export const httpGet = async (API, route, authorization) => {
  const response = await axios.get(API + route, {
    headers: {
      'Authorization': 'Bearer ' + authorization,
    }
  })
  return response.data
}

export const httpDelete = async (API, route, id, authorization) => {
  const response = await axios.delete(API + route + '/' + id, {
    headers: {
      'Authorization': 'Bearer ' + authorization,
    }
  })
  return response.data
}