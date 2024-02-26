import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import TreatmentForm from './TreatmentForm';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <TreatmentForm />
      </div>
    </ChakraProvider>
  );
}

export default App;
