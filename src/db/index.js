import * as SQLite from 'expo-sqlite/legacy';

//Creamos la base de datos con el nombre "mondogeek.db"
const db = SQLite.openDatabase('mundogeek.db');

// Función que crea una tabla "sessions" dentro de la base de datos donde se almacenaran las sesion del usuario
export const createSessionsTable = () => {
    const promise = new Promise((resolved,rejected)=>{
        // Declaro una query que crea una talba "sessions" en caso de que no exista con las siguientes columnas y sus características (localId, email y token)
        const query = 'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL  ) '
        // La función transaction recibe por parámetro a la función "tx" y de ella ejecuta su función interna "executeSql" que sirve para ejecutar comandos SQL. Esta función "tx" recibe 4 parámetros (query,array para evitar inyecciones SQL, que se hace si se resuelve y que se hace si es rechazada)
        // Las 2 funciones que ejecutan "resolverd" y "rejected" reciben como parámetro "la transacción en si" (_) y "el resultado" (result)
        // Se suele poner el nombre "_" cuando es un parámetro que no se utilizará
        db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result),(_,result)=>rejected(result)))
    })
    //retornamos la promesa
    return promise
}

// Función que inserta datos en la tabla "sessions" de la base de datos
//recibe como parámetro un objeto con 3 propiedades con sus valores
export const insertSession = ({email, localId, token}) => {
    const promise = new Promise((resolved,rejected)=>{
        // En la query indicamos que datos queremos ingresar pero en los valores ponemos signos de pregunta par que queden como en "standby", los cuales luego se completarán con los valores que pasaremos en el array como segundo parámetro de la función "executeSql"
        const query = 'INSERT INTO sessions (email, localId, token) VALUES (?,?,?)'
        db.transaction(tx=>tx.executeSql(query,[email,localId, token],(_,result)=>resolved(result),(_,result)=>rejected(result)))
    })
    return promise
}

// Función que sirve para buscar todas las sesiones que esten activa
export const fetchSession = () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'SELECT * FROM sessions'
        db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result.rows._array),(_,result)=>rejected(result)))
    })
    return promise
}

//FUNCION PELIGROSA:
//Funcion que elimina toda la tabla sessions
export const clearSessions= () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = "DELETE FROM sessions" 
        db.transaction(tx=>{tx.executeSql(query,[],(_, result)=>resolved(result),(_,error)=>rejected(error))})
    })
    return promise
}