import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, Onboarding } from './Container';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='onboarding' element={<Onboarding />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;