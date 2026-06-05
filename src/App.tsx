import { useState } from 'react';

import './assets/style/Barbie.css';

import Timer from './Timer/Timer'
import Theme_name from './Theme/Theme.tsx'; {/*테마 클래스 이름 */}

function App() {
  const [theme] = useState(Theme_name());
  const current_theme: Record< string, { logo: string, image: string}> = { // { .. : .. } props라는 거임
    theme_barbie: { 
      logo: "Barbie",
      image : "src/assets/image/Barbie_logo.gif"
    },
    theme_lockwood: { 
      logo: "Lockwood",
      image : "src/assets/image/Barbie_logo.gif"
    },
    theme_jellyfish: { 
      logo: "Jellyfish",
      image : "src/assets/image/Barbie_logo.gif" 
    },
  };

  

  return (
    <div  className={theme} >
      <img src={current_theme[theme].image} id='logo'/>

      <Timer theme={theme}/>
    </div>
  )
}

export default App;
