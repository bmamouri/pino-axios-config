import { runTestFile } from './utils'

const table = ['test1.ts', 'test2.ts', 'test3.ts', 'test4.ts']

describe.each(table)('%s', (fileName) => {
  it('should redact axios config', async () => {
    const output = await runTestFile(fileName)
    expect(output.err.config).toBeUndefined()
  })
})
