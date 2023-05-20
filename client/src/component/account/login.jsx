import {Box,TextField, Button,styled,Typography } from '@mui/material';
import siteLogo from '../images/siteLogo.png';
import {useState} from 'react';
import { API } from '../../service/api.js';
import { SERVICE_URLS } from '../../constants/config.js';


const Component=styled(Box)`
width :400px;
margin:auto;
background:yellow;


box-shadow:5px 2px 5px 2px rgb(98 12 10/ 0.36);`
const Image=styled('img')({
    width:300,
    margin:'auto',
    display:'flex',padding:'50px 0 0'
});
const Wrapper=styled('Box')`
padding:25px 35px;
display:flex;
flex:1;
flex-direction:column;
& > div, &>button, &>p{margin-top:20px;}
`

const LoginButton=styled(Button)`
text-transform:none;
background:#92AEEF;
border-radius:5px
`
const SignUpButton=styled(Button)`
text-transform:none;
background:#B4EF92;
border-radius:5px
`

const signupInitialValues={
name:"",username:"",password:""
}


const Error=styled(Typography)`
font-size:10px;
color:#ff6161;
line-height:0;
margin-top:10px;
`



const Login=()=>{
    const [account,toggleAccount]=useState('login');
    const[signup,setSignup]=useState(signupInitialValues);
    const [error,setError]=useState('');

    const handleClick = ()=>{
        if(account==="signUp"){toggleAccount("login");}
        else{toggleAccount("signUp");}
    };

    const onInputChange=(e)=>{
        setSignup({...signup,[e.target.name]:e.target.value})
    }

    const signupUser= async()=>{
      let response= await API.userSignUp(signup);
      if(response.isSuccess){
        setError('');
        setSignup(signupInitialValues);
        toggleAccount('login')
      }
      else{
        setError("Something went wrong!please try again later");
      }
    }



    return(
       <Component>
            <Box>
                <Image src={siteLogo} alt="logo"/>
                {
                account==='login' ?
                    <Wrapper>
                    <TextField label="User Name" variant="standard" />
                    <TextField id="filled-basic" label="password" variant="standard" />
                    {error &&<Error>{error}</Error>}

                    <LoginButton variant="contained">Login</LoginButton>
                    <Typography style={{textAlign:'center'}}>OR</Typography>
                    <SignUpButton onClick={handleClick} variant="outlined">Create Account</SignUpButton>
                </Wrapper>
                :
                <Wrapper>
                    <TextField label="Enter Name" onChange={(e)=>onInputChange(e)} name="name" variant="standard" />
                    <TextField label="Enter Username" onChange={(e)=>onInputChange(e)} name="username"variant="standard" />
                    <TextField id="filled-basic" onChange={(e)=>onInputChange(e)}  name="password" label="Password" variant="standard" />
                   {error &&<Error>{error}</Error>}
                    <SignUpButton onClick={()=>signupUser()} variant="contained">Submit</SignUpButton>
                    <Typography style={{textAlign:'center'}}>OR</Typography>
                    <LoginButton onClick={handleClick} >Already Have Account?</LoginButton>
                </Wrapper>
                  }
            </Box>
        </Component>
    )
}

export default Login;