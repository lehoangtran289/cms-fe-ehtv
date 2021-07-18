import axios from "axios";
import { API_URL } from '../config/config';

export const doPost = (dispatch, url, body) => {
  return fetch(API_URL + url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body),
  });
};

export const doPut = (dispatch, url, body) => {
  return fetch(API_URL + url, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body),
  });
};

export const doGet = (dispatch, url) => {
  return fetch(API_URL + url, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
  }).then(
    (res) => res.json(),
    (error) => {
      console.log(error);
    }
  );
};

export const doDelete = (dispatch, token, url) => {
  return fetch(API_URL + url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    },
  }).then(
    (res) => res.json(),
    (error) => {
      console.log(error);
    }
  );
};

export const axiosPost = (dispatch, url, data) => {
  return axios.post(API_URL + url, data, {
    headers: {
      "content-type": "application/json"
    },
  });
};

export const axiosGet = (dispatch, url) => {
  return axios.get(API_URL + url, {
    headers: {
      "content-type": "application/json"
    },
  });
};

export const axiosPut = (dispatch, url, data) => {
  return axios.put(API_URL + url, data, {
    headers: {
      "content-type": "application/json"
    },
  });
};
