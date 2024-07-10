import React, { FC, useEffect, useState, useRef } from 'react';
import './UserCases.scss';
// import { useNavigate } from 'react-router-dom';
import FileService from '../service/file.service';
import User from '../../models/User';



interface UserCasesProps {
    userId: string;
}

const UserCases: React.FC<UserCasesProps> = ({ userId }) => {
    const [UserCases, setUserCases] = useState<any[]>([{}]);
    const [isUserCases, setIsUserCases] = useState<boolean>(false)

    useEffect(() => {
        getUserCases(userId)
    }, []);


    const getUserCases = async (userId: string) => {

        FileService.getUserCases(userId).then((res) => {
            if (res.data.length>0) {
                setUserCases(res.data)
                setIsUserCases(true)
            }
        })

    }

    return <div>
        {isUserCases ? <div>{UserCases.map((u) => {
            return (
                <div className='m-4'>
                    <div className="card col-sm-4" >
                        <div className="card-body">
                            <h4 className="card-title">מספר תיק -{u.case_id}</h4>
                            <p className="card-text">תובע - {u.defendant_id}</p>
                            <p className="card-text">נתבע - {u.prosecutor_id}</p>
                            <p className="card-text">נושא - {u.issue}</p>
                        </div>
                    </div>
                </div>)
        })
        }</div> : ''}
    </div>
}
export default UserCases;