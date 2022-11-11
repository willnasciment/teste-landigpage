
let formulario = document.querySelector('#form')
let formulario2 = document.querySelector('#form2')
const productItem = document.querySelector('.catalog')
const containerLoadMore = document.querySelector('.container-loadMore')
const btnLoadMore = document.querySelector('.btn-loadMore')

//validating form
formulario.onsubmit = function(evento) {
    evento.preventDefault() 

    let isError = false
    
    let inputName = document.forms['form']['nome']
    if (!inputName.value) {
        isError = true
        inputName.classList.add('inputError') 

        
        let span = inputName.nextSibling.nextSibling 
        span.innerText = 'Digite o nome!'
    } else { 
        inputName.classList.remove('inputError')
        
        let span = inputName.nextSibling.nextSibling 
        span.innerText = ''

    } 

    let inputEmail = document.forms['form']['email']
    if (!inputEmail.value) {
        isError = true
        inputEmail.classList.add('inputError') 

        
        let span = inputEmail.nextSibling.nextSibling 
        span.innerText = 'Digite o Email!'
    } else { 
        inputEmail.classList.remove('inputError') 

        let span = inputEmail.nextSibling.nextSibling 
        span.innerText = ''

    } 

    let inputCpf= document.forms['form']['cpf']

    if (!inputCpf.value) {
        isError = true
        inputCpf.classList.add('inputError') 

        
        let span = inputCpf.nextSibling.nextSibling 
        span.innerText = 'Digite o CPF!'
    } else { 
        inputCpf.classList.remove('inputError') 

        let span = inputCpf.nextSibling.nextSibling 
        span.innerText = ''

    } 

   
    const botaoEnviar = document.querySelector('#form>button')
    if(!isError) {
        sendOnPressed = 'sended'
        if(sendOnPressed === 'sended') {
            botaoEnviar.classList.add('sendSucess')
            let span = botaoEnviar.nextSibling.nextSibling
            span.innerText = 'Enviado com sucesso!'
        } 
    }
    
}


formulario2.onsubmit = function(evento) {
    evento.preventDefault()

    let isError = false

    let nameFriend = document.forms['form2']['nome']
    if(!nameFriend.value) {
        isError = true
        nameFriend.classList.add('inputError')

    let span = nameFriend.nextSibling.nextSibling
    span.innerText = 'Digite o nome!'
    } else {
        nameFriend.classList.remove('inputError')

        let span = nameFriend.nextSibling.nextSibling
        span.innerText= ''
    }

    let friendEmail = document.forms['form2']['email']
    if(!friendEmail.value) {
        isError = true
        friendEmail.classList.add('inputError')

    let span = friendEmail.nextSibling.nextSibling
    span.innerText = 'Digite o email!'
    } else {
        friendEmail.classList.remove('inputError')

        let span = friendEmail.nextSibling.nextSibling
        span.innerText= ''
    }

    const buttonSubmit  = document.querySelector('#form2>button')
    if(!isError) {
        sendOnPressed = 'sended'
        if(sendOnPressed === 'sended') {
            buttonSubmit .classList.add('sendSucess')
            let span = buttonSubmit .nextSibling.nextSibling
            span.innerText = 'Enviado com sucesso!'
        } 
    }
}
    
 // API
 
 let urlApi = `https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1`

fetch(urlApi)
    .then(turnIntoJson)
    .then(loadItems)
    .catch(error => console.log('erro: ' + error))

let contClicks = 0;

function loadItems(data) {

    const lengthObj = data.products.length
    const products = data.products

    for (let i = 0; i < lengthObj; i++) {
        productItem.innerHTML += `
                <div class="product-item">
                    <div class="image-item">
                        <img src="${products[i].image}" alt="Produto">
                    </div>
                    <div>
                        <h4 class="name-item">
                            ${products[i].name}
                        </h4>
                        <p class="desc-item">
                            ${products[i].description}
                        </p>
                        <span class="oldPrice-item">De: R$ ${products[i].oldPrice}</span>
                        <h4 class="price-item">Por: R$ ${products[i].price}</h4>
                        <span class="option-price-item">Ou: ${products[i].installments.count}x de R$
                            ${products[i].installments.value}</span>
                        <a href="#" class="buttom-item">Comprar</a>
                    </div>
                </div>
        `
    }

    contClicks++;
    if (contClicks >= 4) {
        containerLoadMore.classList.add('remove');
    }

    btnLoadMore.onclick = function () {
       

        fetch(`https://${data.nextPage}`)
            .then(turnIntoJson)
            .then(loadItems)
            .catch(error => console.log(error))

        setTimeout(() => {
            btnLoadMore.classList.remove('remove');

        }, 500)
    }
}

function turnIntoJson(response) {
    return response.json()
}