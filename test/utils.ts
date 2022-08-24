import { spawn } from 'child_process'
import path from 'path'

export function getTestFilePath(testFilename: string) {
  return path.join(__dirname, testFilename)
}

export function utils(command: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args)

    let output = ''
    child.stdout.on('data', (data) => {
      output += data.toString()
    })
    child.stdout.on('error', reject)
    child.on('close', () => resolve(output))
  })
}

export async function runTestFile(fileName: string) {
  const testFilePath = getTestFilePath(fileName)
  return JSON.parse(await utils('ts-node', [testFilePath]))
}