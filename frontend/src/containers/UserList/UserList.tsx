import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './UserList.module.css';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import { AiOutlineSearch } from 'react-icons/ai';
import { verifyAdmin } from '../../helper/VerifyAdmin';
export default function UserList() {
  const [users, setUsers] = useState<any>([])
  const [filteredUsers, setFilteredUsers] = useState<any>([])
  const [checked, setChecked] = useState<any>(true)
  const [query, setQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const handleQueryChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setQuery(event.target.value);
  };
  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    let filteredUsers= users.filter((user: any) => {
      const nameMatch = user.name.toLowerCase().includes(query.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(query.toLowerCase());
      return nameMatch || emailMatch;
    })
    console.log(filteredUsers)
    setFilteredUsers(filteredUsers)
  };
  useEffect(() => {
    const checkAdmin = async () => {
      const isAdmin = await verifyAdmin();
      setIsAdmin(isAdmin)

    }
    checkAdmin()
    axios.get(process.env.REACT_APP_BACKEND_URL+'/api/users')
      .then(response => {
        setUsers(response.data)
        setFilteredUsers(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, [])
  if (!isAdmin) {
    return <div>User Unauthorized!</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <AiOutlineSearch className="" />
        <form onSubmit={handleSearch} >
          <input required className={styles.searchBar} type="text" name="prompt" value={query} onChange={handleQueryChange}>
          </input>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: any) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <label>
                  <Toggle
                    defaultChecked={checked}
                    icons={false}
                    onChange={() => setChecked(!checked)} />
                  <span>{checked ? "Active" : "Banned"}</span>
                </label>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
