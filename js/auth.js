const email = document.querySelector('.email')
const password = document.querySelector('.password')
const submit = document.querySelector('.submit')

submit.addEventListener('click' , e=>{
    e.preventDefault();
    
    if(email.value == 'admin' && password.value == 'admin'){
        alert('Вы зашли!')
        localStorage.setItem('isAuth' , 'true')
        window.open('../index.html' , '_self')
    }else{
        alert('Заполните поля! либо повторите ввод!');
        localStorage.setItem('isAuth' , 'false')
        email.value = '';
        password.value = '';

    }
})


window.addEventListener('load',e=>{
    if(!localStorage.getItem('isAuth')) return;

    if(localStorage.getItem('isAuth') === 'true'){
        window.open('../index.html' , '_self')
    }
})