import React from 'react'
import { Redirect } from 'react-router-dom';

export default function Home() {

    let renderRedirect = () => {
        console.log(sessionStorage);
        if (sessionStorage.getItem('user_id') === undefined) {
          return <Redirect to='/login' />
        } 
      }
    
    
      return ( 
          <div className="Home">
              {renderRedirect()}
            <h2 className={'error'} align="center">Welcome to the services site!</h2>
            <h2 className={'error'} align="center">Admin version</h2>
            </div>
        )
}
