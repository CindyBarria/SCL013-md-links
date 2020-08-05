# Markdown Links

## Índice

* [1. ¿Que es Md-Links?](#1-preámbulo)
* [2. Diagrama de Flujo](#2-resumen-del-proyecto)
* [3. Instalación](#3-objetivos-de-aprendizaje)
* [4. Utilización de librería](#4-consideraciones-generales)
* [5. Ejemplo](#5-criterios-de-aceptación-mínimos-del-proyecto)

***

## 1. ¿Que es Md-Links?

Markdown Links es una librería de Node.js que nos permite buscar en un directorio todos los archivos en formato Markdown que en su interior contengan link y asi poder validar el estado actual de cada uno de ellos.

## 2. Diagrama de Flujo

![md-links](https://i.ibb.co/PcLwfr9/FlujoMd.png)

## 3. Instalación
Para instalar la librería debes correr el siguiente comando:
#### `npm install`

# Pre-requisitos
Para el correcto funcionamiento, debes tener instalado Node.js, y otras librearías complementarias:
* Node.js
* File System
* Node-fetch
* Jsdom
* Markdown-it
* Chalk

## 4. Utilización de librería
Ingresa el siguiente comando en la terminal:
#### `node `
La librería te enviará la siguiente información:

* Ruta del directorio.
* Nombre del archivo .md
* Total de links encontrados en el archivo.
* Lista de archivos con su url y status.
* Total de archivos rotos

## 5. Ejemplo

