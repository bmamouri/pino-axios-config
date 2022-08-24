import rootLogger from '../rootLogger'
import apiClient from './apiClient'

(async function main() {
  try {
    await apiClient.get('not-exist')
  } catch (err) {
    rootLogger.error(err)
  }
})()