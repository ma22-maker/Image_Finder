import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import React from 'react'
 
const queryClient = new QueryClient

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
     <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
     </QueryClientProvider>
  )
}

export default Layout
