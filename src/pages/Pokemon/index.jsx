/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDebounce } from '../../hooks/useDebounce';
import SearchBar from '../../components/core/SearchBar';
import TypeFilter from '../../components/core/TypeFilter';
import Pagination from '../../components/core/Pagination';
import LoadingSpinner from '../../components/core/LoadingSpinner';

export default function ListPokemonPage() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const LIMIT = 12;

  const fetchTypes = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      setTypes(response.data.results);
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/generation/1');
      const pokemonUrls = response.data.pokemon_species.map(item => item.url);

      const pokemonDetails = await Promise.all(
        pokemonUrls.map(url =>
          axios.get(`https://pokeapi.co/api/v2/pokemon/${url.split('/').filter(Boolean).pop()}`)
        )
      );

      let allPokemon = pokemonDetails.map(res => res.data);

      if (debouncedSearchTerm.trim() !== '') {
        allPokemon = allPokemon.filter(item =>
          item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
      };

      if (selectedType) {
        allPokemon = allPokemon.filter(item =>
          item.types.some(type => type.type.name === selectedType)
        );
      };

      const startIndex = (currentPage - 1) * LIMIT;
      const endIndex = startIndex + LIMIT;
      const paginatedPokemon = allPokemon.slice(startIndex, endIndex);

      setPokemon(paginatedPokemon);
      setTotalPages(Math.ceil(allPokemon.length / LIMIT));
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const typeFromUrl = searchParams.get('type') || '';
    setSelectedType(typeFromUrl);
    fetchTypes();
  }, [currentPage, debouncedSearchTerm]);

  useEffect(() => {
    fetchPokemon();
  }, [currentPage, selectedType]);

  useEffect(() => {
    setCurrentPage(1);
    fetchPokemon();
  }, [debouncedSearchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleTypeFilter = (type) => {
    setSelectedType(type)
    setSearchParams(type ? { type } : {})
    setCurrentPage(1)
  }

  if(loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Pokemon Generation 1
      </h1>

      <div className="mb-6">
        <SearchBar
          type="text"
          value={searchTerm}
          onSearch={handleSearch}
          placeholder="Search Pokemon by name..."
        />
      </div>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <TypeFilter
          types={types}
          selectedType={selectedType}
          onSelect={handleTypeFilter}
        />
      </div>

      {pokemon.length === 0 ? (
        <div className="text-center text-white text-xl mt-40">
          Pokemon tidak ditemukan
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {pokemon.map(item => (
              <Link
                key={item.id}
                to={`/pokemon/detail/${item.id}`}
                className="glass p-4 rounded-lg transform hover:scale-105 transition-transform"
              >
                <img
                  src={item.sprites.front_default}
                  alt={item.name}
                  className="w-full h-48 object-contain"
                />
                <h3 className="text-xl font-bold text-white capitalize text-center mt-2">
                  {item.name}
                </h3>
                <div className="flex justify-center gap-2 mt-2">
                  {item.types.map(type => (
                    <span
                      key={type.type.name}
                      className="px-2 py-1 glass bg-opacity-30 rounded text-white text-sm capitalize"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </>
      )};
      {pokemon.length > 0 && (
        <div
          className="grid grid-cols-3 max-md:grid-cols-1 max-md:text-center gap-y-3 items-center"
        >
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};