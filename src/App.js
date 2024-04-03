import React, { useState } from 'react';
import './styles/style.scss';
import PlayerOnePlanet from "./components/playerone/PlayerOnePlanet";
import PlayerTwoPlanet from "./components/playertwo/PlayerTwoPlanet";
import PlayerOneControls from "./components/playerone/PlayerOneControls";
import PlayerTwoControls from "./components/playertwo/PlayerTwoControls";

function App() {
   const [attackPosition, setAttackPosition] = useState(null);
   const [attackTwoPosition, setAttackTwoPosition] = useState(null);

   return (
      <div>
         <main>
            <div className="sun"></div>

            <PlayerOnePlanet attackPosition={attackPosition} />
            <PlayerTwoPlanet attackTwoPosition={attackTwoPosition} />

            <div className="overlay"></div>
         </main>

         <footer>
            <PlayerOneControls setAttackPosition={setAttackPosition} />
            <PlayerTwoControls setAttackTwoPosition={setAttackTwoPosition} />
         </footer>
      </div>
   );
}

export default App;
