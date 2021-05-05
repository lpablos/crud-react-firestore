import { useEffect, useState } from 'react'
import { db } from './firebase'


function App() {
  const [tareas, setTareas] = useState([])
  const [tarea, setTarea] = useState('')
  const [modoEdicion, setModoEdicion] = useState(false)
  const [identyEdit, setIdentyEdit] = useState('')

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

  const eliminar = async (id) => {
    try {
      await db.collection('tareas').doc(id).delete()
      let arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)
    } catch (error) {
      console.log(error);
    }
  }

  const activarEdicion = (task)=>{    
    setModoEdicion(true)
    setTarea(task.name)
    setIdentyEdit(task.id)
  }
  
  const editar = async (e) =>{
    e.preventDefault()
    if(!tarea.trim()){
      console.log("tarea vacia");
      return
    }
    try {
      await db.collection('tareas').doc(identyEdit).update({name:tarea})
      let arrayEditado = tareas.map(item => (item.id === identyEdit)? { id: item.id, name: tarea, date: item.date } : item)
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setIdentyEdit('')
    } catch (error) {
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
                <li class="list-group-item"  key={item.id}>
                  <div class="row align-items-start">
                    <div class="col">{item.name}</div>                  
                    <div class="col float-end">
                      <button class="btn btn-warning mx-1" onClick={()=>activarEdicion(item)}>Editar</button>
                      <button class="btn btn-danger mx-2" onClick={()=> eliminar(item.id)}>Eliminar</button>
                    </div>
                  </div>
                </li>
              ))
            }
           
          </ul>
        </div>
        <div class="col-md-6">
          <h2>
            {
              modoEdicion
              ? ('Editar Tarea')
              : ('Agregar Tarea')
            }
          </h2>
          <form onSubmit={ modoEdicion? editar : agregar} method="post">
            <div class="mb-3">
              <input type="text" 
                placeholder="Ingrese tarea" 
                class="form-control" 
                onChange={e => setTarea(e.target.value)}
                value={tarea}/>
              
              <div class="d-grid gap-2 mt-2">
                <button 
                  type="submit" 
                  class={
                    modoEdicion
                    ? "btn btn-warning btn-sm"
                    : "btn btn-primary btn-sm"
                  }>
                  {
                    modoEdicion
                    ? ('Editar')
                    : ('Guardar')
                  }
                </button>                
              </div>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}

export default App;
