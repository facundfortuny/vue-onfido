import axios from 'axios'

const host = `http://localhost:3000`

export const create = async (payload) => {
  const url = `${host}/CreateApplicant`

  const { data } = await axios.post(url, payload)

  return data
}

export const updateEvent = async (payload) => {
  const url = `${host}/UpdateEvent`

  const { data } = await axios.put(url, payload)

  return data
}

export const createCheck = async (payload) => {
  const url = `${host}/CreateCheck`

  const { data } = await axios.post(url, payload)

  return data
}

export const getCheckAPI = async (checkId) => {
  const url = `${host}/Check/${checkId}`

  const { data } = await axios.get(url)

  return data
}

export const getReports = async (checkId) => {
  const url = `${host}/Reports/${checkId}`

  const { data } = await axios.get(url)

  return data
}

export const getReport = async (reportId) => {
  const url = `${host}/Report/${reportId}`

  const { data } = await axios.get(url)

  return data
}

export const getAutofillData = async (documentId) => {
  const url = `${host}/Autofill/${documentId}`

  const { data } = await axios.get(url)

  return data
}
