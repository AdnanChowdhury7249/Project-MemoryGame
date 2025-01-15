import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import "../styles/Card.css";
import ScoreBoard from "./Scoreboard";

const Card = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonList = await fetchMultiplePokemon(9);
        setData(pokemonList);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchPokemonById = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching Pokémon with ID ${id}: ${error.message}`);
      return null;
    }
  };

  const fetchMultiplePokemon = async (num) => {
    const uniqueIds = new Set();
    while (uniqueIds.size < num) {
      const randomId = Math.floor(Math.random() * 50) + 1;
      uniqueIds.add(randomId);
    }
    const promises = Array.from(uniqueIds).map((id) => fetchPokemonById(id));
    const results = await Promise.all(promises);
    return results.filter((pokemon) => pokemon !== null);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleClick = (cardName) => {
    if (selectedCards.includes(cardName)) {
      setGameOver(true);
      updateHighScore(selectedCards.length);
    } else {
      setSelectedCards((prev) => [...prev, cardName]);
      setData((prev) => shuffleArray(prev));
      updateHighScore(selectedCards.length + 1);
    }
  };

  const currentScore = () => selectedCards.length;

  const updateHighScore = (currentScore) => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
    }
  };


  const resetGame = () => {
    setSelectedCards([]);
    setGameOver(false);

  };
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : gameOver ? (
        <div>
          <p>Game Over! You clicked the same card twice.</p>
          <button onClick={resetGame}>Restart Game</button>
        </div>
      ) : (

        <div className="pokemonGrid">
          {data.map((pokemon, index) => (
            <CardComponent
              key={index}
              name={pokemon.name}
              image={pokemon.sprites.front_shiny}
              onClick={() => handleClick(pokemon.name)}
            />

          ))}
        </div>
      )}
      <ScoreBoard score={currentScore()} highScore={highScore} />
    </div>

  );
};

export default Card;
