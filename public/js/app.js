document.addEventListener("DOMContentLoaded", () => {
    const semana = firstLastDayCurrentWeek()
    document.querySelector(".fecha span").innerHTML=formatDate(semana.fechaInicio)+ " al " +formatDate(semana.fechaFin)
    obtenerClasesFront()
})


async function eliminarClase(idClase) {
  console.log(idClase)
  const response = await fetch("/clases/borrar", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({idClase})
  });
  obtenerClasesFront()
}

async function obtenerClasesFront() {
    
    const response = await fetch("/clases/ver");
    const clases = await response.json();

    const collectionDias = document.getElementsByClassName("dia");
       for (let i = 0; i < collectionDias.length; i++) {
         collectionDias[i].innerHTML = "";
       }

    const semanaActual = firstLastDayCurrentWeek();

    const clasesSemanaActual = clases.filter((clase) => {
      const fechaInicioClase = clase.fecha.split(" - ")[0];
      const fechaFinClase = clase.fecha.split(" - ")[1];
      //console.log(fechaInicioClase);/*  03/07/2023  */ 
      //console.log(fechaFinClase);/*  09/07/2023  */ 
      const fechaInicioSemanaClase = new Date(fechaInicioClase);
      const fechaFinSemanaClase = new Date(fechaFinClase); 
      
      // Comparar las fechas
      if (fechaInicioSemanaClase <= semanaActual.fechaFin && fechaFinSemanaClase >= semanaActual.fechaInicio) {
        console.log(fechaInicioClase);
        console.log(fechaFinClase);
        console.log('La clase esta en al semana actual');
      }
      return fechaInicioSemanaClase <= semanaActual.fechaFin && fechaFinSemanaClase >= semanaActual.fechaInicio;
    });

    
    clasesSemanaActual.forEach((materia, index) => {

        const columnaLunes =document.querySelector('.lunes')
        const columnaMartes =document.querySelector('.martes')
        const columnaMiercoles =document.querySelector('.miercoles')
        const columnaJueves =document.querySelector('.jueves')
        const columnaViernes =document.querySelector('.viernes')
        
        const cardMateria = document.createElement('article')
        cardMateria.classList.add('item')

        //añado clase segun la materia escogida
        if (materia.materia === 'js'){
            cardMateria.classList.add('js')
        }
        else if(materia.materia === 'diseno'){
            cardMateria.classList.add('diseno')
        }
        else if(materia.materia === 'html'){
            cardMateria.classList.add('html')
        }
        else if(materia.materia === 'css'){
            cardMateria.classList.add('css')
        }
        else if(materia.materia === 'toolbox'){
            cardMateria.classList.add('toolbox')
        }
    
    
        const cardFranja = document.createElement('h3');
        cardFranja.classList.add('materia-franja');
        cardFranja.textContent = materia.franja

        const botonEliminar = document.createElement("span");
        botonEliminar.classList.add('icon-button');
        botonEliminar.addEventListener("click", (event) => {
            eliminarClase(materia._id);
          });

    
        //añado elemento a columna diferente dependiendo de dia elegido
        if(materia.dia === 'lunes'){
            columnaLunes.appendChild(cardMateria)
        }
        else if(materia.dia === 'martes'){
            columnaMartes.appendChild(cardMateria)
        }
        else if(materia.dia === 'miercoles'){
            columnaMiercoles.appendChild(cardMateria)
        }
        else if(materia.dia === 'jueves'){
            columnaJueves.appendChild(cardMateria)
        }
        else if(materia.dia === 'viernes'){
            columnaViernes.appendChild(cardMateria)
        }

        cardMateria.appendChild(botonEliminar)
        cardMateria.appendChild(cardFranja)
    }
)}

// Obtener el elemento select del formulario
const fechaSelect = document.getElementById('fecha');

// Generar las opciones de semanas del mes de julio
const weeksInMonth = getWeeksInMonth(new Date().getFullYear(), 6); // 6 representa el mes de julio

for (let i = 0; i < weeksInMonth; i++) {
  const option = document.createElement('option');
  const startDate = getStartDateOfWeek(i, new Date().getFullYear(), 6); // 6 representa el mes de julio
  const endDate = getEndDateOfWeek(i, new Date().getFullYear(), 6); // 6 representa el mes de julio
  const lunes = formatDate(startDate);
  const domingo = formatDate(endDate);
  option.value = `${lunes} - ${domingo}`;
  option.text = `${lunes} - ${domingo}`;
  fechaSelect.appendChild(option);
}

// Función para obtener el número de semanas en un mes específico
function getWeeksInMonth(year, month) {
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);
  const firstWeekDay = (firstOfMonth.getDay() + 6) % 7;
  const length = Math.ceil((lastOfMonth.getDate() + firstWeekDay) / 7);
  return length;
}

// Funciones para obtener la fecha de inicio y fin de una semana específica
function getStartDateOfWeek(week, year, month) {
  const firstOfMonth = new Date(year, month, 1);
  const firstWeekDay = (firstOfMonth.getDay() + 6) % 7;
  const startDate = new Date(year, month, 1 + (week * 7) - firstWeekDay);
  return startDate;
}

function getEndDateOfWeek(week, year, month) {
  const startDate = getStartDateOfWeek(week, year, month);
  const endDate = new Date(startDate.getTime() + (6 * 24 * 60 * 60 * 1000));
  return endDate;
}

// Función para formatear la fecha como "dd/mm/aaaa"
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}
// buttons
const openForm = document.querySelector(".add-new"),
closeForm = document.querySelector(".close"),
addMateria = document.querySelector(".add");

//inputs
const formSection = document.querySelector(".form");




//functions


function firstLastDayCurrentWeek() {
  const date = new Date();
  const day = date.getDay();
  const first = date.getDate() - day + 1;
  const last = first + 6;
  const firstday = new Date(date.setDate(first));
  const lastday = new Date(date.setDate(last));

  return {
    fechaInicio: firstday,
    fechaFin: lastday
  };
}




/* function firstLastDayCurrentWeek(){
    const date = new Date();

    //numero del dia actual de la semana
    const day= date.getDay();

    //numero del primer dia de la semana actual, sin el +1, empezaría por Sunday (domingo)
    const first = (date.getDate() - day) +1;

    //numero del ultimo día de la semana actual
    const last = first + 6; 

    //fechas completas del primer y último día de la semana
    const firstday = new Date(date.setDate(first));
    const lastday = new Date(date.setDate(last));
    
    //formateo las fechas completas dd/mm/aaaa
    const desde = firstday.getDate() + "/" + (firstday.getMonth() +1) + "/" + firstday.getFullYear();
    const hasta = lastday.getDate() + "/" + (lastday.getMonth() +1) + "/" + lastday.getFullYear();

    return desde  + " al " + hasta;
} */

/* Show and close form */
openForm.addEventListener('click', (e) => {
    e.preventDefault();
    formSection.classList.add('form-show');
});

closeForm.addEventListener('click', (e) => {
    e.preventDefault();
    formSection.classList.remove('form-show');
});