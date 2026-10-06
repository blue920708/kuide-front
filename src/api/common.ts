import { apiClient } from './client'

let healthCheckTimer: ReturnType<typeof setTimeout> | undefined

export async function health() {
  try {
    const response = await apiClient.get('/api/visit/health')
    console.log('Health check succeeded:', response.status)
  } catch (error) {
    console.warn('Health check failed:', error)
  }

  const delay = (8 * 60 + Math.floor(Math.random() * (2 * 60 + 1))) * 1000

  if (healthCheckTimer) {
    clearTimeout(healthCheckTimer)
  }

  healthCheckTimer = setTimeout(() => {
    void health()
  }, delay)
}
