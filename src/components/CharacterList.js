import React from 'react';

function CharacterList({
 characters,
 currentCharacterId,
 selectCharacter,
 deleteCharacter,
 newCharacterName,
 setNewCharacterName,
 addNewCharacter,
}) {
  return (
    <nav aria-label="Character List" className="App-sidebar">
      <header>
        <h2>Characters</h2>
      </header>
      <section>
        {characters.map((char) => (
          <div
            key={char.id}
            className={`character-item ${char.id === currentCharacterId ? 'selected' : ''}`}
          >
            <button
              type="button"
              onClick={() => selectCharacter(char.id)}
              className="character-button"
              aria-pressed={char.id === currentCharacterId}
            >
              {char.name}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deleteCharacter(char.id);
              }}
              className="delete-button"
              aria-label={`Delete ${char.name}`}
            >
              &times;
            </button>
          </div>
        ))}
      </section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewCharacter();
        }}
        className="add-character"
      >
        <label htmlFor="new-character-name" className="visually-hidden">
          New character name
        </label>
        <input
          type="text"
          id="new-character-name"
          name="new-character-name"
          placeholder="New character name"
          value={newCharacterName}
          onChange={(e) => setNewCharacterName(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </nav>
  );
}

export default CharacterList;
