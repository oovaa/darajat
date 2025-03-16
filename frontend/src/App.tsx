import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, Navigation, MyLearning, Onboarding, Dashboard, LearningPlan} from './Container';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/' element={<Navigation />} >
            <Route path='myLearning' element={<MyLearning/>} />
            <Route path='dashboard' element={<Dashboard/>} />
            <Route path='learningPlan' element={<LearningPlan/>} />
          </Route>
          <Route path='onboarding' element={<Onboarding />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;