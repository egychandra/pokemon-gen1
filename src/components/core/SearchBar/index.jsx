export default function SearchBar({
  type = 'text',
  value,
  onSearch,
  placeholder = 'Search...'
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onSearch}
      placeholder={placeholder}
      className="w-full max-w-md mx-auto block p-3 rounded-lg glass text-white placeholder-white"
    />
  );
};