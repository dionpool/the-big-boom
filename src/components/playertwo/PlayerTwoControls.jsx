import React, { useState, useEffect, useCallback } from 'react';
import Compounds from "../Compounds";
import AttackRecipes from "../Recipes";

function PlayerTwoControls({ setAttackTwoPosition }) {
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
            setAttackTwoPosition({ x: attackX, y: attackY });
         }
      });
   }, [selectedCompounds, setAttackTwoPosition]);

   useEffect(() => {
      const handleKeyDown = (event) => {
         switch (event.key) {
            case 'ArrowLeft':
               setSelectedBtn((prev) => (prev === 0 ? Compounds.length - 1 : prev - 1));
               break;
            case 'ArrowRight':
               setSelectedBtn((prev) => (prev === Compounds.length - 1 ? 0 : prev + 1));
               break;
            case 'ArrowDown':
               handleBtnSelect(selectedBtn);
               break;
            case 'ArrowUp':
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
      <div className="player-two-area">
         <div className="player-two-log">
            <ul>
               {actionLog.map((entry, index) => (
                  <li key={index}>{entry}</li>
               )).reverse()}
            </ul>
         </div>

         <div>
            <div className="player-two-energy">
               <span>Energy:</span> {energy}
            </div>

            <div className="player-two-controls">
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
      </div>
   );
}

export default PlayerTwoControls;
