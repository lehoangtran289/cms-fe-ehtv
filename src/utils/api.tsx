import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const API_URL = publicRuntimeConfig.api.host
export const doPost = (url, body) => {
  return fetch(API_URL + url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const doPut = (url, body) => {
  return fetch(API_URL + url, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const doGet = url => {
  console.log(API_URL + url)
  return fetch(API_URL + url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }).then(
    res => res.json(),
    error => {
      console.log(error)
    }
  )
}

export const doDelete = url => {
  return fetch(API_URL + url, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  }).then(
    res => res.json(),
    error => {
      console.log(error)
    }
  )
}

export const axiosPost = (url, data) => {
  return axios.post(API_URL + url, data, {
    headers: {
      'content-type': 'application/json'
    }
  })
}

export const axiosGet = url => {
  return axios.get(API_URL + url, {
    headers: {
      'content-type': 'application/json'
    }
  })
}

export const axiosPut = (url, data) => {
  return axios.put(API_URL + url, data, {
    headers: {
      'content-type': 'application/json'
    }
  })
}
