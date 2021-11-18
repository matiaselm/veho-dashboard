import { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  card: {
    backgroundColor: '#ddd',
    margin: 5,
    maxWidth: 500
  }
}

const Users = (props) => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:3000/users').then(res => {
      console.log(res)
      setUsers(res.data)
    }).catch(e => {
      console.error(e)
    })
  }, [])

  return <div><h1>Users</h1>
    <div>
      {(Array.isArray(users) && users.length > 0) && users.map(user => {
        return <div key={user.id} style={styles.card}>
          <p>{user._id} {user.name} {user.points}</p>
        </div>
      })}
    </div>
  </div>
}

export default Users;
