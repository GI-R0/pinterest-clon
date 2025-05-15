import { fetchImages } from "./api.js";
import { renderImages, showMessage, showLoading } from "./dom.js";

async function buscar(query) {
  try {
    showLoading(true);
    const images = await fetchImages(query);
    
    if (images.length === 0) {
      showMessage("No se encontraron resultados. Mostrando imágenes de gatos.", "warning");
      const fallbackImages = await fetchImages("gatos");
      renderImages(fallbackImages);
    } else {
      showMessage(`Mostrando resultados para: ${query}`, "success");
      renderImages(images);
    }
  } catch (error) {
    showMessage(error.message, "error");
    renderImages([]);
  } finally {
    showLoading(false);
  }
}

// Debounce function para evitar demasiadas peticiones
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedSearch = debounce((query) => buscar(query), 500);

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("input");
  const query = input.value.trim();
  
  if (query) {
    debouncedSearch(query);
    input.value = "";
  } else {
    showMessage("Por favor, ingresa un término de búsqueda", "warning");
  }
});

// Manejar el clic en el logo
document.getElementById("logo").addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.getElementById("input");
  input.value = "";
  input.focus();
  buscar("paisajes");
  showMessage("Bienvenido a Pinterest Clone", "success");
});

// Búsqueda inicial
buscar("paisajes");


