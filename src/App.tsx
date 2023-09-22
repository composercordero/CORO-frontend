// Import Node Modules
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// Import Views
import Home from './views/Home'
import About from "./views/About";
import Contact from "./views/Contact";
import Dashboard from './views/Dashboard'
import Library from './views/Library'
import Programming from "./views/Programming";
import Info from "./views/Info";
// Import Components
import { Layout, ConfigProvider } from "antd";
import Navigation from "./components/global/Navigation";
import AlertMessage from "./components/global/AlertMessage";
// Import Globals
import Header from './components/global/Header'
// Import Types
import { CategoryType, ConductorType} from "./types";
// Import apiWrapper Functions
import { getMe } from './lib/apiWrapper';

function App() {

  // NAVIGATION ----------------------------------------------
  const navigate = useNavigate();

  const nav = (key:string): void => {
    key === '/logout' ? logUserOut():
    // key === '/login' ? logUserOut():
    navigate(key)}

  // MENU COLLAPSING 
  const [collapsed, setCollapsed] = useState(true);

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
    <ConfigProvider
      theme={{
        components: {
          Button: { colorPrimary: '#272829', algorithm: true,},
          Menu: { colorBgContainer:'transparent', colorText:'#fff'},
        },
      }}
    >
    <Layout style={{ backgroundColor: '#272829', }}>

      <Navigation nav={nav} collapsed={collapsed} isLoggedIn={isLoggedIn} />

      <Layout style={{ backgroundColor: '#272829', }}>

      {message && <AlertMessage category={category!} message={message} flashMessage={flashMessage}/>}

        <Header handleCollapsed={handleCollapsed} collapsed={collapsed} />
          <Layout 
            style={{
              padding:50,
              margin:0,
              backgroundColor: '#CD5888', 
              borderTopLeftRadius: '50px'}}>
          <Routes>

            <Route path='/' element={<Home  isLoggedIn={isLoggedIn} loggedInUser = {loggedInUser} flashMessage = {flashMessage} logUserIn={logUserIn}/> }></Route>

            <Route path='/about' element={<About /> }></Route>
            
            <Route path='/contact' element={<Contact /> }></Route>

            <Route path='/programming' element={<Programming loggedInUser = {loggedInUser} flashMessage={flashMessage}/>}></Route>

            <Route path='/info' element={<Info flashMessage = {flashMessage} loggedInUser = {loggedInUser}/>}></Route>

            <Route path='/dashboard' element={<Dashboard />}></Route>
            
            <Route path='/library' element={<Library />}></Route>

          </Routes>
          </Layout>
      </Layout>
    </Layout>
    </ConfigProvider>
    </>)
}

export default App
