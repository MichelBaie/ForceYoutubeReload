// content.js

// Fonction pour gérer le clic
function handleLinkClick(event) {
  // Remonter dans l'arbre DOM pour trouver l'élément <a> le plus proche
  const anchorElement = event.target.closest('a');

  // Vérifier si un lien a été trouvé et s'il a un attribut href
  if (anchorElement && anchorElement.href) {
    const url = new URL(anchorElement.href, window.location.origin); // Résout les URLs relatives

    // Vérifier si l'URL est bien une URL YouTube et contient "/watch" OU "/shorts/"
    // et s'assurer que ce n'est pas exactement la même URL (pour éviter des reloads inutiles)
    if (
      url.hostname.endsWith('youtube.com') &&
      (url.pathname.includes('/watch') || url.pathname.includes('/shorts/'))
    ) {

      // Empêcher le comportement par défaut du lien (navigation SPA de YouTube)
      event.preventDefault();
      event.stopPropagation(); // Arrêter la propagation pour éviter d'autres gestionnaires de clic

      // Forcer le rechargement complet de la page vers la nouvelle URL
      window.location.href = url.href;
    }
  }
}

// Ajouter un écouteur d'événements sur tout le document
// true pour la phase de capture, pour intercepter le clic avant d'autres scripts de la page si besoin
document.addEventListener('click', handleLinkClick, true);