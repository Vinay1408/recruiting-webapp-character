import React from 'react';
import { ATTRIBUTE_LIST, CLASS_LIST } from "../consts";

function Classes({ character, updateCharacter }) {
  const toggleClassSelection = (className, isEligible, isSelected) => {
    const newSelectedClass = isSelected ? null : className;
    updateCharacter(character.id, { selectedClass: newSelectedClass });
  };

  return (
    <div>
      <h3>Classes</h3>
      <div className="classes-list">
        {Object.keys(CLASS_LIST).map((className) => {
          const isEligible = ATTRIBUTE_LIST.every(
            (attr) => character.attributes[attr] >= CLASS_LIST[className][attr]
          );
          const isSelected = character.selectedClass === className;

          return (
            <div
              key={className}
              className={`class-item ${isEligible ? 'eligible' : 'ineligible'} ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleClassSelection(className, isEligible, isSelected)}
            >
              <strong style={{ color: isEligible ? 'red' : 'inherit' }}>
                {className}
              </strong>

              {isSelected && (
                <div className="class-requirements">
                  <h4>Minimum Requirements for {className}</h4>
                  {ATTRIBUTE_LIST.map((attr) => (
                    <div key={attr}>
                      {attr}: {CLASS_LIST[className][attr]}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Classes;
