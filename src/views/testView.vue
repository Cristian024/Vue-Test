<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import * as api from '../services/apiEjemplo.js'

const name = 'Cristian';

const style = 'color: blue';

const array = ref([]);
const arrayAsincrono = ref([]);
let counter = ref(0);
var arrayFavoritos = ref([]);

const route = useRoute();
const id = route.params.id || null;

api.executeConsult(id, 'users').then(
    function (value) {
        value.forEach(element => {
            array.value.push(element);
        });
    },
    function (error) {
        console.log(error);
    }
)

/*
const asyncFor = async () =>{
  for(let i = 0; i <=5; i++){
    setTimeout(() => {
      console.log(i);
      arrayAsincrono.value.push({
        position: i,
      })  
    }, 1000);
  }
}

asyncFor();
*/

const showStudent = (student) => {
    arrayFavoritos.value.some(user => user.id === student.id) ? null : arrayFavoritos.value.push(student);
    counter.value++;
}

const deletStudent = (student) => {
    arrayFavoritos.value = arrayFavoritos.value.filter(user => user.id !== student.id);
}

const aumentarContador = (element) => {
    element.position++;
}

const detailsStudent = (id) =>{
    window.location = `../test/${id}`;
}

</script>

<template>
    <h1 :style="style">Hola {{ name.toUpperCase() }}</h1>
    <h2>Contador de clicks: {{ counter }}</h2>
    <div class="buscador">
        <div class="students">
            <div class="student" v-for="student in array" v-on:click="showStudent(student)">
                <h1>{{ student.id }}</h1>
                <p>{{ student.name }}</p>
                <p>{{ student.email }}</p>
                <!--
                <p v-if="student.Carrera === 'Engineering'">Mi bro es de ingenieria :D</p>
                <p v-else-if="student.Carrera == 'Medicine' && student.Genero == 'Female'">Puta que rico una de medicina 🥵
                </p>
                <p v-else-if="student.Carrera == 'Medicine'">Uno de medicina, se le da</p>
                <p v-else>Estudiante de carrera comun</p>
                -->
            </div>
        </div>
        <div class="list_favorites">
            <div class="list">
                <h2>Lista de favoritos</h2>
                <div class="element" v-for="student in arrayFavoritos">
                    <h3>{{ student.id }}.{{ student.name }} </h3>
                    <button>Contactar</button>
                    <button v-on:click="detailsStudent(student.id)">Detalles</button>
                    <button v-on:click="deletStudent(student)">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
body {
    background-color: black;
}

.student {
    background-color: white;
}

.buscador {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 80vw;
    position: relative;
}

.student {
    color: black;
    padding: 30px;
    margin: 30px;
    cursor: pointer;
    border-radius: 10px;
}

.list_favorites {
    position: relative;
}

.list_favorites .list {
    position: sticky;
    position: -webkit-sticky;
    top: 30px;
}

.list_favorites .list .element {
    display: flex;
    widows: 100%;
    align-items: center;
    justify-content: space-around;
}
</style>