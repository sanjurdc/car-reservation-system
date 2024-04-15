import { useState,useEffect }  from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LoginDrawer from './LoginDrawer';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';


export default function Header() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  const [subCategory,setSubCategory]=useState([])
  const [status,setStatus]=useState(false)
  const [user,setUser]=useState('Login/Signup')
  const [loggedIn,setLoggedIn]=useState(false)
  const [userinfo,setUserinfo]=useState(JSON.parse(localStorage.getItem("ADD USER")))
  const [login,setLogin] = useState(false)

   useEffect(function(){
    if(userinfo)
    {
      setUser(userinfo.name)
      setLoggedIn(true)
      console.log(login)
    }
   },[])

   

    const handleStatus=()=>{
    setStatus(false)
     }
 
     const handleLogin=()=>{
     if(userinfo==null||undefined)
     
     {
      console.log(userinfo)
      setStatus(true)
      setLogin(true)
     }
     else
     {
     setUser(userinfo.name)
     setLoggedIn(true)
    
    }}
 
    const handleLogout = () => {
      localStorage.removeItem("ADD USER");
      navigate('/')
      window.location.reload()
      setLoggedIn(false)
      setUser('Login/SignUp')
    };

        
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='inherit'>
        <Toolbar>
          <div sx={{ flexGrow: 1 }}>
            <img src='/assets/logo.png'  style={{width:70}}/> 
              </div>
                <Box component="div" sx={{ flexGrow: 1 }}>
              </Box>
            
          <Button onClick={handleLogin} color="inherit">{user}</Button> 
        {loggedIn? <Button onClick={handleLogout} color="inherit">Logout</Button> :<></>} 
        </Toolbar>
      </AppBar>
    <LoginDrawer status={status} handleStatus={handleStatus} userinfo={userinfo} login={login}/>
  </Box>
)}
