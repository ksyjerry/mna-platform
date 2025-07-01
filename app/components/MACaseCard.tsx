"use client"

import type { MACaseItem } from "@/lib/types/ma-cases"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Calendar, TrendingUp } from "lucide-react"

interface MACaseCardProps {
  case: MACaseItem
}

export default function MACaseCard({ case: caseItem }: MACaseCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 h-full">
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
              {caseItem.project_name}
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
              No. {caseItem.project_number}
            </Badge>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{caseItem.target_company}</h3>
        </div>

        {/* Key Info */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-gray-600">업종:</span>
            <span className="font-medium truncate">{caseItem.industry}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-gray-600">지역:</span>
            <span className="font-medium">{caseItem.region}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-gray-600">구조:</span>
            <span className="font-medium truncate">{caseItem.deal_structure}</span>
          </div>
        </div>

        {/* Deal Size */}
        <div className="bg-orange-50 rounded-lg p-3 mb-4">
          <p className="text-sm font-semibold text-orange-800">{caseItem.deal_size}</p>
        </div>

        {/* Investment Highlights */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">주요 특징</h4>
          <ul className="space-y-1">
            {caseItem.investment_highlights.slice(0, 2).map((highlight, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-orange-500 font-bold flex-shrink-0">•</span>
                <span className="line-clamp-2">{highlight}</span>
              </li>
            ))}
            {caseItem.investment_highlights.length > 2 && (
              <li className="text-xs text-gray-400">+{caseItem.investment_highlights.length - 2}개 더보기</li>
            )}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{new Date(caseItem.completion_date).toLocaleDateString("ko-KR")}</span>
          </div>
          <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">{caseItem.advisor}</div>
        </div>
      </CardContent>
    </Card>
  )
}
