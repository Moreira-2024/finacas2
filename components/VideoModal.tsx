
import React, { useEffect, useRef } from 'react';
import { X } from './icons';

interface VideoModalProps {
  youtubeId: string | null;
  onClose: () => void;
}

// Adicionando tipos para a API do YouTube no objeto window global
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const VideoModal: React.FC<VideoModalProps> = ({ youtubeId, onClose }) => {
  const playerRef = useRef<any>(null);

  // Implementação da Solução Combinada: API IFrame + Domínio No-Cookie + Origin
  // Isso resolve o Erro 153 e evita que o vídeo abra em outra aba/app
  useEffect(() => {
    if (!youtubeId) return;

    const initPlayer = () => {
      // Verifica se o elemento container existe
      if (!document.getElementById('youtube-player')) return;

      try {
        // Destruir instância anterior se existir para evitar conflitos
        if (playerRef.current) {
          playerRef.current.destroy();
        }

        // Obter origem atual para validar a incorporação
        const origin = typeof window !== 'undefined' ? window.location.origin : '';

        // Inicializar o player via API JS
        playerRef.current = new window.YT.Player('youtube-player', {
          height: '100%',
          width: '100%',
          videoId: youtubeId,
          host: 'https://www.youtube-nocookie.com', // FORÇA o uso do domínio no-cookie (Solução 1A aplicada na API)
          playerVars: {
            'playsinline': 1, // Garante reprodução na mesma aba em iOS/Mobile
            'autoplay': 1,
            'rel': 0,
            'origin': origin, // Solução 1B: Passa a origem explicitamente
            'modestbranding': 1
          },
          events: {
            'onReady': (event: any) => {
              event.target.playVideo();
            }
          }
        });
      } catch (error) {
        console.error("Erro ao inicializar player do YouTube:", error);
      }
    };

    // Lógica para carregar a API do YouTube assincronamente
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }

      // Callback global que a API chama quando está pronta
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      // Se a API já estiver carregada, inicializa direto
      initPlayer();
    }

    // Limpeza ao desmontar o componente ou trocar o vídeo
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Ignora erros se o player já tiver sido destruído
        }
        playerRef.current = null;
      }
    };
  }, [youtubeId]);

  if (!youtubeId) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-neutral-900 rounded-lg shadow-2xl w-full max-w-4xl aspect-video relative flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-black hover:bg-neutral-200 transition-colors z-10 shadow-md"
          aria-label="Fechar vídeo"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* O elemento div onde a API injetará o iframe */}
        <div id="youtube-player" className="w-full h-full rounded-lg bg-black"></div>
      </div>
    </div>
  );
};

export default VideoModal;
