import React, { useState, useRef, useEffect } from 'react';
import { BOOK_CONTENT } from '../bookContent';
import { ArrowLeft, BookOpen, ChevronDown, X, Menu, Check } from './icons';

interface BookReaderProps {
  onClose: () => void;
}

type Theme = 'dark' | 'light' | 'sepia';

const BookReader: React.FC<BookReaderProps> = ({ onClose }) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [fontSize, setFontSize] = useState(18);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isRestoring, setIsRestoring] = useState(true);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const chapter = BOOK_CONTENT[currentChapterIndex];

  // Load Progress from LocalStorage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('biblicalFinance_progress');
      if (savedProgress) {
        const { chapterIndex, scrollTop, theme: savedTheme, fontSize: savedFontSize } = JSON.parse(savedProgress);
        setCurrentChapterIndex(chapterIndex || 0);
        if (savedTheme) setTheme(savedTheme);
        if (savedFontSize) setFontSize(savedFontSize);
        
        // Restaurar posição do scroll após renderização
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.scrollTop = scrollTop || 0;
          }
          setIsRestoring(false);
        }, 100);
      } else {
        setIsRestoring(false);
      }
    } catch (e) {
      console.error("Erro ao carregar progresso", e);
      setIsRestoring(false);
    }
  }, []);

  // Save Progress to LocalStorage (Debounced)
  useEffect(() => {
    if (isRestoring) return;

    const saveTimeout = setTimeout(() => {
      const progress = {
        chapterIndex: currentChapterIndex,
        scrollTop: contentRef.current?.scrollTop || 0,
        theme,
        fontSize
      };
      localStorage.setItem('biblicalFinance_progress', JSON.stringify(progress));
    }, 500);

    return () => clearTimeout(saveTimeout);
  }, [currentChapterIndex, scrollProgress, theme, fontSize, isRestoring]);

  // Handle scroll progress
  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const totalScroll = scrollHeight - clientHeight;
      const currentProgress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);
    }
  };

  // Reset scroll only if changing chapter manually (not during restore)
  const changeChapter = (index: number) => {
    setCurrentChapterIndex(index);
    setIsSidebarOpen(false);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  // Theme configurations
  const themeConfig = {
    dark: {
      bg: 'bg-[#121212]', text: 'text-neutral-300', secondaryText: 'text-neutral-500',
      sidebar: 'bg-[#1a1a1a]', header: 'bg-[#121212]/90', accent: 'text-[#C8A86B]',
      highlight: 'border-[#C8A86B]', border: 'border-neutral-800', hover: 'hover:bg-neutral-800',
      verseBg: 'bg-white/5', dropCap: 'text-white'
    },
    light: {
      bg: 'bg-[#f8f7f2]', text: 'text-[#333333]', secondaryText: 'text-neutral-500',
      sidebar: 'bg-white', header: 'bg-[#f8f7f2]/90', accent: 'text-[#2E4034]',
      highlight: 'border-[#2E4034]', border: 'border-neutral-200', hover: 'hover:bg-black/5',
      verseBg: 'bg-black/5', dropCap: 'text-[#2E4034]'
    },
    sepia: {
      bg: 'bg-[#fbf5e9]', text: 'text-[#5b4636]', secondaryText: 'text-[#8d7966]',
      sidebar: 'bg-[#f4ecd8]', header: 'bg-[#fbf5e9]/90', accent: 'text-[#704214]',
      highlight: 'border-[#704214]', border: 'border-[#e0d5b5]', hover: 'hover:bg-[#e9dfc6]',
      verseBg: 'bg-[#e9dfc6]/60', dropCap: 'text-[#704214]'
    }
  };

  const t = themeConfig[theme];

  // Intelligent Text Parser
  const renderParagraph = (text: string, index: number) => {
    const trimmed = text.trim();
    if (!trimmed) return null;

    // Detect Subtitles (all caps in original, or short sentences)
    const isTitleLike = trimmed === trimmed.toUpperCase() || (trimmed.length < 80 && !trimmed.includes('.') && !trimmed.includes(',') && trimmed.length > 3);
    
    if (isTitleLike && trimmed.length > 1) {
        return (
            <h3 key={index} className={`mt-10 mb-5 text-xl md:text-2xl font-sans font-bold tracking-tight ${t.text} border-b-2 ${t.border} pb-3`}>
                {trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()}
            </h3>
        );
    }

    // Detect Bible Verses
    const bibleRefRegex = /\((?:[1-3]?\s?[A-Z][a-zá-ú]+\s\d+[:\.]\d+(?:-\d+)?|[A-Z]{3,})\)/;
    const isVerse = bibleRefRegex.test(trimmed) || (trimmed.includes('"') && trimmed.includes('(') && trimmed.length < 400);

    if (isVerse) {
        return (
            <blockquote key={index} className={`my-8 pl-6 pr-4 py-4 border-l-4 ${t.highlight} ${t.verseBg} rounded-r-lg`}>
                <p className={`font-serif italic text-lg md:text-xl leading-relaxed ${t.text} opacity-95 text-justify hyphens-auto`}>
                    {trimmed}
                </p>
            </blockquote>
        );
    }

    // Check for Lists
    const isList = trimmed.startsWith('*') || trimmed.startsWith('-');
    if (isList) {
        return (
             <div key={index} className={`flex items-start gap-3 mb-4 pl-4`}>
                <span className={`mt-3 w-1.5 h-1.5 rounded-full ${t.accent.replace('text-', 'bg-')} flex-shrink-0`} />
                <p className={`font-serif text-lg leading-loose ${t.text} text-justify hyphens-auto`}>
                    {trimmed.replace(/^[\*\-]\s*/, '')}
                </p>
             </div>
        );
    }

    // Standard Paragraph with Drop Cap for the first paragraph of content
    const isFirstParagraph = index === 0;
    
    if (isFirstParagraph) {
        const firstLetter = trimmed.charAt(0);
        const restOfText = trimmed.slice(1);
        return (
            <p key={index} className={`mb-6 font-serif text-lg md:text-[1.15rem] leading-9 md:leading-10 ${t.text} text-justify hyphens-auto`}>
                <span className={`float-left text-[4.5rem] leading-[0.8] mt-1 mr-3 font-bold font-serif ${t.dropCap}`}>
                    {firstLetter}
                </span>
                {restOfText}
            </p>
        );
    }

    return (
        <p key={index} className={`mb-6 font-serif text-lg md:text-[1.15rem] leading-9 md:leading-10 ${t.text} text-justify hyphens-auto`}>
            {trimmed}
        </p>
    );
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col transition-colors duration-500 ${t.bg}`}>
      
      {/* Reading Progress Bar */}
      <div className="h-1 w-full bg-transparent fixed top-0 z-50">
        <div 
          className={`h-full transition-all duration-150 ease-out ${t.accent.replace('text-', 'bg-')}`} 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header / Toolbar */}
      <header className={`flex justify-between items-center px-4 md:px-8 py-3 backdrop-blur-md border-b ${t.border} ${t.header} z-40 transition-colors duration-500`}>
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={onClose} 
            className={`p-2 rounded-full transition-colors ${t.hover}`}
            aria-label="Voltar"
          >
            <ArrowLeft className={`w-6 h-6 ${t.text}`} />
          </button>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${t.hover}`}
          >
            <Menu className={`w-5 h-5 ${t.text}`} />
            <span className={`hidden sm:inline font-semibold text-sm tracking-wide uppercase ${t.secondaryText}`}>Sumário</span>
          </button>
        </div>

        <div className="flex items-center gap-2 relative">
           <span className={`hidden lg:block text-sm font-serif italic mr-4 ${t.secondaryText} max-w-[300px] truncate`}>
             {chapter.title}
           </span>
           
           <button 
             onClick={() => setShowSettings(!showSettings)}
             className={`p-2 rounded-md font-serif font-bold text-xl ${t.hover} ${showSettings ? t.accent : t.text}`}
             aria-label="Configurações de Leitura"
           >
             Aa
           </button>

           {showSettings && (
             <div className={`absolute top-full right-0 mt-3 w-72 p-5 rounded-xl shadow-2xl border ${t.border} ${t.sidebar} z-50 transform origin-top-right`}>
                <div className="mb-6">
                  <p className={`text-xs font-bold mb-3 uppercase tracking-wider ${t.secondaryText}`}>Tamanho da Fonte</p>
                  <div className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} rounded-lg p-1`}>
                    <button onClick={() => setFontSize(Math.max(16, fontSize - 2))} className={`flex-1 p-2 text-sm ${t.hover} rounded transition-colors ${t.text}`}>A-</button>
                    <span className={`text-sm font-mono w-12 text-center ${t.secondaryText}`}>{fontSize}px</span>
                    <button onClick={() => setFontSize(Math.min(28, fontSize + 2))} className={`flex-1 p-2 text-lg ${t.hover} rounded transition-colors ${t.text}`}>A+</button>
                  </div>
                </div>
                <div>
                  <p className={`text-xs font-bold mb-3 uppercase tracking-wider ${t.secondaryText}`}>Tema</p>
                  <div className="flex gap-3">
                    <button onClick={() => setTheme('light')} className={`flex-1 h-10 rounded-lg border-2 border-neutral-300 bg-[#f8f7f2] shadow-sm ${theme === 'light' ? 'ring-2 ring-offset-2 ring-offset-[#f8f7f2] ring-[#2E4034]' : 'hover:scale-105 transition-transform'}`} aria-label="Light" />
                    <button onClick={() => setTheme('sepia')} className={`flex-1 h-10 rounded-lg border-2 border-[#d3c5a8] bg-[#fbf5e9] shadow-sm ${theme === 'sepia' ? 'ring-2 ring-offset-2 ring-offset-[#fbf5e9] ring-[#704214]' : 'hover:scale-105 transition-transform'}`} aria-label="Sepia" />
                    <button onClick={() => setTheme('dark')} className={`flex-1 h-10 rounded-lg border-2 border-neutral-700 bg-[#121212] shadow-sm ${theme === 'dark' ? 'ring-2 ring-offset-2 ring-offset-[#121212] ring-white' : 'hover:scale-105 transition-transform'}`} aria-label="Dark" />
                  </div>
                </div>
             </div>
           )}
        </div>
      </header>

      <div 
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsSidebarOpen(false)}
      >
        <aside 
          className={`absolute top-0 left-0 h-full w-80 max-w-[85%] ${t.sidebar} shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-6 border-b ${t.border} flex justify-between items-center`}>
            <h2 className={`font-bold text-lg tracking-tight flex items-center gap-2 ${t.text}`}>
              <BookOpen className={t.accent} /> Sumário
            </h2>
            <button onClick={() => setIsSidebarOpen(false)} className={t.hover + " p-2 rounded-full transition-colors"}>
              <X className={`w-5 h-5 ${t.text}`} />
            </button>
          </div>
          <div className="overflow-y-auto flex-1 p-3 space-y-1">
            {BOOK_CONTENT.map((chap, index) => (
              <button
                key={index}
                onClick={() => changeChapter(index)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-start gap-3 group ${
                  currentChapterIndex === index 
                    ? `${theme === 'dark' ? 'bg-white/10' : 'bg-black/5'} font-semibold ${t.accent}` 
                    : `${t.secondaryText} ${t.hover}`
                }`}
              >
                <span className="text-xs opacity-60 mt-1 min-w-[20px] font-mono">{index === 0 ? '•' : index.toString().padStart(2, '0')}</span>
                <span className={`line-clamp-2 text-sm leading-snug group-hover:text-opacity-100 ${currentChapterIndex !== index && t.text}`}>{chap.title}</span>
                {currentChapterIndex === index && <Check className="w-4 h-4 ml-auto flex-shrink-0 mt-0.5" />}
              </button>
            ))}
          </div>
        </aside>
      </div>

      <main 
        ref={contentRef}
        className="flex-1 overflow-y-auto relative scroll-smooth"
        onScroll={handleScroll}
      >
        <article className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <header className="mb-16 text-center">
             <span className={`block text-sm font-bold tracking-[0.2em] uppercase mb-4 ${t.accent} opacity-90`}>
               {currentChapterIndex === 0 ? 'Introdução' : `Capítulo ${currentChapterIndex}`}
             </span>
             <h1 className={`text-4xl md:text-5xl font-bold leading-tight tracking-tight ${t.text} font-serif`}>
               {chapter.title}
             </h1>
             <div className={`w-16 h-1 mx-auto mt-8 rounded-full opacity-30 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
          </header>

          <div 
            className={`transition-all duration-300 ease-in-out`} 
            style={{ fontSize: `${fontSize}px` }}
          >
            {chapter.content.split('\n\n').map((paragraph, index) => renderParagraph(paragraph, index))}
          </div>

          <div className={`mt-24 pt-12 border-t ${t.border} flex flex-col sm:flex-row justify-between items-center gap-6`}>
             <button 
                onClick={() => changeChapter(Math.max(0, currentChapterIndex - 1))}
                disabled={currentChapterIndex === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentChapterIndex === 0 
                    ? 'opacity-0 pointer-events-none' 
                    : `${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'} ${t.text}`
                }`}
             >
               Anterior
             </button>
             
             <span className={`text-sm font-mono opacity-50 ${t.text}`}>
               {currentChapterIndex + 1} / {BOOK_CONTENT.length}
             </span>

             <button 
                onClick={() => changeChapter(Math.min(BOOK_CONTENT.length - 1, currentChapterIndex + 1))}
                disabled={currentChapterIndex === BOOK_CONTENT.length - 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentChapterIndex === BOOK_CONTENT.length - 1 
                    ? 'opacity-0 pointer-events-none' 
                    : `${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'} ${t.text}`
                }`}
             >
               Próximo
             </button>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BookReader;