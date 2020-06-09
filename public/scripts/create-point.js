

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    //Promessa
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    //resposta que foi transformada em json.
    //Nova Promessa
    //Concatenar o ufSelect
    .then( states => { 


        for(const state of states){
            ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`
        }

       
    })
}
//Executar a funcao
populateUFs()
//colocar o evento dentro
function getCities(event){
    //selecionar a cidade
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
   
    //target - onde o evento foi executado

    //valor do estado
    const ufValue = event.target.value

    //Falar qual é o número
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
   
   
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //Limpar o option
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"

    citySelect.disabled = true

    //trocar por city
    fetch(url)
    .then( res => res.json() )
    .then( cities => { 

        
        //trocar o id por .nome para aparecer o nome da cidade
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

       citySelect.disabled = false

    })
}



//Procurar elemento//
document
    .querySelector("select[name=uf]")
    //Está procurando um select de nome "uf"//
    //Quando mudar será executada, por isso fica sem os parenteses
    .addEventListener("change", getCities)
      
    //Quando tem mais de uma opcao, ao selecionar
    //o ouvidor executa a funcao


    //Itens de coleta
    //Marcar os selecionados
    //Pegar todos os li's
                                                    //os li's
    const itemsToCollect = document.querySelectorAll(".items-grid li")

    //Repetição

     //Adicionar o ouvidor de Eventos
        //Ouvir o click
             //A função vai capturar um evento
        
    for (const item of itemsToCollect){
       
        item.addEventListener("click", handleSelectedItem)
    }


    //Itens selecionados


    const collectedItems = document.querySelector("input[name=items]")
    //Let pode mudar de valor
    let selectedItems = []

        //A função vai capturar um evento
        //dataset.id vai pegar o numero
        function handleSelectedItem(event) {

            const itemLi = event.target 
            //deixar ou tirar o selecionado
            //toogle : adiciona ou remove
            itemLi.classList.toggle("selected")


            const itemId = itemLi.dataset.id            
        
            

            //verificar se existem itens selecionados, se sim
            // pegar os itens selecionados

            const alreadySelected = selectedItems.findIndex(item =>{
               const itemFound = item == itemId // isso será true ou false
               return itemFound
            })


             // Fica -1 quando não tem selecionado
            //Quando acha o index do array fica 0,1...

            //Se já estiver selecionado 
            if(alreadySelected >= 0) {
                //tirar da seleção
                const filteredItems = selectedItems.filter( item => {
                    const itemIsDifferent = item != itemId //false

                    return itemIsDifferent


                })

                selectedItems = filteredItems
            } else {
                //se não estiver selecionado 
                //adicionar a seleção

                selectedItems.push(itemId)
            }
           

           

       

           
            //atualizar o campo escondido com os itens selecionados
        
           collectedItems.value = selectedItems
        
        
        }


    
    