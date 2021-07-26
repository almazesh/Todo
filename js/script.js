const title = document.querySelector('.title');
const feedback = document.querySelector('.feedback');
const url = document.querySelector('.url');
const addTask = document.querySelector('.addTask');
const signOut = document.querySelector('.signOut')
const container = document.querySelector('.row')
const searchTitle = document.querySelector('.searchTitle')
// ADD the task
window.addEventListener('load' ,e=>{
    if(!localStorage.getItem('todos')){
        localStorage.setItem('todos',JSON.stringify([]))
    }else{
        const todo = JSON.parse(localStorage.getItem('todos'))

        console.log(todo)

        const newTodos = todo.map((item , index)=>{
            return {...item , id:index}
        })

        localStorage.setItem('todos',JSON.stringify([...newTodos]))


        const todos = JSON.parse(localStorage.getItem('todos'))

        Card(todos)
    }   
    
})





addTask.addEventListener('click' , e=>{
    e.preventDefault()
    if(title.value !== '' && feedback.value !== '' && url !== ''){
         const todos = JSON.parse(localStorage.getItem('todos'))

         localStorage.setItem('todos',JSON.stringify([...todos , {title:title.value , content:feedback.value , image:url.value}]))
         window.location.reload();
    }else{
        alert('Error')
    }
})





function Card(arr){
    let todos = arr.map(({title , content , image , id}) => {
        return `
            <div class="col-xl-3 mt-5 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h4>${title}</h4>
                    </div>
                    <div class="card-body">
                        <img src=${image} class="w-100">
                        <p>${content}</p>
                    </div>
                    <div class="card-footer">
                        <button data-id=${id} onclick="Delete(${id})" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
    `
    })

    container.innerHTML = todos
   
}




function Delete(id){
    var ask = confirm('Are you sure?')
    if(!ask) return ;

    const todo = JSON.parse(localStorage.getItem('todos'))
    const newTodos = todo.filter(item => item.id !== id)

    localStorage.setItem('todos' , JSON.stringify(newTodos))
    window.location.reload()
}



signOut.addEventListener('click',e=>{
    e.preventDefault();

    localStorage.setItem('isAuth' , 'false')
    window.open('../auth.html' , '_self')
})


window.addEventListener('load', () => {
   if(localStorage.getItem('isAuth') == 'false'){
       window.open('../auth.html','_self')
   }else{
       return
   }
})



searchTitle.addEventListener('input' , e =>{
    var value = e.target.value.toUpperCase()

    const todos = JSON.parse(localStorage.getItem('todos'))

    const filtered = todos.filter(({title}) => title.toUpperCase().includes(value))
    console.log(filtered)

    Card(filtered)
})