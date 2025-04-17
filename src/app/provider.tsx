"use client"

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { ReactNode } from "react"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
})

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryClientProvider>
  )
}
