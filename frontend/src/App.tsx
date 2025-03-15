import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, MyLearning, Onboarding } from './Container';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='onboarding' element={<Onboarding />} />
          <Route path='MyLearning' element={<MyLearning/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;