import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
async function fetchAndWrite() {
  // 1. 从网络获取内容
  const readmeUrl = 'https://raw.githubusercontent.com/free-nodes/clashfree/refs/heads/main/README.md'

  const readme = await (await fetch(readmeUrl)).text()

  const indexBegin = readme.indexOf('```') + 4
  const indexEnd = readme.lastIndexOf('```')

  const text = readme.slice(indexBegin, indexEnd)

  // 2. 确保输出目录存在
  const outDir = path.resolve(process.cwd(), 'data')
  await mkdir(outDir, { recursive: true })

  // 3. 写入文件
  const outPath = path.join(outDir, 'clash.yml')
  await writeFile(outPath, text, 'utf8')
}

export const clash = () => fetchAndWrite().catch(err => {
  console.error('❌ 脚本执行出错：', err)
  process.exit(1)
})
