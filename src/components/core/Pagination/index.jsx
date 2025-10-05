export default function Pagination({ currentPage, totalPages, onPage }) {
  const page = 1;
  const range = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - page && i <= currentPage + page)) {
      range.push(i);
    }
  }
  
  const dots = [];
  let prev = 0;
  for (const r of range) {
    if (prev + 1 < r) dots.push('...');
    dots.push(r);
    prev = r;
  }

  return (
    <div className="flex justify-center items-center gap-2 text-white">
      <button
        onClick={() => onPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg glass disabled:opacity-50"
      >
        Previous
      </button>

      {dots.map((item, idx) =>
        typeof item === 'number' ? (
          <button
            key={idx}
            onClick={() => onPage(item)}
            className={`px-3 py-2 rounded-lg ${currentPage === Number(item) ? "bg-white/30 opacity-70" : "glass"}`}
          >
            {item}
          </button>
        ) : (
          <span key={idx} className="px-2">
            ...
          </span>
        )
      )}

      <button
        onClick={() => onPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg glass disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};