import type { FormEvent } from 'react'
import { useRegions } from '../hooks/useRegions'
import { useCategories } from '../hooks/useCategories'
import { contentTypes } from '../types/place'

type PlaceSearchFormProps = {
  region: string
  district: string
  contentType: string
  category1: string
  category2: string
  category3: string
  keyword: string
  onRegionChange: (value: string) => void
  onDistrictChange: (value: string) => void
  onContentTypeChange: (value: string) => void
  onCategory1Change: (value: string) => void
  onCategory2Change: (value: string) => void
  onCategory3Change: (value: string) => void
  onKeywordChange: (value: string) => void
  onSubmit: (event: FormEvent) => void
  onReset: () => void
}

export function PlaceSearchForm({
  region,
  district,
  contentType,
  category1,
  category2,
  category3,
  keyword,
  onRegionChange,
  onDistrictChange,
  onContentTypeChange,
  onCategory1Change,
  onCategory2Change,
  onCategory3Change,
  onKeywordChange,
  onSubmit,
  onReset,
}: PlaceSearchFormProps) {
  const regionData = useRegions()
  const categoryData = useCategories()

  const selectedRegion = regionData.regions.find((item) => {
    return item.code === region
  })
  const selectedCategory1 = categoryData.categories.find((item) => {
    return item.code === category1
  })
  const selectedCategory2 = selectedCategory1?.children.find((item) => {
    return item.code === category2
  })

  return (
    <section className="search-panel" id="search">
      <div className="panel-heading">
        <div>
          <h2>조건으로 찾기</h2>
        </div>
        <button className="reset-button" type="button" onClick={onReset}>
          초기화
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <div className="filter-grid">
          <label>
            지역
            <select
              value={region}
              onChange={(event) => onRegionChange(event.target.value)}
              disabled={regionData.isLoading}
            >
              <option value="">
                {regionData.isLoading ? '지역 불러오는 중...' : '지역 선택'}
              </option>
              {regionData.regions.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            시·군·구
            <select
              value={district}
              onChange={(event) => onDistrictChange(event.target.value)}
              disabled={!region || regionData.isLoading}
            >
              <option value="">시·군·구 선택</option>
              {selectedRegion?.districts.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            관광 유형
            <select
              value={contentType}
              onChange={(event) => onContentTypeChange(event.target.value)}
            >
              <option value="">전체 유형</option>
              {contentTypes.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            대분류
            <select
              value={category1}
              onChange={(event) => onCategory1Change(event.target.value)}
              disabled={categoryData.isLoading}
            >
              <option value="">
                {categoryData.isLoading ? '분류 불러오는 중...' : '대분류'}
              </option>
              {categoryData.categories.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            중분류
            <select
              value={category2}
              onChange={(event) => onCategory2Change(event.target.value)}
              disabled={!selectedCategory1 || categoryData.isLoading}
            >
              <option value="">중분류</option>
              {selectedCategory1?.children.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            소분류
            <select
              value={category3}
              onChange={(event) => onCategory3Change(event.target.value)}
              disabled={!selectedCategory2 || categoryData.isLoading}
            >
              <option value="">소분류</option>
              {selectedCategory2?.children.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="keyword-field">
            검색어
            <div className="input-with-icon">
              <input
                type="search"
                value={keyword}
                onChange={(event) => onKeywordChange(event.target.value)}
                placeholder="장소명, 주소를 검색해보세요"
                aria-label="여행지 키워드 검색"
              />
              <span>⌕</span>
            </div>
          </label>
          <button className="search-button" type="submit">
            관광지 찾기 <span>↗</span>
          </button>
        </div>
      </form>
    </section>
  )
}