<script setup>
import { ref } from 'vue'

import io from "socket.io-client";

var socket;

var userName = '';

const messages = ref([]);
let userForm = ref('');
var messagesDiv = document.querySelector('.conversations');

const sendMessage = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;

    const message = elements['chat-input'].value;
    if (message != '' && message != null) {
        socket.emit('chat_message', { message: message, userName: userName });
        elements['chat-input'].value = '';
    }
}

const registerUser = (e) => {
    e.preventDefault();
    const elements = e.target.elements;

    userName = elements['user_name'].value;
    userForm.value = 'disabled';
    initSocket()
}

const initSocket = () => {
    socket = io("https://dark-ring-amaryllis.glitch.me");

    socket.on('chat_message', (msg) => {
        messages.value.push(msg);
        messagesDiv = document.querySelector('.conversations');
        document.querySelector('.conversations').scrollTop = document.querySelector('.conversations').scrollHeight + 10;
    })
}

</script>

<template>
    <div class="chat">
        <div class="conversations">
            <div class="message" v-for="(item, index) in messages">
                <div v-if="item.userName === userName" class="user_session subcontainer">
                    <p>{{ item.message }}</p>
                    <span>{{ item.userName }}</span>
                </div>
                <div v-else class="user_external subcontainer">
                    <p>{{ item.message }}</p>
                    <span>{{ item.userName }}</span>
                </div>
            </div>
        </div>
        <form class="input-conversation" v-on:submit="sendMessage($event)">
            <input type="text" name="chat-input" id="chat-input">
            <input type="submit" value="Enviar">
        </form>
    </div>

    <div :class="`form-user ${userForm}`" v-on:submit="registerUser($event)">
        <form>
            <h1>Prueba Chat</h1>
            <h2>Preuba realizada en VUE JS utilizando WebSocket</h2>
            <p>Escribe tu nombre 🤠</p>
            <input type="text" name="user_name" id="user_name" required>
            <input type="submit" value="Ingresar">
        </form>
    </div>
</template>

<style>
* {
    padding: 0;
    margin: 0;
}

#app {
    width: 100vw;
    padding: 0;
    max-width: 100vw;
}

.app {
    width: 100%;
}

.chat {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chat .conversations {
    height: calc(100% - 60px);
    width: 100%;
    overflow-y: scroll;
    scroll-behavior: smooth;
}

.conversations .message{
    width: 100%;
    display: flex;
    align-items: center;
}

.conversations .message .subcontainer{
    max-width: 45%;
    width: fit-content;
    height: auto;
    margin: 10px;
    border-radius: 1vmin;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

.message .subcontainer p{
    font-size: 2.5vmin;
    height: auto;
    text-align: left;
    max-width: 100%;
    width: 100%;
    word-wrap: break-word;
}

.message .subcontainer span{
    font-size: 1.5vmin;
    width: 100%;
}

.conversations .message .subcontainer.user_session{
    background-color: rgb(169, 137, 6);
    margin-left: auto;
}

.conversations .message .subcontainer.user_external{
    background-color: rgb(24, 24, 24);
    margin-right: auto;
}

.conversations .message .subcontainer.user_session span{
    text-align: right;   
}

.conversations .message .subcontainer.user_external span{
    text-align: left;
}

.chat .input-conversation {
    width: 100%;
    height: 60px;
    display: grid;
    grid-template-columns: 90% 10%;
    padding-bottom: 5px;
}

.chat .input-conversation input[type='submit'] {
    background-color: black;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    margin: 0 10px;
    border-radius: 2vmin;
}

#chat-input {
    font-size: 15px;
    border-radius: 2vmin;
    margin: 0 10px;
    background-color: rgb(19, 19, 19);
    border: none;
    color: white;
    padding: 0 10px;
}

.form-user {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.785);
}

.form-user.disabled {
    display: none;
}

.form-user form {
    width: 100vmin;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5vmin;
    padding: 10vmin 0;
}

.form-user form p {
    font-size: 20px;
    margin: 20px 0;
}

.form-user form input[type="text"] {
    width: calc(100% - 10vmin);
    margin-top: 30px;
    height: 50px;
    background-color: white;
    border: black solid 1px;
    border-radius: 10px;
    color: black;
    padding: 1px;
}

.form-user form input[type="submit"] {
    margin-top: 30px;
    width: calc(100% - 10vmin);
    height: 50px;
    background-color: black;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;
}
</style>
