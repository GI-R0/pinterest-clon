export async function fetchImages(query) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  
  if (!API_KEY) {
    throw new Error('API key no encontrada. Por favor, configura VITE_API_KEY en tu archivo .env');
  }

  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Error de autenticación. Verifica tu API key.');
      }
      if (response.status === 429) {
        throw new Error('Límite de peticiones alcanzado. Por favor, espera un momento.');
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
    throw error; // Propagar el error para manejarlo en el componente
  }
}

const API_KEY = import.meta.env.VITE_API_KEY;

fetch(`https://api.unsplash.com/photos?client_id=${API_KEY}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => console.log("Datos de Unsplash:", data))
  .catch((error) => console.error("Error al conectar con Unsplash:", error));
