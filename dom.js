export function renderImages(images) {
  const container = document.getElementById("gallery");
  container.innerHTML = "";

  images.forEach(img => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img 
        src="${img.urls.small}" 
        alt="${img.alt_description || 'Imagen sin descripción'}" 
        class="main-img"
        loading="lazy"
        width="300"
        height="200"
      />

      <div class="card-footer">
        <div class="user-info">
          <img 
            src="${img.user.profile_image.medium}" 
            alt="Avatar de ${img.user.name}" 
            class="avatar"
            loading="lazy"
            width="32"
            height="32"
          />
          <a href="${img.user.links.html}" target="_blank" rel="noopener noreferrer" class="username">
            ${img.user.name}
          </a>
        </div>
        <div class="card-actions">
          <span aria-label="${img.likes} me gusta">❤️ ${img.likes}</span>
          <a 
            href="${img.links.download}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="download-btn"
            aria-label="Descargar imagen"
          >⬇️</a>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

export function showMessage(message, type = 'info') {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  messageElement.className = `message ${type}`;
}

export function showLoading(show) {
  const gallery = document.getElementById("gallery");
  if (show) {
    gallery.innerHTML = '<div class="loading">Cargando imágenes...</div>';
  }
}
