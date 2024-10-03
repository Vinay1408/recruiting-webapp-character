import React from 'react';
import {ATTRIBUTE_LIST} from "../consts";

function Attributes({
  character,
  updateCharacter,
  MAX_TOTAL_ATTRIBUTES,
}) {
  const totalAttributes = Object.values(character.attributes).reduce((sum, val) => sum + val, 0);

  const handleIncrement = (attribute) => {
    if (totalAttributes < MAX_TOTAL_ATTRIBUTES) {
      const updatedAttributes = { ...character.attributes, [attribute]: character.attributes[attribute] + 1 };
      updateCharacter(character.id, { attributes: updatedAttributes });
    }
  };

  const handleDecrement = (attribute) => {
    if (character.attributes[attribute] > 0) {
      const updatedAttributes = { ...character.attributes, [attribute]: character.attributes[attribute] - 1 };
      updateCharacter(character.id, { attributes: updatedAttributes });
    }
  };

  return (
    <div>
      <h3>Attributes</h3>
      <p>
        Total Attributes: {totalAttributes} / {MAX_TOTAL_ATTRIBUTES}
      </p>
      {ATTRIBUTE_LIST.map((attribute) => {
        const value = character.attributes[attribute];
        const modifier = Math.floor((value - 10) / 2);
        const canIncrement = totalAttributes < MAX_TOTAL_ATTRIBUTES;

        return (
          <div key={attribute} className="attribute-row">
            <strong>{attribute}</strong>: {value}{' '}
            <button onClick={() => handleIncrement(attribute)} disabled={!canIncrement}>
              +
            </button>
            <button onClick={() => handleDecrement(attribute)}>
              -
            </button>
            <span> Modifier: {modifier >= 0 ? `+${modifier}` : modifier}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Attributes;
