import React, { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts';
import { v4 as uuidv4 } from 'uuid';
import CharacterList from './components/CharacterList';
import CharacterEditor from './components/CharacterEditor';
import { fetchAllCharacters, saveAllCharacters } from './utils/api';

const DEBUG = true;

function App() {
  const BASE_ATTRIBUTE = 10;
  const MAX_TOTAL_ATTRIBUTES = 70;

  const [characters, setCharacters] = useState([]);
  const [currentCharacterId, setCurrentCharacterId] = useState(null);
  const [newCharacterName, setNewCharacterName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        DEBUG && console.log('Attempting to fetch characters from API...');
        const apiCharacters = await fetchAllCharacters();
        DEBUG && console.log('Characters fetched from API:', apiCharacters);
        setCharacters(apiCharacters);
        if (apiCharacters.length > 0) {
          setCurrentCharacterId(apiCharacters[0].id);
        }
        setIsLoading(false);
      } catch (error) {
        DEBUG && console.error('Failed to fetch characters from API:', error);
        setError('Failed to load characters. Please try again later.');
        setIsLoading(false);
      }
    };

    loadCharacters();
  }, []);

  useEffect(() => {
    DEBUG && console.log('Saving characters to API...');
    // this isnt necessary, but I wanted to do it anyway
    const debounceSave = setTimeout(() => {
      saveAllCharacters(characters)
        .then(() => DEBUG && console.log('Characters saved to API successfully.'))
        .catch((error) => {
          DEBUG && console.error('Failed to save characters to API:', error);
          setError('Failed to save characters. Please try again.');
        });
    }, 500);

    return () => clearTimeout(debounceSave);
  }, [characters]);

  const addNewCharacter = () => {
    if (!newCharacterName.trim()) {
      alert('Character name cannot be empty.');
      return;
    }
    if (characters.some((char) => char.name === newCharacterName.trim())) {
      alert('Character with the same name already exists.');
      return;
    }
    const newCharacter = {
      id: uuidv4(),
      name: newCharacterName.trim(),
      attributes: ATTRIBUTE_LIST.reduce((acc, attr) => {
        acc[attr] = BASE_ATTRIBUTE;
        return acc;
      }, {}),
      skillPoints: SKILL_LIST.reduce((acc, skill) => {
        acc[skill.name] = 0;
        return acc;
      }, {}),
      selectedClass: null,
    };

    setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
    setCurrentCharacterId(newCharacter.id);
    setNewCharacterName('');
    DEBUG && console.log('Added new character:', newCharacter);
  };

  const deleteCharacter = (characterId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this character?');
    if (!confirmDelete) return;

    setCharacters((prevCharacters) => prevCharacters.filter((char) => char.id !== characterId));
    DEBUG && console.log(`Deleted character with ID: ${characterId}`);

    if (currentCharacterId === characterId && characters.length > 1) {
      const remainingCharacters = characters.filter((char) => char.id !== characterId);
      setCurrentCharacterId(remainingCharacters[0].id);
    } else if (characters.length === 1) {
      setCurrentCharacterId(null);
    }
  };

  const selectCharacter = (characterId) => {
    setCurrentCharacterId(characterId);
    DEBUG && console.log(`Selected character with ID: ${characterId}`);
  };

  const updateCharacter = (characterId, updatedData) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) => (char.id === characterId ? { ...char, ...updatedData } : char))
    );
    DEBUG && console.log(`Updated character with ID: ${characterId}`, updatedData);
  };

  const currentCharacter = characters.find((char) => char.id === currentCharacterId);

  if (isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Coding Exercise</h1>
        </header>

        <section className="App-section">
          <h2>Loading Characters...</h2>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Coding Exercise</h1>
        </header>

        <section className="App-section">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </section>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Coding Exercise</h1>
        </header>

        <section className="App-section">
          <h2>No Characters Found</h2>
          <input
            type="text"
            placeholder="Enter character name"
            value={newCharacterName}
            onChange={(e) => setNewCharacterName(e.target.value)}
          />
          <button onClick={addNewCharacter}>Add Character</button>
        </section>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>

      <div className="App-container">
        <CharacterList
          characters={characters}
          currentCharacterId={currentCharacterId}
          selectCharacter={selectCharacter}
          deleteCharacter={deleteCharacter}
          newCharacterName={newCharacterName}
          setNewCharacterName={setNewCharacterName}
          addNewCharacter={addNewCharacter}
        />

        {currentCharacter && (
          <CharacterEditor
            character={currentCharacter}
            updateCharacter={updateCharacter}
            MAX_TOTAL_ATTRIBUTES={MAX_TOTAL_ATTRIBUTES}
          />
        )}
      </div>
    </div>
  );
}

export default App;
