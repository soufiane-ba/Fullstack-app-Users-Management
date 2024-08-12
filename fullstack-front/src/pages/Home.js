import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [users, setUsers]=useState([]);

    useEffect(()=>{
        loadUsers();
    },[]);

    const loadUsers=async()=>{
        const result=await axios.get("http://localhost:8080/users")
        setUsers(result.data);
    }

    const deleteUser=async(id)=>{
        await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers();
    }

    const toggleCheck = async (id, checked) => {
        await axios.put(
            `http://localhost:8080/user/${id}/check`,
            JSON.stringify(checked),  // Envoi des données en format JSON
            {
                headers: {
                    'Content-Type': 'application/json'  // Spécifie le type de contenu
                }
            }
        );
        loadUsers(); // Recharge les utilisateurs pour refléter les changements
    };
    
  return (
    <div className='container'>
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Checked</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

    {
        users.map((user,index)=>(
            <tr>
            <th scope="row" key={index}>{index+1}</th>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
                <input
                    type="checkbox"
                    checked={user.checked}
                    onChange={(e) => toggleCheck(user.id, e.target.checked)}
                />
            </td>
            
            <td>
                <Link className='btn btn-primary mx-2'
                to={`/viewuser/${user.id}`}
                >View</Link>
                <Link className='btn btn-outline-primary mx-2'
                to={`/edituser/${user.id}`}
                >Edit</Link>
                <button className='btn btn-danger mx-2'
                onClick={()=>deleteUser(user.id)}
                >
                    Delete</button>
            </td>
          </tr>
        ))
    }


  </tbody>
</table>
    </div>
    </div>
  )
}




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export default function Home() {
//     const [users, setUsers]=useState([]);
//     const [checkedUsers, setCheckedUsers] = useState({});

//     useEffect(()=>{
//         loadUsers();
//         loadCheckedUsers();
//     },[]);

//     const loadUsers=async()=>{
//         const result=await axios.get("http://localhost:8080/users")
//         setUsers(result.data);
//     }

//     const loadCheckedUsers = () => {
//         const storedCheckedUsers = JSON.parse(localStorage.getItem("checkedUsers"));
//         if (storedCheckedUsers) {
//             setCheckedUsers(storedCheckedUsers);
//         }
//     };

//     const handleCheckClick = (userId) => {
//         const updatedCheckedUsers = {
//             ...checkedUsers,
//             [userId]: !checkedUsers[userId]
//         };
//         setCheckedUsers(updatedCheckedUsers);
//         localStorage.setItem("checkedUsers", JSON.stringify(updatedCheckedUsers));
//     };

//   return (
//     <div className='container'>
//         <div className='py-4'>
//         <table className="table border shadow">
//   <thead>
//     <tr>
//       <th scope="col">#</th>
//       <th scope="col">Name</th>
//       <th scope="col">Username</th>
//       <th scope="col">Email</th>
//       <th scope="col">Checked</th>
//       <th scope="col">Action</th>
//     </tr>
//   </thead>
//   <tbody>

//     {
//         users.map((user,index)=>(
//             <tr>
//             <th scope="row" key={index}>{index+1}</th>
//             <td>{user.name}</td>
//             <td>{user.username}</td>
//             <td>{user.email}</td>
//             <td>
//                                         <button
//                                             className={`btn mx-2 ${checkedUsers[user.id] ? 'btn-success' : 'btn-outline-secondary'}`}
//                                             onClick={() => handleCheckClick(user.id)}
//                                         >
//                                             {checkedUsers[user.id] ? 'Checked' : 'Check'}
//                                         </button>
//                                     </td>
//             <td>
//                 <button className='btn btn-primary mx-2'>View</button>
//                 <Link className='btn btn-outline-primary mx-2'
//                 to={`/edituser/${user.id}`}
//                 >Edit</Link>
//                 <button className='btn btn-danger mx-2'>Delete</button>
//             </td>
//           </tr>
//         ))
//     }


//   </tbody>
// </table>
//         </div>
//     </div>
//   )
// }