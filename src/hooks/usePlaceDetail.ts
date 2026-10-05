import { useEffect, useState } from 'react'
import { fetchPlaceDetail } from '../api/detail'
import type { PlaceDetailData } from '../types/place'

export function usePlaceDetail(contentId: string) {
  const [detail, setDetail] = useState<PlaceDetailData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadPlaceDetail() {
      setIsLoading(true)
      setError('')

      try {
        const result = await fetchPlaceDetail(contentId, controller.signal)
        setDetail(result)
      } catch (caughtError) {
        if (controller.signal.aborted) return

        console.error('장소 상세를 불러오지 못했습니다.', caughtError)
        setError('장소 상세를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.')
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadPlaceDetail()

    return () => controller.abort()
  }, [contentId])

  return { detail, isLoading, error }
}
