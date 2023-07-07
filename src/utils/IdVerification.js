import axios from 'axios'

const serverUrl = import.meta.env.VITE_SERVER_URL

export const create = async (payload) => {
  const url = `${serverUrl}/CreateApplicant`

  const { data } = await axios.post(url, payload)

  return data
}

export const updateEvent = async (payload) => {
  const url = `${serverUrl}/UpdateEvent`

  const { data } = await axios.put(url, payload)

  return data
}

export const createCheck = async (payload) => {
  const url = `${serverUrl}/CreateCheck`

  const { data } = await axios.post(url, payload)

  return data
}

export const getCheckAPI = async (checkId) => {
  const url = `${serverUrl}/Check/${checkId}`

  const { data } = await axios.get(url)

  return data
}

export const getReports = async (checkId) => {
  const url = `${serverUrl}/Reports/${checkId}`

  const { data } = await axios.get(url)

  return data
}

export const getReport = async (reportId) => {
  const url = `${serverUrl}/Report/${reportId}`

  const { data } = await axios.get(url)

  return data
}

export const getAutofillData = async (documentId) => {
  const url = `${serverUrl}/Autofill/${documentId}`

  const { data } = await axios.get(url)

  return data
}
