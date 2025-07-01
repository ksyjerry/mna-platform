export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* 메인 Footer 콘텐츠 */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-8">
          {/* 회사 정보 */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/pwc_logo_light.png" alt="PwC Logo" className="h-20 w-auto" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              삼일회계법인은 PwC 글로벌 네트워크의 일원으로서 최고 수준의 M&A 자문 서비스를 제공합니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 서비스 */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">서비스</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-200">
                  M&A 자문
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-200">
                  기업가치평가
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-200">
                  실사 서비스
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-200">
                  세무 자문
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-200">
                  PMI 지원
                </a>
              </li>
            </ul>
          </div>

          {/* 업계 전문성 */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">업계 전문성</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-200">
                  IT/AI
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-200">
                  헬스케어
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-200">
                  반도체/2차전지
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-200">
                  뷰티
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-200">
                  F&B
                </a>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">연락처</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg
                  className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-gray-600 text-sm">
                  서울특별시 용산구 한강대로 100
                  <br />
                  삼일회계법인
                </p>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-gray-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <p className="text-gray-600 text-sm">02-709-3131</p>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-gray-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-600 text-sm">ma.platform@pwc.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* 저작권 정보 */}
            <div className="flex items-center gap-2">
              <img src="/pwc_logo_light.png" alt="PwC Logo" className="h-12 w-auto" />
              <p className="text-gray-500 text-sm">
                © 2015 - 2025 PwC. Samil PricewaterhouseCoopers. All rights reserved.
              </p>
            </div>

            {/* 법적 링크들 */}
            <div className="flex flex-wrap gap-6">
              <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition-colors duration-200">
                개인정보 처리방침
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition-colors duration-200">
                Cookie policy
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition-colors duration-200">
                Legal disclaimer
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition-colors duration-200">
                Site map
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition-colors duration-200">
                Offices worldwide
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
