import { useState, useEffect } from 'react';
import axios from '../services/axios';
import url from '../url';
import ModifyForm from '../components/ModifyForm'
import InputForm from '../components/InputForm'
import Box from '../components/Box';

const styles = {
  card: {
    backgroundColor: '#ddd',
    margin: 5,
    maxWidth: 500
  }
}

const Users = (props) => {
  const [users, setUsers] = useState(null)
  const [modifyUser, setModifyUser] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  const onSubmit = (user) => {
    axios.put(`${url}/users/${user._id}`, user).then(res => {
      console.log(res)
      setModifyUser(null)
      getUsers()
    }).catch(err => console.error(err))
  }

  const getUsers = () => {
    axios.get('http://localhost:3000/users')
      .then(res => setUsers(res.data))
      .catch(e => console.error(e))
  }

  return <div><h1>Users</h1>
    <div>
      {(Array.isArray(users) && users.length > 0) && users.map(user => {
        return <Box key={user._id} image_url={user.image_url}><div>
          <p>{user.name} {user.points}</p>
          <button onClick={() => setModifyUser(user)}>Modify</button>
        </div>
        </Box>
      })}
    </div>
    {modifyUser && <ModifyForm modify={modifyUser} onSubmit={onSubmit} />}
  </div>
}

export default Users;
