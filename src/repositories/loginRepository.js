import Repository from './Repository'

const resource = '/Account/SigIn'
export default {
  getLogin (payload) {
    return Repository.post(`${resource}`, payload)
  }
}
