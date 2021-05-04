import { useEffect, useState } from 'react'
import { db } from './firebase'


function App() {
  const [tareas, setTareas] = useState([])

  useEffect(() => {
    obtenerDatos()    
  }, [])

  const obtenerDatos = async () =>{
    
    const data = await db.collection('tareas').get()    
    const arrayData = data.docs.map(doc=>({id: doc.id, ...doc.data()}))
    setTareas(arrayData)
    console.log("Estas son las tareas ", tareas);
   
  }
  return (
    <div class="container mr-3">
      <div class="row">
        <div class="col-md-6">
          <h2>Lista de tareas</h2>
          <ul class="list-group">
            {
              tareas.map(item=>(
                <li class="list-group-item" key={item.id}>{item.name}</li>
              ))
            }
          </ul>
        </div>
        <div class="col-md-6">
          formulario
        </div>
      </div>
      
    </div>
  );
}

export default App;
