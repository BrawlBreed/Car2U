import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const UserMenu = () => {
    return (
        <div>
            <div className='card'>
                <div className='list-group list-group-flush'>
                    <Link to='/dashboard/user' className='list-group-item list-group-item-action'>Табло</Link>
                    <Link to='/dashboard/user/order' className='list-group-item list-group-item-action'> Поръчки</Link>
                    <Link to='/dashboard/user/profile' className='list-group-item list-group-item-action'> Профил  </Link>
                </div>
            </div>
        </div>
    )
}

export default UserMenu
