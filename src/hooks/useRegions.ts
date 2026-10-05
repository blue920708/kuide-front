import { useEffect, useState } from 'react'
import { fetchLdongRegions } from '../api/ldong'
import type { Region } from '../types/place'

export function useRegions() {
  const [regions, setRegions] = useState<Region[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadRegions() {
      try {
        const loadedRegions = await fetchLdongRegions()
        setRegions(loadedRegions)
      } catch (error) {
        console.error('지역 목록을 불러오지 못했습니다.', error)
      } finally {
        setIsLoading(false)
      }
    }

    void loadRegions()
  }, [])

  return { regions, isLoading }
}
