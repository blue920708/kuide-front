import { useEffect, useState } from 'react'
import { fetchAreaPlaces } from '../api/area'
import type { VisitAreaReq } from '../types/api/visit'
import type { Place } from '../types/place'

export function usePlaces(params: VisitAreaReq) {
  const [places, setPlaces] = useState<Place[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const {
    arrange,
    contentTypeId,
    keyword,
    lDongRegnCd,
    lDongSignguCd,
    lclsSystm1,
    lclsSystm2,
    lclsSystm3,
    modifiedtime,
    numOfRows,
    pageNo,
  } = params

  useEffect(() => {
    const controller = new AbortController()

    async function loadPlaces() {
      setIsLoading(true)
      setError('')

      try {
        const result = await fetchAreaPlaces(
          {
            arrange,
            contentTypeId,
            keyword,
            lDongRegnCd,
            lDongSignguCd,
            lclsSystm1,
            lclsSystm2,
            lclsSystm3,
            modifiedtime,
            numOfRows,
            pageNo,
          },
          controller.signal,
        )
        setPlaces(result.places)
        setTotalCount(result.totalCount)
      } catch (caughtError) {
        if (controller.signal.aborted) return

        console.error('장소 목록을 불러오지 못했습니다.', caughtError)
        setError('장소 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.')
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadPlaces()

    return () => controller.abort()
  }, [
    arrange,
    contentTypeId,
    keyword,
    lDongRegnCd,
    lDongSignguCd,
    lclsSystm1,
    lclsSystm2,
    lclsSystm3,
    modifiedtime,
    numOfRows,
    pageNo,
  ])

  return { places, totalCount, isLoading, error }
}
