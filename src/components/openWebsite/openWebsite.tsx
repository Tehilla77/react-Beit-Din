import React, { FC, useEffect, useState ,useRef} from 'react';
import './openWebsite.scss';
import FileService from '../service/file.service';
import UserDetails from '../user-details/user-details';
import User from '../../models/User';
import LogIn from '../logIn/logIn';
import ShowUsers from '../ShowUsers/ShowUsers';
import fileService from '../service/file.service';
import UserCases from '../UserCases/UserCases'

interface OpenWebsiteProps { }

const OpenWebsite: FC<OpenWebsiteProps> = () => {
const [isUserCases, setIsUserCases] = useState<boolean>(false)
const [logIn, setLogIn] = useState<boolean>(false)
const [signUp, setSignUp] = useState<boolean>(false)
const [isManager, setIsManager] = useState<boolean>(false)
const [userId,setUserId] = useState<any>();

    function addNewUser(user: User): void {
        FileService.createUser(user).then((res)=>{
          console.log(res.data)
        })
      }
      const logInByIdAndPassword = (user:User)=>{
        console.log(user)
        FileService.getUserByIdAndPwd(user.first_name,user.last_name,user.password).then((res)=>{
          console.log(res.data)
          if(res.data[0].is_manager == true){
            console.log('is manager!')
            setIsManager(true)
            setLogIn(false)
            setSignUp(false)
          }
          else{
            console.log(res.data[0].id)
            setUserId(res.data[0].id)
            setLogIn(false)
            setSignUp(false)
            setIsUserCases(true)
        }
        })
      }

     const goToLogIn = ()=> {
        setLogIn(true)
        setSignUp(false)
    }
    const goToSignUp = ()=> {
        setLogIn(false)
        setSignUp(true)
    }

    return<div>{!isUserCases&&!isManager?<h1 className='m-5 '>ניהול בית הדין</h1>:''}
    {!isUserCases&&!isManager&&(signUp||!logIn)?<button className={'btn btn-warning mt-5 m-5'} onClick={goToLogIn}>כניסה</button>:''}
    {!isUserCases&&!isManager&&(logIn||!signUp)?<button className={'btn btn-warning mt-5 m-5'} onClick={goToSignUp}>הרשמה</button>:''}
    {signUp?<UserDetails funcParentAdd={addNewUser}>משתמש חדש</UserDetails>:''}
    {logIn?<LogIn funcParentAdd={logInByIdAndPassword}>הכנס</LogIn>:''}
    {isManager?<ShowUsers></ShowUsers>:''}
    {isUserCases?<UserCases userId={userId}></UserCases>:''}
    </div>
}


export default OpenWebsite