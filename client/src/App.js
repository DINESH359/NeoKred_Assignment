// // import MarkDown from "./components/MarkDown";
// //import MarkDownWithServer from './components/MarkDownWithServer';
// import MarkDownWithServer from './components/MarkDownWithServer';

// import './App.css';

// function App() {
//   return (
//     // <MarkDown></MarkDown>
//     <MarkDownWithServer></MarkDownWithServer>
//   );
// }

// export default App;

import React, { useState } from 'react';
import MarkDown from './components/MarkDown';
import MarkDownWithServer from './components/MarkDownWithServer';
import ConversionSelector from './components/ConversionSelector';

function App() {
  const [conversionMethod, setConversionMethod] = useState(null);

  const handleConversionMethodChange = (method) => {
    setConversionMethod(method);
  };

  let componentToRender = null;
  switch (conversionMethod) {
    case 'client':
      componentToRender = <MarkDown />;
      break;
    case 'server':
      componentToRender = <MarkDownWithServer />;
      break;
    default:
      componentToRender = <ConversionSelector onMethodChange={handleConversionMethodChange} />;
      break;
  }

  return (
    <div>
      {componentToRender}
    </div>
  );
}

export default App;
