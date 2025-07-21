export default function Pagination({ currentPage, totalPages, totalResults, onPageChange }) {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="text-sm text-content-secondary">
        Showing {(currentPage - 1) * 10 + 1} to{' '}
        {Math.min(currentPage * 10, totalResults)} of {totalResults} results
      </div>
      <div className="flex gap-2">
        <button
          className="px-2 py-1 rounded border"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`px-2 py-1 rounded ${
              currentPage === i + 1
                ? 'bg-orange-500 text-white'
                : 'border'
            }`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-2 py-1 rounded border"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
