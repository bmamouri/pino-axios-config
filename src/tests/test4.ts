import rootLogger from '../rootLogger'

(async function main() {
  try {
    throw new Error('Hello')
  } catch (err) {
    rootLogger.error({ err })
  }
})()