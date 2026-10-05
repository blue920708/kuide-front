import { useEffect, useState } from 'react'
import { fetchCategories } from '../api/categories'
import type { Category } from '../types/place'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadCategories() {
      try {
        const loadedCategories = await fetchCategories()
        setCategories(loadedCategories)
      } catch (error) {
        console.error('분류 목록을 불러오지 못했습니다.', error)
      } finally {
        setIsLoading(false)
      }
    }

    void loadCategories()
  }, [])

  return { categories, isLoading }
}
