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
        ◀
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-[37px] h-[34px] flex items-center justify-center rounded-[8px] ${
            currentPage === page ? "bg-[#2C2C2C] text-white" : "bg-[#AEAEAE] hover:bg-[#2C2C2C] text-white"
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
        ▶
      </button>
    </div>
  )
}
