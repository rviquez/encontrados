import LoginRepository from './loginRepository'

const repositories = {
  login: LoginRepository
  // other repositories ...
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
