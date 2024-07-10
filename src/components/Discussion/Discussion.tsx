import React, { FC, useEffect, useState ,useRef} from 'react';
import './Discussion.scss';
// import { useNavigate } from 'react-router-dom';
import FileService from '../service/file.service';
import UserDetails from '../user-details/user-details';
import User from '../../models/User';
import LogIn from '../logIn/logIn'


interface DiscussionProps { }

const Discussion: FC<DiscussionProps> = () => {
const [Discussions,setDiscussions] = useState<any[]>([{}]);
const [isDis,setIsDis] = useState<boolean>(false)
const [Users,setUsers] = useState<any[]>([{}]);
const [isUsers,setIsUsers] = useState<boolean>(false)
const [Cases,setCases] = useState<any[]>([{}]);
const [isCases,setIsCases] = useState<boolean>(false)
const [user,setUser] = useState<any[]>([{}]);
const [isUser,setIsUser] = useState<boolean>(false)
const nameRef = useRef<HTMLInputElement>(null);
const IdRef = useRef<HTMLInputElement>(null);

useEffect(() => {
    getUsers()
    // getDis()
    // getCases()
  }, []);

const getDis = async () => {
    FileService.getAllDiscussions().then((res)=>{
        setDiscussions(res.data)
        setIsDis(true)
        console.log(res.data)
    })
  }

const getUsers = async () => {
    FileService.getAllUsers().then((res)=>{
        setUsers(res.data)
        setIsUsers(true)
        console.log(res.data)
    })
  }

  const getCases = async () => {
    FileService.getAllCases().then((res)=>{
        setCases(res.data)
        setIsCases(true)
        console.log(res.data)
    })
  }

const getUserByIdFromReact = (event:any) => {
  if(isUsers){
    setIsUser(false)
    let searchValue = nameRef.current?.value;
    if(searchValue?.length==0){
    console.log('nothing to find')
  }
  else{
    const result = Users.filter((i) => i.id.includes(searchValue))
    setUser(result)
    if(result.length>0){
      console.log(user)
    setIsUser(true)
  }
}
}

}

  const getUserById = async (event:any) => {
    setIsUser(false)
    if(nameRef.current?.value.length==9){
    FileService.getUserById(nameRef.current?.value).then((res)=>{
      setUser(res.data)
      setIsUser(true)
      console.log(res.data)
    })
  }
}
  function addNewUser(user: User): void {
    FileService.createUser(user).then((res)=>{
      console.log(res.data)
      getUsers()
    })
  }

  const logInByIdAndPassword = (user:User)=>{
    console.log(user)
    FileService.getUserByIdAndPwd(user.first_name,user.last_name,user.password).then((res)=>{
      console.log(res.data)
    })
  }
  const deleteUser = (id:any)=>{
    FileService.deleteUser(id).then((res)=>{
      console.log(res.data)
      getUsers()
    })
  }
    return<div>
      <label htmlFor='search'>search</label>
      <input type="text" ref={nameRef} onBlur={getUserByIdFromReact}></input>
      {isUser?<div><h1>User</h1><ul>{user.map((u)=>{
           return(
           <div>
           <li><strong>{u.id}</strong></li>
           <li>{u.first_name} {u.last_name}</li>
           </div>)
        })
        }</ul></div>:''}
        {isDis?<div><h1>discussions</h1><ul>{Discussions.map((d)=>{
           return(
           <div>
           <li><strong>{d.discussion_id}</strong></li>
           <li>{d.protocol}</li>
           <li>{d.discussion_date}</li>
           <li>{d.discussion_hour}</li>
           <li>{d.next_discussion}</li>
           </div>)
        })
        }</ul></div>:''}
        {isUsers?<div><h1>users</h1>{Users.map((u)=>{
           return(
           <div className='m-4'>
          <div className="card col-sm-4" >
          <div className="card-body">
          <h4 className="card-title">{u.first_name} {u.last_name}</h4>
          <p className="card-text">{u.id}</p>
          <p className="card-text">{u.email}</p>
          <button onClick={()=>{deleteUser(u.id)}}>{u.first_name} מחק את</button>
           </div>
           </div>
           </div>)
        })
        }</div>:''}
        {isCases?<div><h1>cases</h1><ul>{Cases.map((c)=>{
           return(
           <div>
           <li><strong>{c.case_id}</strong></li>
           <li>{c.issue}</li>

           </div>)
        })
        }</ul></div>:''}
            <UserDetails funcParentAdd={addNewUser}>משתמש חדש</UserDetails>
            <LogIn funcParentAdd={logInByIdAndPassword}>הכנס--</LogIn>

        </div>
}
export default Discussion;