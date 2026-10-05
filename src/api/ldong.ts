import { apiClient } from './client'
import type { VisitLdongApiResponse } from '../types/api/visit'
import type { Region } from '../types/place'

export async function fetchLdongRegions() {
  const response = await apiClient.get('/api/v1/visit/ldong', {
    params: {
      lDongListYn: 'Y',
    },
  })

  const data: VisitLdongApiResponse = response.data
  const items = data.data.items

  if (!Array.isArray(items)) {
    throw new Error('지역 목록 응답 형식이 올바르지 않습니다.')
  }

  const regions: Region[] = []

  for (const item of items) {
    if (!item.lDongRegnCd || !item.lDongRegnNm) continue

    let region = regions.find((currentRegion) => {
      return currentRegion.code === item.lDongRegnCd
    })

    if (!region) {
      region = {
        code: item.lDongRegnCd,
        name: item.lDongRegnNm,
        districts: [],
      }
      regions.push(region)
    }

    if (!item.lDongSignguCd || !item.lDongSignguNm) continue

    const districtAlreadyAdded = region.districts.some((district) => {
      return district.code === item.lDongSignguCd
    })

    if (!districtAlreadyAdded) {
      region.districts.push({
        code: item.lDongSignguCd,
        name: item.lDongSignguNm,
      })
    }
  }

  return regions
}
