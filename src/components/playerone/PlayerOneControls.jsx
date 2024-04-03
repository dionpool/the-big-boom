import React, { useState, useEffect, useCallback } from 'react';
import Compounds from "../Compounds";
import AttackRecipes from "../Recipes";

function PlayerOneControls({ setAttackPosition }) {
   const [selectedBtn, setSelectedBtn] = useState(0);
   const [energy, setEnergy] = useState(100);
   const [actionLog, setActionLog] = useState([]);
   const [selectedCompounds, setSelectedCompounds] = useState([]);

   const handleBtnSelect = useCallback((index) => {
      const selectedCompound = Compounds[index];

      if (energy >= selectedCompound.energyCost) {
         const logEntry = `You selected: ${selectedCompound.label}`;

         setActionLog(prevLog => [...prevLog, logEntry]);
         setEnergy(prevEnergy => prevEnergy - selectedCompound.energyCost);

         setSelectedCompounds(prevSelectedCompounds => [...prevSelectedCompounds, selectedCompound.className]);
      } else {
         const logEntry = "Not enough energy!";

         setActionLog(prevLog => [...prevLog, logEntry]);
      }
   }, [energy]);

   const handleAttack = useCallback(() => {
      AttackRecipes.forEach(recipe => {
         const requiredCompounds = recipe.compounds;
         if (requiredCompounds.every(compound => selectedCompounds.includes(compound))) {
            const logEntry = `You made: ${recipe.label}`;

            setActionLog(prevLog => [...prevLog, logEntry]);

            const attackX = Math.random() * 500; // Adjust as needed
            const attackY = Math.random() * 500; // Adjust as needed
            setAttackPosition({ x: attackX, y: attackY });
         }
      });
   }, [selectedCompounds, setAttackPosition]);

   useEffect(() => {
      const handleKeyDown = (event) => {
         switch (event.key) {
            case 'a':
               setSelectedBtn((prev) => (prev === 0 ? Compounds.length - 1 : prev - 1));
               break;
            case 'd':
               setSelectedBtn((prev) => (prev === Compounds.length - 1 ? 0 : prev + 1));
               break;
            case 's':
               handleBtnSelect(selectedBtn);
               break;
            case 'w':
               handleAttack();
               break;
            default:
               break;
         }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
         document.removeEventListener('keydown', handleKeyDown);
      };
   }, [selectedBtn, handleBtnSelect, handleAttack]);

   useEffect(() => {
      const energyRegenInterval = setInterval(() => {
         setEnergy(prevEnergy => Math.min(prevEnergy + 1, 100)); // Regenerate 1 energy per second
      }, 1000);

      return () => {
         clearInterval(energyRegenInterval);
      };
   }, []);

   return (
      <div className="player-one-area">
         <div>
            <div className="player-one-energy">
               <span>Energy:</span> {energy}
            </div>

            <div className="player-one-controls">
               {Compounds.map((button, index) => (
                  <button
                     key={index}
                     className={index === selectedBtn ? button.className + ' selected' : button.className}
                  >
                     {button.label}
                  </button>
               ))}
            </div>
         </div>

         <div className="player-one-log">
            <ul>
               {actionLog.map((entry, index) => (
                  <li key={index}>{entry}</li>
               )).reverse()}
            </ul>
         </div>
      </div>
   );
}

export default PlayerOneControls;
