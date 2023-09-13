// Import Node Modules
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import Views

// Import Components
import RegisterDrawer from '../components/RegisterDrawer'
// Import Globals
import { Carousel } from 'antd';
// Import Types
import { CategoryType, ChoirType, ConductorType, HymnType, OrganizationType} from "./types";
// Import apiWrapper Functions


type homeProps = {
  isLoggedIn: boolean,
  loggedInUser: ConductorType|null,
  flashMessage: (message:string|null, category: CategoryType|null) => void,
}

const Home = ({logUserIn, isLoggedIn, loggedInUser, flashMessage}: homeProps) => {

  const navigate = useNavigate()



  return (
    <RegisterDrawer logUserIn={logUserIn} isLoggedIn={isLoggedIn} loggedInUser = {loggedInUser} flashMessage = {flashMessage} />
  )
}
export default Home