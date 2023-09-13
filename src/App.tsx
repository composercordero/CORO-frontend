// Import Node Modules
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// Import Views
import Home from './views/Home'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
// Import Components
import { Layout } from "antd";
import Navigation from "./components/global/Navigation";
import AlertMessage from "./components/global/AlertMessage";
// Import Globals
import Header from './components/global/Header'
// Import Types
import { CategoryType, ChoirType, ConductorType, HymnType, OrganizationType} from "./types";
// Import apiWrapper Functions
import { getMe } from './lib/apiWrapper';


function App() {

  // NAVIGATION ----------------------------------------------
  const navigate = useNavigate();

  const nav = (key:string): void => {
    key === '/logout' ? logUserOut():
    navigate(key)}

  // MENU COLLAPSING 
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = (): void => {
    setCollapsed(!collapsed)
  }
  
  // USER LOGIN ---------------------------------------------------------------------

  const [isLoggedIn, setIsLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp') as string) > new Date()) || false );
  const [loggedInUser, setLoggedInUser] = useState<ConductorType|null>(null)

  useEffect(() => {
    if(isLoggedIn){
      getMe(localStorage.getItem('token') as string)
        .then(response => {
          if (response.data){
            setLoggedInUser(response.data)
          }
      })
      .catch(err => console.error(err))
    } 
  }, [isLoggedIn])

  // LOGIN USER ---------------------------------------------------------------------

  const logUserIn = (user:ConductorType):void => {
    setIsLoggedIn(true);
    setLoggedInUser(user)
    flashMessage(`${user.username} has logged in`, 'success')
    navigate('/dashboard')
  }
  
  // LOG USER OUT -------------------------------------------------------------------

  const logUserOut = (): void => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    localStorage.clear();
    flashMessage('You have logged out', 'info');
    navigate('/')
  }

  // FLASH MESSAGE -------------------------------------------------------------------

  const [message, setMessage] = useState<string|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null);

  const flashMessage = (newMessage:string|null, newCategory:CategoryType|null): void => {
    setMessage(newMessage);
    setCategory(newCategory);
  }
  
  // RETURN SECTION -------------------------------------------------------------------


  return (<>
    <Layout >

      <Navigation nav={nav} collapsed={collapsed} isLoggedIn={isLoggedIn} logUserOut = {logUserOut}/>

      <Layout className="site-layout">

      {message && <AlertMessage category={category!} message={message} flashMessage={flashMessage}/>}

        <Header handleCollapsed={handleCollapsed} collapsed={collapsed}/>

          <Routes>
            
            <Route path='/' element={<Home  isLoggedIn={isLoggedIn} loggedInUser = {loggedInUser} flashMessage = {flashMessage} /> }></Route>

            <Route path='/login' element={<Login isLoggedI = {isLoggedIn} logUserIn={logUserIn} flashMessage={flashMessage} />}></Route>

            <Route path='/dashboard' element={<Dashboard flashMessage = {flashMessage}/>}></Route>

          </Routes>

      </Layout>
    </Layout>
    </>)
}

export default App
