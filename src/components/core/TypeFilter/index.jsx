export default function TypeFilter({ types, selectedType, onSelect }) {
  return (
    <>
      <button
        onClick={() => onSelect('')}
        className={`px-4 py-2 rounded-lg text-white ${!selectedType ? "bg-white/30 opacity-70" : "glass"}`}
      >
        All Types
      </button>
      {types.map(type => (
        <button
          key={type.name}
          onClick={() => onSelect(type.name)}
          className={`px-4 py-2 rounded-lg text-white capitalize ${selectedType === type.name ? "bg-white/30 opacity-70" : "glass"}`}
        >
          {type.name}
        </button>
      ))}
    </>
  );
};