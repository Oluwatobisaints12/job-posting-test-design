"use client"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // For mobile, only show a limited number of page buttons
  const getVisiblePages = () => {
    // On small screens, show fewer pages
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const maxVisiblePages = isMobile ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always include first, last, current, and pages around current
    const pages = new Set<number>();
    pages.add(1); // First page
    pages.add(totalPages); // Last page
    pages.add(currentPage); // Current page

    // Add pages around current
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.add(i);
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50 hover:bg-gray-200 transition-colors"
        aria-label="Previous page"
      >
        ◀
      </button>

      {visiblePages.map((page, index) => {
        // Add ellipsis if there's a gap
        const showEllipsisBefore = index > 0 && page > visiblePages[index - 1] + 1;

        return (
          <div key={page} className="flex items-center">
            {showEllipsisBefore && (
              <span className="px-1 text-gray-500">...</span>
            )}
            <button
              onClick={() => onPageChange(page)}
              className={`w-[37px] h-[34px] flex items-center justify-center rounded-[8px] transition-colors ${
                currentPage === page ? "bg-[#2C2C2C] text-white" : "bg-[#AEAEAE] hover:bg-[#2C2C2C] text-white"
              }`}
            >
              {page}
            </button>
          </div>
        );
      })}

      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50 hover:bg-gray-200 transition-colors"
        aria-label="Next page"
      >
        ▶
      </button>
    </div>
  )
}
