import { apiClient } from './client'
import type { VisitLclsSystmApiResponse } from '../types/api/visit'
import type { Category } from '../types/place'

export async function fetchCategories() {
  const response = await apiClient.get('/api/v1/visit/lclsSystm', {
    params: {
      lclsSystmListYn: 'Y',
    },
  })

  const data: VisitLclsSystmApiResponse = response.data
  const categories: Category[] = []

  for (const item of data.data.items) {
    if (!item.lclsSystm1Cd || !item.lclsSystm1Nm) continue

    let category1 = categories.find((category) => {
      return category.code === item.lclsSystm1Cd
    })

    if (!category1) {
      category1 = {
        code: item.lclsSystm1Cd,
        name: item.lclsSystm1Nm,
        children: [],
      }
      categories.push(category1)
    }

    if (!item.lclsSystm2Cd || !item.lclsSystm2Nm) continue

    let category2 = category1.children.find((category) => {
      return category.code === item.lclsSystm2Cd
    })

    if (!category2) {
      category2 = {
        code: item.lclsSystm2Cd,
        name: item.lclsSystm2Nm,
        children: [],
      }
      category1.children.push(category2)
    }

    if (!item.lclsSystm3Cd || !item.lclsSystm3Nm) continue

    const category3AlreadyAdded = category2.children.some((category) => {
      return category.code === item.lclsSystm3Cd
    })

    if (!category3AlreadyAdded) {
      category2.children.push({
        code: item.lclsSystm3Cd,
        name: item.lclsSystm3Nm,
        children: [],
      })
    }
  }

  return categories
}
