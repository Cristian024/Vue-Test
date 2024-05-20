<script setup>
import { ref } from 'vue'

var movieEdit = ref({
    nombre: '',
    autor: '',
    genero: ''
})

var movies = ref([
    {
        "nombre": "Spider-Man: No Way Home",
        "autor": "Jon Watts",
        "genero": "Action"
    },
    {
        "nombre": "The Batman",
        "autor": "Matt Reeves",
        "genero": "Action"
    },
    {
        "nombre": "Avatar 2",
        "autor": "James Cameron",
        "genero": "Sci-Fi"
    },
    {
        "nombre": "Jurassic World: Dominion",
        "autor": "Colin Trevorrow",
        "genero": "Adventure"
    },
    {
        "nombre": "Black Panther: Wakanda Forever",
        "autor": "Ryan Coogler",
        "genero": "Action"
    },
    {
        "nombre": "Fantastic Beasts and Where to Find Them 3",
        "autor": "David Yates",
        "genero": "Fantasy"
    },
    {
        "nombre": "Mission: Impossible 7",
        "autor": "Christopher McQuarrie",
        "genero": "Action"
    },
    {
        "nombre": "The Flash",
        "autor": "Andy Muschietti",
        "genero": "Action"
    },
    {
        "nombre": "Doctor Strange in the Multiverse of Madness",
        "autor": "Sam Raimi",
        "genero": "Action"
    },
    {
        "nombre": "John Wick: Chapter 4",
        "autor": "Chad Stahelski",
        "genero": "Action"
    },
    {
        "nombre": "Aquaman and the Lost Kingdom",
        "autor": "James Wan",
        "genero": "Action"
    },
    {
        "nombre": "Shazam! Fury of the Gods",
        "autor": "David F. Sandberg",
        "genero": "Action"
    },
    {
        "nombre": "Thor: Love and Thunder",
        "autor": "Taika Waititi",
        "genero": "Action"
    },
    {
        "nombre": "Guardians of the Galaxy Vol. 3",
        "autor": "James Gunn",
        "genero": "Action"
    },
    {
        "nombre": "The Matrix 4",
        "autor": "Lana Wachowski",
        "genero": "Sci-Fi"
    },
    {
        "nombre": "Indiana Jones 5",
        "autor": "James Mangold",
        "genero": "Adventure"
    },
    {
        "nombre": "The Suicide Squad",
        "autor": "James Gunn",
        "genero": "Action"
    },
    {
        "nombre": "The Flash",
        "autor": "Andy Muschietti",
        "genero": "Action"
    },
    {
        "nombre": "Doctor Strange in the Multiverse of Madness",
        "autor": "Sam Raimi",
        "genero": "Action"
    }
])

function deleteMovie(element) {
    movies.value = movies.value.filter(movie => movie.nombre !== element.nombre);
}

async function formEvent(e) {
    e.preventDefault();
    const elements = e.target.elements;
    var movie = {
        nombre: elements['movie-name'].value,
        autor: elements['movie-autor'].value,
        genero: elements['movie-gender'].value
    }

    const operation = movies.value.find(movieArray => movieArray.nombre === movie.nombre) ? 'update' : 'insert'

    if (operation == 'update') {
        movies.value.forEach(element => {
            if (element.nombre === movie.nombre) {
                element.nombre = movie.nombre;
                element.autor = movie.autor;
                element.genero = movie.genero;
                return;
            }
        });
    } else if (operation == 'insert') {
        movies.value.push(movie);
    }
}

</script>

<template>
    <h1>Top peliculas del 2023</h1>
    <table>
        <tr>
            <th>Posición</th>
            <th>Nombre</th>
            <th>Autor</th>
            <th>Genero</th>
            <th>Operación</th>
        </tr>
        <tr v-for="(element, index) in movies">
            <td>{{ index + 1 }}</td>
            <td>{{ element.nombre }}</td>
            <td>{{ element.autor }}</td>
            <td>{{ element.genero }}</td>
            <td>
                <button v-on:click="deleteMovie(element)">Eliminar</button>
                <button v-on:click="() => { movieEdit = element }">Editar</button>
            </td>
        </tr>
    </table>

    <div class="form-movie">
        <form v-on:submit="formEvent($event)">
            <label for="movie-name">Nombre de la pelicula</label>
            <input type="text" name="movie-name" id="movie-name" :value="movieEdit.nombre">
            <label for="movie-autor">Autor de la pelicula</label>
            <input type="text" name="movie-autor" id="movie-autor" :value="movieEdit.autor">
            <label for="movie-gender">Genero de la pelicula</label>
            <input type="text" name="movie-gender" id="movie-gender" :value="movieEdit.genero">
            <input type="submit" value="Guardar">
        </form>
    </div>
</template>

<style>
button {
    cursor: pointer;
}

table {
    border: solid 1px;
    border-collapse: collapse;
}

table tr td,
table tr th {
    border: solid 1px;
    padding: 10px;
}

table tr th {
    background-color: rgb(19, 19, 19);
}

.form-movie form {
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-movie label {
    margin-bottom: 10px;
}

.form-movie input[type='text'] {
    height: 30px;
    margin-bottom: 30px;
    width: 100%;
}

.form-movie input[type='submit'] {
    height: 50px;
    width: 200px;
    background-color: black;
    outline: none;
    cursor: pointer;
    border: none;
    color: white;
}
</style>