// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import {getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBt9ebkjhA3ONGQ4skIXMIi8WxBA_FOPx4",
  authDomain: "cima-ea1e8.firebaseapp.com",
  projectId: "cima-ea1e8",
  storageBucket: "cima-ea1e8.appspot.com",
  messagingSenderId: "861761376539",
  appId: "1:861761376539:web:d42301c50bfcd1297ac3be",
  measurementId: "G-768ZQF2MZN"
};

// Inicializa Firebase con la configuración
const app = initializeApp(firebaseConfig);

// Obtiene una referencia al almacenamiento de Firebase
const storage = getStorage(app);

// Función para subir un archivo a Firebase Storage y obtener su URL de descarga
export async function uploadByte(file) {
  try {
    // Genera un identificador único para el nombre del archivo
    const uniqueId = generateUniqueId();

    // Combina el identificador único con el nombre del archivo
    const fileName = `${uniqueId}_${file.name}`;

    // Obtiene una referencia al archivo en Firebase Storage
    const storageRef = ref(storage, `files/${fileName}`);

    // Sube el archivo a Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);

    console.log('Archivo subido con éxito:', snapshot);

    // Obtiene la URL de descarga del archivo
    const imageUrl = await getDownloadURL(storageRef);

    return imageUrl;
  } catch (error) {
    console.error('Error al subir o obtener la URL del archivo:', error);
    throw error;
  }
}

// Función para generar un identificador único
function generateUniqueId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000);
  return `${timestamp}_${random}`;
}

export async function deleteImageOrVideo(url) {
  try {
    // Obtén la referencia directamente desde la URL
    const storageRef = ref(storage, url);

    // Elimina el archivo
    await deleteObject(storageRef);

    console.log(`Archivo ${url} eliminado con éxito.`);
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
    throw error;
  }
}

export async function doesImageExist(imageUrl) {
  try {
    const storageRef = ref(storage, imageUrl);
    await getDownloadURL(storageRef); // Intenta obtener la URL de descarga
    return true; // Si no se produce un error, la imagen existe
  } catch (error) {
    return false; // Si se produce un error, la imagen no existe
  }
}