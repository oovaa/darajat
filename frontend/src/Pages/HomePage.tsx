import React from 'react';
import { FadeIn, Header, Landing } from '../Container';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <FadeIn>
        <Landing />
      </FadeIn>
    </>
  )
}

export default HomePage;