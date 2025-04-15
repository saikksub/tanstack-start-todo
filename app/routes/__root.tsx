import type { ReactNode } from 'react'

import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts
} from '@tanstack/react-router'

function RootComponent () {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Tanstack Start Todo App'}
    ]
  }),
  component: RootComponent
})
