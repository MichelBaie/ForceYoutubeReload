// content.js - Navigation YouTube sans referrer
function handleLinkClick(event) {
  // Remonter dans l'arbre DOM pour trouver l'élément <a> le plus proche
  const anchorElement = event.target.closest('a');

  // Vérifier si un lien a été trouvé et s'il a un attribut href
  if (anchorElement && anchorElement.href) {
    const url = new URL(anchorElement.href, window.location.origin);

    // Vérifier si l'URL est bien une URL YouTube et contient "/watch" OU "/shorts/"
    if (
      url.hostname.endsWith('youtube.com') &&
      (url.pathname.includes('/watch') || url.pathname.includes('/shorts/'))
    ) {
      // Empêcher le comportement par défaut du lien
      event.preventDefault();
      event.stopPropagation();

      // Créer un lien temporaire avec noreferrer pour supprimer les headers de référence
      const tempLink = document.createElement('a');
      tempLink.href = url.href;
      tempLink.rel = 'noreferrer';
      tempLink.target = '_self';
      tempLink.style.display = 'none';
      
      // Ajouter le lien au DOM, cliquer dessus, puis le supprimer
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    }
  }
}

// Ajouter un écouteur d'événements sur tout le document
// true pour la phase de capture, pour intercepter le clic avant les autres scripts
document.addEventListener('click', handleLinkClick, true);