import React from 'react';
import Attributes from './Attributes';
import Classes from './Classes';
import Skills from './Skills';

function CharacterEditor({
 character,
 updateCharacter,
 MAX_TOTAL_ATTRIBUTES,
}) {
  return (
    <section className="App-section">
      <h2>{character.name}</h2>
      <Attributes
        character={character}
        updateCharacter={updateCharacter}
        MAX_TOTAL_ATTRIBUTES={MAX_TOTAL_ATTRIBUTES}
      />
      <Classes
        character={character}
        updateCharacter={updateCharacter}
      />
      <Skills
        character={character}
        updateCharacter={updateCharacter}
      />
    </section>
  );
}

export default CharacterEditor;
