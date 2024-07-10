import React, { FC, useEffect, useState, useRef } from 'react';
import './ShowUsers.scss';
// import { useNavigate } from 'react-router-dom';
import FileService from '../service/file.service';
import User from '../../models/User';
import UserCases from '../UserCases/UserCases';



interface ShowUsersProps { }

const ShowUsers: FC<ShowUsersProps> = () => {
  const [users, setUsers] = useState<any[]>([{}]);
  const [isUsers, setIsUsers] = useState<boolean>(false)
  const [user, setUser] = useState<any[]>([{}]);
  const [isUser, setIsUser] = useState<boolean>(false)
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getUsers()
  }, []);


  const getUsers = async () => {
    FileService.getAllUsers().then((res) => {
      setUsers(res.data)
      setIsUsers(true)
      console.log(res.data)
    })
  }


  const getUserByIdFromReact = (event: any) => {
    if (isUsers) {
      setIsUser(false)
      let searchValue = nameRef.current?.value;
      if (searchValue?.length == 0) {
        console.log('nothing to find')
      }
      else {
        const result = users.filter((i) => i.id.includes(searchValue))
        setUser(result)
        if (result.length > 0) {
          console.log(user)
          setIsUser(true)
        }
      }
    }

  }


  const deleteUser = (id: any) => {
    FileService.deleteUser(id).then((res) => {
      console.log(res.data)
      getUsers()
    })
  }
  return <div>
    <input type="text" ref={nameRef} onBlur={getUserByIdFromReact} className='m-3' ></input>
    <label htmlFor='search'>חפש לפי מספר זהות</label>
    {isUser ? <div>{user.map((u) => {
      return (
        <div className='m-4'>
          <div className="card col-sm-4" >
            <div className="card-body">
            <h4 className="card-title">{u.first_name} {u.last_name}</h4>
                <p className="card-text">{u.id}</p>
                <p className="card-text">{u.email}</p>
            </div>
            </div>
          </div>)
        })
        }</div>:''}

      {isUsers ? <div><h1>משתמשים רשומים</h1>{users.map((u) => {
        return (
          <div className='m-4'>
            <div className="card col-sm-4" >
              <div className="card-body">
                <h4 className="card-title">{u.first_name} {u.last_name}</h4>
                <p className="card-text">{u.id}</p>
                <p className="card-text">{u.email}</p>
                <button onClick={() => { deleteUser(u.id) }}> מחק את {u.first_name}</button>
              </div>
            </div>
            <UserCases userId={u.id}></UserCases>
          </div>
          )
      })
      }</div> : ''}
    </div>
}
    export default ShowUsers;