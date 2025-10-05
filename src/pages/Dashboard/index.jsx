import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import LoadingSpinner from '../../components/core/LoadingSpinner';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardPage() {
  const [typeData, setTypeData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTypeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/generation/1');
      const pokemonUrls = response.data.pokemon_species.map(item => item.url);
      
      const typeCount = {};
      
      for (const url of pokemonUrls) {
        const pokemonId = url.split('/').filter(Boolean).pop();
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        
        pokemonResponse.data.types.forEach(type => {
          const typeName = type.type.name
          typeCount[typeName] = (typeCount[typeName] || 0) + 1
        });
      };
      
      setTypeData(typeCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypeData();
  }, []);

  const handleChartClick = (type) => {
    navigate(`/pokemon?type=${type}`);
  };

  const colorsPalette = [
  '#000000',
  '#0D0D0D',
  '#1A1A1A',
  '#272727',
  '#343434',
  '#414141',
  '#4E4E4E',
  '#5B5B5B',
  '#686868',
  '#757575',
  '#828282',
  '#8F8F8F',
  '#9C9C9C',
  '#A9A9A9',
  '#B6B6B6',
  '#C3C3C3',
  '#FFFFFF'
];

  const chartData = {
    labels: Object.keys(typeData),
    datasets: [
      {
        data: Object.values(typeData),
        backgroundColor: colorsPalette,
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          padding: 20
        }
      },
      tooltip: {
        titleColor: '#fff',
        bodyColor: '#fff',
        backgroundColor: 'rgba(76, 73, 73, 0.7)'
      },
    },
    onClick: (_, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index
        const type = Object.keys(typeData)[index]
        handleChartClick(type)
      }
    }
  };

  if(loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Pokemon Generation 1
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(typeData).map(([type, count]) => (
          <div
            key={type}
            className="glass p-6 rounded-lg cursor-pointer transform hover:scale-105 transition-transform"
            onClick={() => handleChartClick(type)}
          >
            <h3 className="text-2xl font-bold text-white capitalize mb-2">{type}</h3>
            <p className="text-white text-lg">{count} Pokemon</p>
          </div>
        ))}
      </div>

      <div className="mt-12 glass p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Pokemon Type Chart</h2>
        <div className="relative w-full h-120">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};