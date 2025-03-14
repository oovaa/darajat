import React from 'react';
import { FadeIn, Header, Landing, Onboarding } from '../Container';
import { useState, useEffect } from 'react';
import { GoUp } from '../Container';


const HomePage: React.FC = () => {
  // this is just a funtionality for taking the screen up.
  const [showBtn, setShowBtn] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowBtn(window.scrollY >= 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const handleGoUp = () => {
    window.scrollTo({ top: 0 })
  }
  return (
    <>
      <Header />

      {/* FadeIn is a compoenet add some smooth appearing when the scetion is appear  */}
      <FadeIn>
        <Landing />
      </FadeIn>
      <FadeIn>
        <Onboarding />
      </FadeIn>
      {
        showBtn && <GoUp onclick={handleGoUp} status={showBtn} />
      }
    </>
  )
}

export default HomePage;