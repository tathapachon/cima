// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import {getStorage, uploadBytes, ref,getDownloadURL} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBt9ebkjhA3ONGQ4skIXMIi8WxBA_FOPx4",
  authDomain: "cima-ea1e8.firebaseapp.com",
  projectId: "cima-ea1e8",
  storageBucket: "cima-ea1e8.appspot.com",
  messagingSenderId: "861761376539",
  appId: "1:861761376539:web:d42301c50bfcd1297ac3be",
  measurementId: "G-768ZQF2MZN"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadByte(file) {
  try {
    // Generar un identificador único (puedes usar una biblioteca como uuid)
    const uniqueId = generateUniqueId(); // Implementa esta función para generar IDs únicos

    // Agregar el identificador único al nombre del archivo
    const fileName = `${uniqueId}_${file.name}`;

    const storageRef = ref(storage, `files/${fileName}`);

    // Subir el archivo a Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);

    console.log('Uploaded a blob or file!', snapshot);

    // Obtener la URL de descarga del archivo
    const imageUrl = await getDownloadURL(storageRef);

    return imageUrl;
  } catch (error) {
    console.error("Error al subir o obtener la URL del archivo:", error);
    throw error;
  }
}

function generateUniqueId() {
  // Aquí puedes implementar la lógica para generar un ID único
  // Puedes utilizar una biblioteca como 'uuid' o generar uno manualmente
  // Por ejemplo, puedes combinar una marca de tiempo y un número aleatorio
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000);
  return `${timestamp}_${random}`;
}