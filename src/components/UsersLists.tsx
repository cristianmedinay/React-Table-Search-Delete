import { type User} from '../tipos.d'
export enum SortBy {
    NONE = 'none',
    NAME= 'name',
    LAST = 'last',
    COUNTRY = 'country',
}
interface Props{
    changeSorting: (sort: SortBy)=>void
    users:User[]
    showColors:Boolean
    deleteUser:(email:string)=> void
}

export const UsersLists = ({changeSorting, users,showColors,deleteUser}:Props) => {
  return (
    <>
        <table>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th onClick={()=>changeSorting(SortBy.LAST)}>Apellido</th>
                    <th onClick={()=>changeSorting(SortBy.COUNTRY)}>Pais</th>
                    <th>Acciones</th>                 
                </tr>
            </thead>
            <tbody>
               {
                users.map((user,index)=>{
                    const bgColor = index % 2 ===0 ?'#333':'#555';
                    const color = showColors ? bgColor : 'transparent'
                    return(
                        <tr key={user.email} style={{backgroundColor:color}}>
                            <td>
                                <img src={user.picture.thumbnail} alt="" />
                            </td>
                            <td>
                                {user.name.first}
                            </td>
                            <td>
                                {user.name.last}
                            </td>
                            <td>
                                {user.location.country}
                            </td>
                            <td>
                                <button onClick={()=>{deleteUser(user.email)}}>Eliminar</button>
                            </td>

                        </tr>
                    )

                })
               }
            </tbody>
        </table>
    </>
  )
}
