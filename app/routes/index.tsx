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

  const handleClick = () => {
    updateCount({ data: 1 }).then(() => {
      router.invalidate()
    })
  }

  return (
    <button type="button" onClick={handleClick}>
      Add 1 to {state}
    </button>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount()
})
