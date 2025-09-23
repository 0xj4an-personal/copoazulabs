'use client'

import { wagmiAdapter, projectId, metadata, networks } from '@/config/web3'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode, useEffect } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  defaultNetwork: networks[0],
  metadata: metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeMode: 'light', // Set to light mode, will be overridden by CSS
  themeVariables: {
    // Typography - Match your site's Inter font
    '--w3m-font-family': 'Inter, system-ui, -apple-system, sans-serif',
    '--w3m-font-size-master': '14px',
    
    // Colors - Match your Copoazú Labs color palette
    '--w3m-accent': '#3D7DD6', // Brand Primary
    
    // Border radius - Match your site's 8px radius
    '--w3m-border-radius-master': '8px',
    
  }
})

export function Web3Provider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  // Update AppKit theme based on dark mode
  useEffect(() => {
    const updateAppKitTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      const modal = document.querySelector('w3m-modal')
      
      if (modal) {
        const modalElement = modal as HTMLElement
        if (isDark) {
          modalElement.setAttribute('data-theme', 'dark')
          // Update CSS custom properties for dark mode
          modalElement.style.setProperty('--w3m-color-fg-1', '#F5F8FA') // Brand Background for text
          modalElement.style.setProperty('--w3m-color-fg-2', '#C6CED6') // Brand Neutral for secondary text
          modalElement.style.setProperty('--w3m-color-fg-3', '#C6CED6') // Brand Neutral for tertiary text
          modalElement.style.setProperty('--w3m-color-bg-1', '#1B1B2E') // Brand Dark for background
          modalElement.style.setProperty('--w3m-color-bg-2', '#2A2A2A') // Darker background
          modalElement.style.setProperty('--w3m-color-bg-3', '#3A3A3A') // Even darker background
          modalElement.style.setProperty('--w3m-color-overlay', 'rgba(0, 0, 0, 0.8)')
        } else {
          modalElement.setAttribute('data-theme', 'light')
          // Reset to light mode colors
          modalElement.style.setProperty('--w3m-color-fg-1', '#1B1B2E') // Negro Suave for text
          modalElement.style.setProperty('--w3m-color-fg-2', '#C6CED6') // Gris Ceniza for secondary text
          modalElement.style.setProperty('--w3m-color-fg-3', '#C6CED6') // Gris Ceniza for tertiary text
          modalElement.style.setProperty('--w3m-color-bg-1', '#F5F8FA') // Pulpa Crema for background
          modalElement.style.setProperty('--w3m-color-bg-2', '#FFFFFF') // Blanco for secondary background
          modalElement.style.setProperty('--w3m-color-bg-3', '#F5F8FA') // Pulpa Crema for tertiary background
          modalElement.style.setProperty('--w3m-color-overlay', 'rgba(0, 0, 0, 0.4)')
        }
      }
    }

    // Initial check
    updateAppKitTheme()

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateAppKitTheme()
        }
        if (mutation.type === 'childList') {
          // Check if AppKit modal was added
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              if (element.tagName === 'W3M-MODAL' || element.querySelector?.('w3m-modal')) {
                setTimeout(updateAppKitTheme, 100) // Small delay to ensure modal is fully rendered
              }
            }
          })
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => observer.disconnect()
  }, [])

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}