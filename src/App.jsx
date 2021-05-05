import { useEffect, useState } from 'react'
import { db } from './firebase'


function App() {
  const [tareas, setTareas] = useState([])
  const [tarea, setTarea] = useState('')

  useEffect(() => {
    obtenerDatos()    
  }, [])

  const obtenerDatos = async () =>{    
    const data = await db.collection('tareas').get()    
    const arrayData = data.docs.map(doc=>({id: doc.id, ...doc.data()}))
    setTareas(arrayData)   
  }

  const agregar = async (e) =>{
    e.preventDefault();
    if(!tarea.trim()){
      console.log('Esta vacio');
      return
    }
    try{
      let newtask = {
        name : tarea,
        date : Date.now()
      }
      let data = await db.collection('tareas').add(newtask)
      setTarea('')
      setTareas([
        ...tareas,
        {...newtask, id: data.id}
      ])
    }catch(error){
      console.log(error);
    }
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
          <h2>Formulario</h2>
          <form onSubmit={agregar} method="post">
            <div class="mb-3">
              <input type="text" 
                placeholder="Ingrese tarea" 
                class="form-control" 
                onChange={e => setTarea(e.target.value)}
                value={tarea}/>
              
              <div class="d-grid gap-2 mt-2">
                <button type="submit" class="btn btn-primary btn-sm">Agregar</button>                
              </div>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}

export default App;
