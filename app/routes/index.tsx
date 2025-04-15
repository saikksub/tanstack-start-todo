import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0')
  )
}

const getCount = createServerFn({ method: 'GET'}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })

const Home = () => {
  const router = useRouter()
  const state = Route.useLoaderData()

  const handleClick = (v: number) => {
    updateCount({ data: v }).then(() => {
      router.invalidate()
    })
  }

  return (
    <div>
      <h1>{state}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button type="button" onClick={() => handleClick(1)}>
          Increment + 1
        </button>
        <button type="button" onClick={() => handleClick(-1)}>
          Decrement - 1
        </button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount()
})
