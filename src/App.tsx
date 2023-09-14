import { useEffect, useMemo, useRef, useState } from 'react'
/* const reactLogo = require('./assets/react.svg') as string; */
import { type User } from './tipos'
import{ UsersLists} from './components/UsersLists'
import './App.css'

export enum SortBy {
  NONE = 'none',
  NAME= 'name',
  LAST = 'last',
  COUNTRY = 'country',
}


const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [showColors,setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
/*   const [sortByCountry, setSortByCountry] = useState(false);
 */  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null >(null)
  
  useEffect(() => {
    fetch('https://randomuser.me/api?results=100').then(res=> res.json()).then(res=> {
      setUsers(res.results);
      originalUsers.current = res.results;
    }).catch(err=>{
      console.error(err)
    })
  },[])

  const toggleColors = () =>{
      setShowColors(!showColors);
  }

  const handleDelete = (email:string) =>{
    const filterUsers = users.filter((user) => user.email!=email)
    setUsers(filterUsers);
 
  }

  const handleReset=()=>{
    setUsers(originalUsers.current);
  } 

  const handleChangeSort=(sort:SortBy) => {
      setSorting(sort);
  }

  const toggleShorByCountry = (): void => {
    const newSortingValue =  sorting == SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue);
     /* setSortByCountry(prev => !prev) */
   }
 
  const filteredUsers =  useMemo(() => { 
    console.log('sorCountry')
   return typeof filterCountry == 'string' && filterCountry.length > 0 ?
   users.filter((user=>{
    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  })): users;

  },[ users,filterCountry])

  /*const sortUsers = (users: User[]) => {
    console.log('sortUsers')
    return sortByCountry ? [...users].sort((a,b)=>{
      return a.location.country.localeCompare(b.location.country);
  }) : users;
  } */

  const sortedUsers = useMemo(() => {

  /*   console.log('sortUsers')
    return sorting == SortBy.COUNTRY ? filteredUsers.toSorted((a: { location: { country: string } },b: { location: { country: string } }) =>{
        return a.location.country.localeCompare(b.location.country);
    }) : filteredUsers;
 */

    if(sorting==SortBy.NONE) return filteredUsers

    const compareProperties: Record<string,(user:User)=>any >={
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last,
    }    
  
    return filteredUsers.toSorted((a,b)=>{
    const extractProperty = compareProperties[sorting]
    return extractProperty(a).localeCompare(extractProperty(b))
    })

  },[ filteredUsers, sorting])

  

  /*  const sortedUsers = sortByCountry ? [...users].sort((a,b)=>{
      return a.location.country.localeCompare(b.location.country);
  }) : users; */


  return (
    <>
      <header>
        <button onClick={toggleColors}>Colorear files</button>
        <button onClick={toggleShorByCountry}>{sorting == SortBy.COUNTRY ? 'No Ordenar por pais' : 'Ordenar por pais'}</button>
        <button onClick={handleReset}>Resetear Estado</button>
        <input type="text" placeholder='Filtra por pais' onChange={(e)=>{
          setFilterCountry(e.target.value)
        }} />
      </header>
      <main>

      <UsersLists changeSorting={handleChangeSort}  showColors={showColors} users={sortedUsers} deleteUser={handleDelete} />
      </main>
     {/*  {
        JSON.stringify(users)
      } */}
    </>
  )
}

export default App
