import pino, { SerializedError } from 'pino'
import * as pinoStdSerializers from 'pino-std-serializers'
import { AxiosError } from 'axios'

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

const format = (o: { msg: string, duration: number, service: string }) => {
  const { msg, duration, service } = o || {}
  const durationString = duration ? ` %c(${duration}ms)` : ''

  return [`%c${service || ''}%c ${msg}${durationString}`, '']
}

function isAxiosError(error: Error | AxiosError): error is AxiosError {
  return (error as AxiosError)?.isAxiosError
}

/**
 * The err serializer works for nested objects, thanks to this PR: https://github.com/pinojs/pino/pull/896
 */
const serializers = {
  'err': (err: Error | AxiosError): SerializedError => {
    if (isAxiosError(err)) {
      delete err.config
      // TODO: delete buffers and other keys that are not required
    }
    return pinoStdSerializers.err(err)
  }
}

const rootLogger = pino({
  browser: {
    write: {
      trace: pipe(console.debug, format),
      debug: pipe(console.debug, format),
      info: pipe(console.info, format),
      warn: pipe(console.warn, format),
      error: pipe(console.error, format),
      fatal: pipe(console.error, format),
    }
  },
  serializers,
})

export default rootLogger