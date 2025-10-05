/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeftLong } from 'react-icons/fa6';
import LoadingSpinner from '../../../components/core/LoadingSpinner';

export default function DetailPokemonPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonDetail()
  }, [id]);

  const fetchPokemonDetail = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pokemon detail:', error);
      setLoading(false);
    }
  };

  if(loading) return <LoadingSpinner />;

  if(!pokemon) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-xl">Pokemon tidak ditemukan</p>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/pokemon"
        className="inline-block mb-6 px-4 py-2 glass text-white rounded-lg hover:bg-white hover:bg-opacity-20"
      >
        <FaArrowLeftLong className="inline-block"/> Back
      </Link>

      <div className="glass p-8 rounded-lg max-w-2xl mx-auto">
        <div className="text-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-48 h-48 object-contain mx-auto"
          />
          <h1 className="text-4xl font-bold text-white capitalize mt-4">
            {pokemon.name}
          </h1>
          
          <div className="flex justify-center gap-2 mt-4">
            {pokemon.types.map(type => (
              <span
                key={type.type.name}
                className="px-4 py-2 glass rounded-full text-white text-lg capitalize"
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Abilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {pokemon.abilities.map(ability => (
                <div
                  key={ability.ability.name}
                  className="p-3 glass rounded-lg text-white capitalize"
                >
                  {ability.ability.name}
                  {ability.is_hidden && (
                    <span className="ml-2 text-sm opacity-75">(Hidden)</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Stats</h2>
            <div className="space-y-2">
              {pokemon.stats.map(stat => (
                <div key={stat.stat.name} className="flex justify-between items-center">
                  <span className="text-white capitalize">{stat.stat.name}</span>
                  <div className="flex-1 mx-4 glass rounded-full h-4">
                    <div
                      className="bg-white h-4 rounded-full"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    />
                  </div>
                  <span className="text-white">{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};