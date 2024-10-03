import React from 'react';
import {SKILL_LIST} from "../consts";

function Skills({ character, updateCharacter }) {
  const intelligence = character.attributes['Intelligence'];
  const intelligenceModifier = Math.floor((intelligence - 10) / 2);
  const totalAvailableSkillPoints = 10 + 4 * intelligenceModifier;
  const totalSkillPointsSpent = Object.values(character.skillPoints).reduce((sum, points) => sum + points, 0);
  const remainingSkillPoints = totalAvailableSkillPoints - totalSkillPointsSpent;

  const handleIncrementSkill = (skillName) => {
    if (remainingSkillPoints > 0) {
      const updatedSkillPoints = { ...character.skillPoints, [skillName]: character.skillPoints[skillName] + 1 };
      updateCharacter(character.id, { skillPoints: updatedSkillPoints });
    }
  };

  const handleDecrementSkill = (skillName) => {
    if (character.skillPoints[skillName] > 0) {
      const updatedSkillPoints = { ...character.skillPoints, [skillName]: character.skillPoints[skillName] - 1 };
      updateCharacter(character.id, { skillPoints: updatedSkillPoints });
    }
  };

  return (
    <div>
      <h3>Skills</h3>
      <p>Available Skill Points: {remainingSkillPoints}</p>
      {SKILL_LIST.map((skill) => {
        const points = character.skillPoints[skill.name];
        const attributeModifier = Math.floor((character.attributes[skill.attributeModifier] - 10) / 2);
        const totalSkillValue = points + attributeModifier;
        const canIncrement = remainingSkillPoints > 0;
        const canDecrement = points > 0;

        return (
          <div key={skill.name} className="skill-row">
            <strong>{skill.name}</strong> - Points: {points}{' '}
            <button onClick={() => handleIncrementSkill(skill.name)} disabled={!canIncrement}>
              +
            </button>
            <button onClick={() => handleDecrementSkill(skill.name)} disabled={!canDecrement}>
              -
            </button>
            <span> Modifier ({skill.attributeModifier}): {attributeModifier >= 0 ? `+${attributeModifier}` : attributeModifier}</span>
            <span> Total: {totalSkillValue}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Skills;
