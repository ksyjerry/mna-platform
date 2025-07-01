"use client"

import { useState } from "react"

interface KoreaMapProps {
  selectedRegion: string
  onRegionClick: (region: string) => void
}

export default function KoreaMap({ selectedRegion, onRegionClick }: KoreaMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const handleRegionClick = (regionId: string) => {
    onRegionClick(regionId === selectedRegion ? "all" : regionId)
  }

  // 모든 지역을 완전히 투명하게 처리
  const getRegionOpacity = () => "0"

  const getRegionColor = (regionId: string) => {
    if (selectedRegion === regionId) {
      return "#f59e0b" // amber-500
    }
    return "#fbbf24" // amber-400
  }

  return (
    <div className="w-full">
      <div className="w-full h-auto max-h-80 flex items-center justify-center relative">
        {/* 배경 지도 */}
        <img src="/south-korea-map-new.svg" alt="대한민국 지도" className="w-full h-auto max-h-80 object-contain" />

        {/* 투명한 클릭 가능한 영역들 */}
        {/* SVG viewBox를 실제 지도와 맞춤 */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" style={{ maxHeight: "320px" }}>
          {/* 수도권 영역 (서울, 경기, 인천 - 지도 상단 중앙) */}
          <g
            className="region-group cursor-pointer transition-all duration-200"
            onClick={() => handleRegionClick("수도권")}
            onMouseEnter={() => setHoveredRegion("수도권")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M350 120 L450 110 L480 140 L470 230 L440 250 L400 240 L360 220 L340 140 Z"
              fill="transparent"
              fillOpacity="0"
              stroke="transparent"
            />
            {/* 텍스트 표시 제거 (완전히 투명하게 처리하므로) */}
          </g>

          {/* 강원 영역 (지도 상단 우측) */}
          <g
            className="region-group cursor-pointer transition-all duration-200"
            onClick={() => handleRegionClick("강원")}
            onMouseEnter={() => setHoveredRegion("강원")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M480 90 L580 80 L600 120 L590 220 L560 230 L520 220 L480 200 Z"
              fill="transparent"
              fillOpacity="0"
              stroke="transparent"
            />
            {/* 텍스트 표시 제거 (완전히 투명하게 처리하므로) */}
          </g>

          {/* 충청 영역 (지도 중앙) */}
          <g
            className="region-group cursor-pointer transition-all duration-200"
            onClick={() => handleRegionClick("충청")}
            onMouseEnter={() => setHoveredRegion("충청")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M320 190 L440 200 L460 240 L450 340 L410 360 L370 350 L330 320 L310 220 Z"
              fill="transparent"
              fillOpacity="0"
              stroke="transparent"
            />
            {/* 텍스트 표시 제거 (완전히 투명하게 처리하므로) */}
          </g>

          {/* 경상 영역 (지도 우측 하단) */}
          <g
            className="region-group cursor-pointer transition-all duration-200"
            onClick={() => handleRegionClick("경상")}
            onMouseEnter={() => setHoveredRegion("경상")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M460 170 L580 180 L620 220 L630 350 L610 410 L570 430 L520 420 L480 390 L460 340 L460 240 Z"
              fill="transparent"
              fillOpacity="0"
              stroke="transparent"
            />
            {/* 텍스트 표시 제거 (완전히 투명하게 처리하므로) */}
          </g>

          {/* 전라 영역 (지도 좌측 하단) */}
          <g
            className="region-group cursor-pointer transition-all duration-200"
            onClick={() => handleRegionClick("전라")}
            onMouseEnter={() => setHoveredRegion("전라")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M310 300 L410 310 L450 340 L440 450 L400 480 L350 470 L310 440 L290 340 Z"
              fill="transparent"
              fillOpacity="0"
              stroke="transparent"
            />
            {/* 텍스트 표시 제거 (완전히 투명하게 처리하므로) */}
          </g>

          {/* 제주 영역 (지도 최하단) */}
          <g
            className="region-group cursor-pointer transition-all duration-200"
            onClick={() => handleRegionClick("제주")}
            onMouseEnter={() => setHoveredRegion("제주")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M280 450 L350 445 L360 470 L340 550 L290 555 L270 540 Z"
              fill="transparent"
              fillOpacity="0"
              stroke="transparent"
            />
            {/* 텍스트 표시 제거 (완전히 투명하게 처리하므로) */}
          </g>
        </svg>
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">지역을 클릭하여 필터링하세요</p>
    </div>
  )
}
