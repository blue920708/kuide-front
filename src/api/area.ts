import { apiClient } from './client'
import type { VisitAreaApiResponse, VisitAreaReq } from '../types/api/visit'
import type { Place } from '../types/place'

export async function fetchAreaPlaces(params: VisitAreaReq, signal?: AbortSignal) {
  const { keyword, ...filters } = params
  const response = await apiClient.get(
    keyword ? '/api/v1/visit/keyword' : '/api/v1/visit/area',
    {
      params: { ...filters, keyword: keyword || undefined },
      signal,
    },
  )

  const data: VisitAreaApiResponse = response.data
  const items = data.data?.items

  if (!Array.isArray(items) || !Number.isFinite(data.data.totalCount)) {
    throw new Error('장소 목록 응답 형식이 올바르지 않습니다.')
  }

  const places: Place[] = items.map((item) => ({
    title: item.title,
    addr1: item.addr1,
    firstimage: item.firstimage || undefined,
    firstimage2: item.firstimage2 || undefined,
    contentid: item.contentid,
    contenttypeid: item.contenttypeid,
    longitude: parseCoordinate(item.mapx, -180, 180),
    latitude: parseCoordinate(item.mapy, -90, 90),
    tel: item.tel || undefined,
    regionCode: item.lDongRegnCd,
    districtCode: item.lDongSignguCd,
    cat1: item.lclsSystm1,
    cat2: item.lclsSystm2,
    cat3: item.lclsSystm3,
  }))

  return { places, totalCount: data.data.totalCount }
}

function parseCoordinate(value: string, min: number, max: number) {
  const coordinate = Number(value)
  return value && Number.isFinite(coordinate) && coordinate >= min && coordinate <= max
    ? coordinate
    : undefined
}
