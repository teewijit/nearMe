import axios from 'axios'
import swal from 'sweetalert'
import Swal from 'sweetalert2'

let URI_API = process.env.NEXT_PUBLIC_SERVER_ENDPOINT + '/api'
let swalOption = {
  buttons: {
    cancel: false,
    confirm: true
  },
  closeOnClickOutside: true,
  closeOnEsc: true,
  timer: 1500
}
const get = async (url, parameter) => {
  try {
    const result = await axios.get(`${URI_API}${url}`, {
      params: parameter,
      withCredentials: true
    })
    return result.data
  } catch (err) {
    if (!err.response) {
      swal(`Unknown error`, { ...swalOption, icon: 'error' })
      return false
    }
    if (err.response.status === 401) {
      window.location.href = '/login'
    } else {
      swal(err?.response?.data?.message || 'Unknown error', {
        ...swalOption,
        icon: 'error'
      })
    }
    return false
  }
}


const post = async (url, data, option) => {
  try {
    let result = await axios.post(`${URI_API}${url}`, data, {
      withCredentials: true
    })
    if (result.data.status) {
      Swal.fire({
        title: result.data.message,
        text: result.message,
        icon: result.data.status ? 'success' : 'error',
        timer: 5000,
      });
      return result.data
    } else {
      if (option?.disabledAlert) return false
      Swal.fire({
        title: result.data.message,
        text: result.message,
        icon: result.data.status ? 'success' : 'error'
      })
      return false
    }
  } catch (err) {
    if (!err.response) {
      Swal.fire(`Unknown error`, { ...swalOption, icon: 'error' })
      return false
    }
    if (err.response.status === 401) {
      window.location.href = '/'
    } else {
      Swal.fire(err?.response?.data?.message || 'Unknown error', {
        ...swalOption,
        icon: 'error'
      })
    }
    return false
  }
}

const put = async (url, data) => {
  try {
    let result = await axios.put(`${URI_API}${url}`, data)
    if (result.data.status) {
      return result.data
    } else {
      swal(result.data.message, { ...swalOption, icon: 'error' })
      return false
    }
  } catch (err) {
    if (!err.response) {
      swal(`Unknown error`, { ...swalOption, icon: 'error' })
      return false
    }
    if (err.response.status === 401) {
      window.location.href = '/login'
    } else {
      swal(err?.response?.data?.message || 'Unknown error', {
        ...swalOption,
        icon: 'error'
      })
    }
    return false
  }
}
const deleted = async (url, data) => {
  try {
    let result = await axios.put(`${URI_API}${url}`, data)
    if (result.data.status) {
      return result.data
    } else {
      swal(result.data.message, { ...swalOption, icon: 'error' })
      return false
    }
  } catch (err) {
    if (!err.response) {
      swal(`Unknown error`, { ...swalOption, icon: 'error' })
      return false
    }
    if (err.response.status === 401) {
      window.location.href = '/login'
    } else {
      swal(err?.response?.data?.message || 'Unknown error', {
        ...swalOption,
        icon: 'error'
      })
    }
    return false
  }
}

const AxiosControl = {
  get,
  post,
  put,
  deleted
}

export default AxiosControl
