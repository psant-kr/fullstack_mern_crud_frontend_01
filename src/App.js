import React, { useEffect, useState } from 'react'

const App = () => {
  // to store the form data
  const [form, setForm] = useState({ username: "", password: "" });
  //after fetching the data
  const [users, setUsers] = useState([]);
  const [button, setButton] = useState(false);
  const [updateId, setUpdateId] = useState()


  // form handler
  // e is the  synthetic event always.
  const handleForm = (e) => {
    // console.log(e.target.value, e.target.name);
    setForm({
      //destructure to see aal the form previous data
      ...form,
      //key and value pairs to be stored 
      [e.target.name]: e.target.value
    })
  }

  //handling the form data
  // e is the synthetic event always.
  // preventDefault is used to stop the default behaviour of  the form;

  const handleSubmit = async (e) => {
    // e.preventDefault();

    //it will take time to get the response from server thats why
    // fetch is an async operation
    const response = await fetch('http://localhost:8080/demo', {
      method: 'POST',
      // fetch will directly send the form as an object without processing
      // but network will take in the form of string, thats why
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // here text is for text , for json it will be json
    const data = await response.json();
    console.log(data);
    getUsers()
  }
  // fetching the data from server
  const getUsers = async () => {
    // console.log("pkkkk")
    const response = await fetch('http://localhost:8080/demo', {
      method: 'GET',
    })
    const data = await response.json();
    setUsers(data);
    // console.log(data);
  }

  useEffect(() => {
    getUsers()
  }, [])
  // for deleting the data from server
  const handleDelete = async (id) => {
    console.log("item deleted", id)
    const response = await fetch(`http://localhost:8080/demo/${id}`, {
      method: 'DELETE',
    })

    const data = await response.json();
    console.log(data);
    getUsers()
  }
  // for updating the data from server
  const handleUpdate = async (id, username, password) => {
    setUpdateId(id)
    setButton(true)

    // if(button ===true){
    //   setButton(false)
    // }else{
    //   setButton(true)
    // }

    console.log("item updated", id, username, password)
    setForm({
      username: username,
      password: password
    })
    // const response = await fetch(`http://localhost:8080/demo/${id}`, {
    //   method: 'PUT',
    // })

    // const data = await response.json();
    // console.log(data);
    // getUsers()
  }

  const handleUpdateData = async () => {
    setButton(false)
    console.log("my id", updateId)
    const response = await fetch(`http://localhost:8080/demo/${updateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    const data = await response.json();
    console.log(data, "ggg------");
    getUsers()

  }

  return (
    <>
      {/* <form onSubmit={handleSubmit} > */}

      {/* <p>{JSON.stringify(form)}</p> */}
      <label>username</label>
      <input type='text' name="username" value={form.username} onChange={handleForm}></input>
      <label>password</label>
      <input type='password' name="password" value={form.password} onChange={handleForm}></input>
      {/* //took help from vikash */}
      {
        button ? <button onClick={handleUpdateData} >Update data</button> : <button onClick={handleSubmit} >add</button>
      }


      {/* </form> */}
      {/* here to display the data map is used , so need to make one variable */}
      <div>
        <ul>
          {users.map((user) =>
            <li key={user._id}>{user.username},{user.password} <button onClick={() => handleDelete(user._id)}>DELETE</button>
              <button onClick={() => handleUpdate(user._id, user.username, user.password)}>UPDATE</button> </li>
          )}
        </ul>
      </div>

    </>
  )
}

export default App