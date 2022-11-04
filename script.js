
let formulario = document.querySelector('#form')
let formulario2 = document.querySelector('#form2')
const productIitem = document.querySelector('.catalog')
const containerLoadMore = document.querySelector('.container-loadMore')
const btnLoadMore = document.querySelector('.btn-loadMore')






// VALIDANDO FORMULÁRIO
formulario.onsubmit = function(evento) {
    evento.preventDefault() // prevenido comportamento padrão do formulario 

    let temErro = false
    
    let inputNome = document.forms['form']['nome']
    if (!inputNome.value) {
        temErro = true
        inputNome.classList.add('inputError') // caso não for preenchido adicione a classe 'inputError' estilizada no css 

        //console.log(inputNome.nextSibling) aqui vejo qual é o netSibling( próximo irmão do campo input) que no caso vai ser o  span que vou adicinar a msg de erro
        let span = inputNome.nextSibling.nextSibling //sabendo disso declaro uma variável e insiro o texto personalizado 
        span.innerText = 'Digite o nome!'
    } else { // caso contrário 
        inputNome.classList.remove('inputError') //caso for preenchido removo a classe 'inputError' 

        let span = inputNome.nextSibling.nextSibling // e apago a mensagem do span 
        span.innerText = ''

    } 

    let inputEmail = document.forms['form']['email']
    if (!inputEmail.value) {
        temErro = true
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
        temErro = true
        inputCpf.classList.add('inputError') 

        
        let span = inputCpf.nextSibling.nextSibling 
        span.innerText = 'Digite o CPF!'
    } else { 
        inputCpf.classList.remove('inputError') 

        let span = inputCpf.nextSibling.nextSibling 
        span.innerText = ''

    } 

    // botão enviar 
    const botaoEnviar = document.querySelector('#form>button')
    if(!temErro) {
        sendIsPressed = 'sended'
        if(sendIsPressed === 'sended') {
            botaoEnviar.classList.add('sendSucess')
            let span = botaoEnviar.nextSibling.nextSibling
            span.innerText = 'Enviado com sucesso!'
        } 
    }
    
}

// FORMULÁRIO 2 
formulario2.onsubmit = function(evento) {
    evento.preventDefault()

    let temErro = false

    let nameFriend = document.forms['form2']['nome']
    if(!nameFriend.value) {
        temErro = true
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
        temErro = true
        friendEmail.classList.add('inputError')

    let span = friendEmail.nextSibling.nextSibling
    span.innerText = 'Digite o email!'
    } else {
        friendEmail.classList.remove('inputError')

        let span = friendEmail.nextSibling.nextSibling
        span.innerText= ''
    }

    const botaoEnviar = document.querySelector('#form2>button')
    if(!temErro) {
        sendIsPressed = 'sended'
        if(sendIsPressed === 'sended') {
            botaoEnviar.classList.add('sendSucess')
            let span = botaoEnviar.nextSibling.nextSibling
            span.innerText = 'Enviado com sucesso!'
        } 
    }
}
    
 // CONSUMINDO API
 
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
        productIitem.innerHTML += `
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