"use client"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
        aria-label="Previous page"
      >
        ←
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            currentPage === page ? "bg-gray-800 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
        aria-label="Next page"
      >
        →
      </button>
    </div>
  )
}
