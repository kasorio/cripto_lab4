// ==UserScript==
// @name         Script
// @namespace    http://tampermonkey.net/
// @version      2024-06-13
// @description  try to take over the world!
// @author       Cristopher Osorio
// @match        https://cripto.tiiny.site/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==
(function() {
    'use strict';
    // En este trabajo se utilzia un código extraido de https://github.com/cesarlmt27/CIT2113/blob/main/Laboratorio%204/script_tampermonkey.js
    // Este repositorio muestra un metodo para poder realizar las actividades de laboratorio. Los creditos de la realizacion de este codigo son para el autor original.

    // Función para obtener y concatenar las mayúsculas
    function obtenerMayusculas() {
        // Encuentra el elemento en el sitio web que contiene el texto
        var textElement = document.querySelector('p');
        // Obtiene el texto del elemento
        var text = textElement.textContent;
        // Filtra las mayúsculas
        var uppercaseChars = text.match(/[A-ZÁÉÍÓÚÜÑ]/g);
        // Concatena las mayúsculas
        var concatenatedUppercase = uppercaseChars ? uppercaseChars.join('') : 'No hay mayúsculas';
        return concatenatedUppercase;
    }

    // Función para contar la cantidad de elementos con la clase "M#"
    function contarElementos() {
        // Cuenta la cantidad de elementos con la clase "M#"
        var cantidadElementos = document.querySelectorAll('[class^="M"]').length;
        return cantidadElementos;
    }

    // Función para obtener y descifrar mensajes cifrados
    function obtenerYDescifrarMensajes() {
        // Selecciona todos los elementos div con la clase "M#"
        var mensajeElements = document.querySelectorAll('[class^="M"]');

        // Itera sobre cada elemento y obtiene el id y contenido cifrado
        mensajeElements.forEach(function(mensajeElement) {
            var id = mensajeElement.id;

            // Descifra el mensaje utilizando 3DES en modo ECB
            var mensajeDescifrado = CryptoJS.TripleDES.decrypt({
                ciphertext: CryptoJS.enc.Base64.parse(id)
            }, CryptoJS.enc.Utf8.parse(llave), {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(CryptoJS.enc.Utf8);

            console.log(id + ' ' + mensajeDescifrado);

            // Muestra el id descifrado en el div correspondiente
            mensajeElement.innerHTML = mensajeDescifrado;
        });
    }

    // Almacena el resultado de la función obtenerMayusculas() en la variable "llave"
    var llave = obtenerMayusculas();

    // Imprime los resultados en la consola con el formato especificado
    console.log('La llave es:', llave);
    console.log('Los mensajes cifrados son:', contarElementos());

    // Llama a la función para obtener y descifrar mensajes
    obtenerYDescifrarMensajes();
})();