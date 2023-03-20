import { useState } from 'react'
import { db } from './firebaseConnection';
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'

import './app.css';



function App() {
  const [ tarefa, setTarefa] = useState('');
  const [ responsavel, setResponsavel] = useState('');
  const [ idTask, setIdTask] = useState('');
  
  const [ tarefas, setTarefas] = useState([]);

  
async function handleAdd(){
 /* salvar em um ID especifico: 
  await setDoc(doc(db, 'tarefas', 'tarefa'),{
    tarefa: tarefa,
    responsavel: responsavel,
  })
  .then(() => {
    console.log('Dados registrados')
  })
  .catch((error) => {
    console.log('Something is whrong' + error)

  })
*/
await addDoc(collection(db,'tarefas'),{
tarefa: tarefa,
responsavel: responsavel,
})
.then(() => {
  console.log('Dados registrados')
  setResponsavel('');
  setTarefa('');

})
.catch((error) => {
  console.log('Something is whrong' + error)

})

}

async function buscarTarefa(){
 
 /* busca de uma tarfe especifica 
  const tarRef = doc(db, 'tarefas','pPUSCdiUxR76CHiQr4O1')

await getDoc(tarRef)
.then((snapshot) => {
  setResponsavel(snapshot.data().responsavel);
  setTarefa(snapshot.data().tarefa);

})
.catch((error) => {
  console.log('Something is whrong' + error)
})
*/
const tarRef = collection(db,'tarefas')
await getDocs(tarRef)
.then((snapshot) => {
  let lista = [];

  snapshot.forEach((doc)=>{
    lista.push({
      id: doc.id,
      tarefa: doc.data().tarefa,
      responsavel: doc.data().responsavel,

    })
  })

  setTarefas(lista);
})
.catch((error) => {
  console.log('Something is whrong' + error)
})
}


async function editarTask(){
const docRef = doc(db, 'tarefas', idTask)  

await updateDoc(docRef, { 
  tarefa: tarefa,
  responsavel: responsavel
})
.then(()=>{
  console.log('Atualizado com sucesso')
  //para limpar os campos://
  setIdTask('');
  setResponsavel('');
  setTarefa('');

})
.catch((error) => {
  console.log('Something is whrong' + error)
  
})
  

async function apagarTask(){
  const docRef = doc(db, 'tarefas', idTask)  
  
  await deleteDoc(docRef)
  .then(()=>{
    alert('deletado')
    console.log('Deletado com sucesso')

   
  })
  .catch((error) => {
    console.log('Something is whrong' + error)
    
  })

}
}
  return (
    <div className="App">
      <h1> TO DO LIST</h1>
     
      <div className='container'>

        <label> ID da Tarefa: </label>
        <input
        placeholder='Digite o ID da Tarefa: '
        value={idTask}
        onChange={ (e) => setIdTask(e.target.value)}
        />
    <br/>

      <label>Tarefa: </label>
      <textarea
        type="text"
        placeholder='digite a tarefa'
        value={tarefa}
        onChange={(e)=> setTarefa(e.target.value)}      
      
      />
<br/>
      <label> Responsavel:</label>
      <input 
      type='text'
       placeholder='responsavel pela tarefa'
       value={responsavel}
        onChange={(e)=> setResponsavel(e.target.value)}      
      
      />
     <button onClick={handleAdd}>Cadastrar</button>
     <button onClick={buscarTarefa}>Buscar tarefa</button> <br/>

     <button onClick={editarTask}> Atualizar tarefa </button>

     <ul>
      {tarefas.map( (post) => {
        return(
          <li key={post.id}>
            <strong>ID: {post.id}</strong><br/>
            <span>Tarefa: {post.tarefa} </span><br/>
            <span>Responsavel: {post.responsavel} </span><br/>
            <button onClick={ () => apagarTask(post.id) }>Excluir</button> <br/> <br/>
            <br/>

          </li>
        )
      })}
     </ul>
      </div>
        </div>
  );
}

export default App;
