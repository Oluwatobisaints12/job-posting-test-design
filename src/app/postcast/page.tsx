import React from 'react'
import AllPodcast from '../components/all-postcast'
import Header from '../components/header'
import SubHeader from '../components/sub-header'
import Footer from '../components/footer'

const page = () => {
  return (
    <div>
        <Header />
        <SubHeader />
        
      <AllPodcast />
      <Footer />
    </div>
  )
}

export default page
