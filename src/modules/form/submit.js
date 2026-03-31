import dayjs from "dayjs"

import { scheduleNew } from  "../../services/schedule-new.js"
import { schedulesDay} from "../schedules/load.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// Data atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual
selectedDate.value = inputToday

// Define a data mínima como sendo a data atual
selectedDate.min = inputToday

form.onsubmit = async (event) => {
    // Previne o comportamento padrão de carregar a página
    event.preventDefault()

    try {
        // Recuperando o nome do cliente
        const name = clientName.value.trim()
        

        // Verifica se o nome foi preenchido
        if(!name){
            return alert("Informe o nome do cliente!")
        }


        // Recupera o horário selecionado
        const hourSelected = document.querySelector(".hour-selected")
        

        // Verifica se o horário foi selecionado
        if(!hourSelected){
            return alert("Selecione o horário!")
        }


        // Recupera somente a hora
        const [hour] = hourSelected.innerText.split(":")
        

        // Insere a hora na data
        const when = dayjs(selectedDate.value).add(hour, "hour")
        

        // Gera um ID
        const id = `${Date.now()}`

       
        // Faz o agendamento
        await scheduleNew({
            id,
            name,
            when,
        })

        // Recarrega os agendamentos
        await schedulesDay()

        // Limpa o input de nome do cliente
        clientName.value = ""
    } catch (error) {
        alert("Não foi possível realizar o agendamento")
        console.log(error)
    }
}