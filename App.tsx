
import React, { useState, useRef } from 'react';
import { HIGHLIGHTS, WHY_THIS_COURSE_ITEMS, MODULES, TESTIMONIAL_VIDEOS, FAQ_ITEMS, STUDENT_TESTIMONIALS, PRICING_PLANS, GLOBAL_VIDEO_COVER } from './constants';
import { FaqItem, Module, TestimonialStudent, TestimonialVideo, PricingPlan } from './types';
import { iconMap, ChevronDown, Quote, Menu, X, Check, Mail, Smartphone, Play, Crown } from './components/icons';
import VideoModal from './components/VideoModal';
import BookReader from './components/BookReader';
import MaterialsPage from './pages/MaterialsPage';

type Page = 'home' | 'book' | 'materials';

const Header: React.FC<{ 
  onScrollTo: (ref: React.RefObject<HTMLElement>) => void; 
  pricingRef: React.RefObject<HTMLElement>; 
  contactRef: React.RefObject<HTMLElement>; 
  setPage: (page: Page) => void;
  currentPage: Page;
}> = ({ onScrollTo, pricingRef, contactRef, setPage, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', page: 'home', action: () => setPage('home') },
    { name: 'Livro', page: 'book', action: () => setPage('book') },
    { name: 'Materiais', page: 'materials', action: () => setPage('materials') },
    { name: 'Aulas', page: 'login', action: () => alert('Área de login em breve!') },
    { name: 'Planos', page: 'home', action: () => onScrollTo(pricingRef) },
    { name: 'Contato', page: 'home', action: () => onScrollTo(contactRef) },
  ];

  const Logo: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => (
    <button onClick={() => { setPage('home'); if (isMobile) setIsMenuOpen(false); }} className="flex items-center gap-3 group transition-transform transform hover:scale-105">
      <div className="bg-[#2E4034] p-2 rounded-lg shadow-sm group-hover:bg-[#C8A86B] transition-colors duration-300">
        <Crown className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-bold text-[#2E4034] transition-colors font-serif">
        Finanças Bíblicas
      </span>
    </button>
  );

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
             <button key={link.name} onClick={link.action} className={`transition-colors ${currentPage === link.page && link.name !== 'Planos' && link.name !== 'Contato' ? 'text-[#C8A86B] font-semibold' : 'text-neutral-600 hover:text-[#C8A86B]'}`}>
                {link.name}
             </button>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu className="w-6 h-6 text-[#2E4034]" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Logo isMobile={true} />
                <button onClick={() => setIsMenuOpen(false)}>
                    <X className="w-6 h-6 text-[#2E4034]" />
                </button>
            </div>
          <nav className="flex flex-col items-center justify-center h-full -mt-16 space-y-8">
             {navLinks.map((link) => (
                <button key={link.name} onClick={() => { link.action(); setIsMenuOpen(false); }} className="text-2xl text-neutral-700 hover:text-[#C8A86B] transition-colors">{link.name}</button>
             ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const HeroSection: React.FC<{ onWatchVideo: () => void; onScrollTo: (ref: React.RefObject<HTMLElement>) => void; pricingRef: React.RefObject<HTMLElement> }> = ({ onWatchVideo, onScrollTo, pricingRef }) => (
  <section className="bg-[#F5F5DC] text-center py-20 md:py-32 px-6">
    <div className="container mx-auto">
      <h2 className="text-4xl md:text-6xl font-extrabold text-[#2E4034] mb-4">Finanças Bíblicas: Transforme sua Vida</h2>
      <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
        Aprenda a administrar suas finanças com sabedoria baseada em princípios eternos. Alcance liberdade financeira e honre a Deus com seus recursos.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button onClick={() => onScrollTo(pricingRef)} className="bg-[#C8A86B] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105 w-full sm:w-auto">
          Inscreva-se no Curso
        </button>
        <button onClick={onWatchVideo} className="bg-transparent border-2 border-[#2E4034] text-[#2E4034] font-bold py-3 px-8 rounded-lg hover:bg-[#2E4034] hover:text-white transition-colors w-full sm:w-auto">
          Assistir Vídeo
        </button>
      </div>
    </div>
  </section>
);

const HighlightsSection: React.FC = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
                {HIGHLIGHTS.map((item) => {
                    const Icon = iconMap[item.icon];
                    return (
                        <div key={item.title} className="p-6">
                            <Icon className="w-12 h-12 text-[#C8A86B] mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-[#2E4034]">{item.title}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

const KnowTheCourseSection: React.FC<{ onPlayVideo: (id: string) => void; }> = ({ onPlayVideo }) => (
    <section className="py-20 bg-[#F5F5DC]">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2E4034] mb-4">Conheça o Curso</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto mb-8">Assista ao vídeo e descubra como transformar suas finanças com princípios bíblicos.</p>
            <div 
                className="aspect-video max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden cursor-pointer group relative"
                onClick={() => onPlayVideo('iBoZQ