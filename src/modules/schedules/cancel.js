import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel"

const periods = document.querySelectorAll(".period")


// Gera um evento de click para cada lista (manhã, tarde e noite)
periods.forEach((periods) => {
    // Captura o evento de clique na lista
    periods.addEventListener("click", async (event) => {
        if(event.target.classList.contains("cancel-icon")){
            // Obtém a li pai do elemento clicado
            const item = event.target.closest("li")
            if (!item) return 

            // Pega o id do agendamento para remover
            const { id } = item.dataset
            console.log("ID clicado:", id)

            // Confirma que o id foi selecionado
            if(!id){
                // Confirma se o usuário quer cancelar
                console.error("ID não encontrado")
                return
            }

            const isConfirm = confirm("Tem certeza que deseja cancelar esse agendamento?") 
            
                if(isConfirm){
                    // Faz a requisição na API para cancelar
                    await scheduleCancel({id})

                    // Recarrega os agendamentos
                    schedulesDay()
                }
        }
    })
})