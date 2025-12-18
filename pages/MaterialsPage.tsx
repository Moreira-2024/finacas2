import React from 'react';
import { COURSE_MATERIALS } from '../constants';
import { BookOpen, Check, Download, FileText, ArrowRight } from '../components/icons';

const MaterialsPage: React.FC = () => {
  const highlightMaterial = COURSE_MATERIALS.find(m => m.isHighlight);
  const otherMaterials = COURSE_MATERIALS.filter(m => !m.isHighlight);

  return (
    <div className="bg-white font-sans animate-fade-in">
      
      <section className="bg-[#F5F5DC] py-12 md:py-20">
        <div className="container mx-auto px-6 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2E4034] mb-6 font-serif">Materiais Didáticos</h1>
            <p className="text-neutral-600 text-lg leading-relaxed">
                Acesse todo o material de apoio necessário para o curso. 
                Estes recursos foram cuidadosamente elaborados para complementar as aulas e facilitar a aplicação prática dos princípios bíblicos.
            </p>
        </div>
      </section>

      {highlightMaterial && (
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200 flex flex-col md:flex-row group hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-[#2E4034] p-10 md:w-2/5 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <BookOpen className="w-24 h-24 text-[#C8A86B] mb-6 relative z-10" />
                    <h3 className="text-3xl font-bold text-white mb-2 relative z-10">{highlightMaterial.title}</h3>
                    <span className="inline-block bg-[#C8A86B] text-[#2E4034] text-xs font-bold px-3 py-1 rounded-full mt-4 relative z-10">RECOMENDADO</span>
                </div>
                <div className="p-10 md:w-3/5 flex flex-col justify-center">
                    <div className="mb-6">
                          <h4 className="text-xl font-bold text-[#2E4034] mb-3 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#C8A86B]" />
                            Sobre o Material
                          </h4>
                          <p className="text-neutral-600 leading-relaxed mb-4">{highlightMaterial.description}</p>
                          <div className="flex items-center gap-2 text-sm text-neutral-500 font-medium bg-neutral-50 w-fit px-3 py-1 rounded-md border border-neutral-200">
                            <span>Volume Único</span>
                            <span>•</span>
                            <span>{highlightMaterial.pages} Páginas</span>
                          </div>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">O que está incluso</h4>
                        <ul className="grid sm:grid-cols-2 gap-3">
                            {highlightMaterial.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-neutral-700">
                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button 
                        onClick={() => alert('Download iniciado para o material completo!')}
                        className="w-full sm:w-auto bg-[#C8A86B] text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-[#b3955e] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
                    >
                        <Download className="w-5 h-5" />
                        Baixar Material Completo
                    </button>
                </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-20 bg-[#F5F5DC]">
        <div className="container mx-auto px-6 max-w-6xl">
             <h3 className="text-3xl font-bold text-center text-[#2E4034] mb-12">Recursos Individuais</h3>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherMaterials.map(material => (
                    <div key={material.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col h-full group">
                        <div className="p-8 flex-grow">
                            <div className="w-12 h-12 bg-[#F5F5DC] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#2E4034] transition-colors duration-300">
                                <FileText className="w-6 h-6 text-[#2E4034] group-hover:text-[#C8A86B] transition-colors" />
                            </div>
                            <h4 className="text-xl font-bold text-[#2E4034] mb-3 min-h-[56px]">{material.title}</h4>
                            <p className="text-neutral-500 text-sm mb-4 font-medium">{material.pages} páginas</p>
                            <p className="text-neutral-600 mb-6 line-clamp-3 leading-relaxed">{material.description}</p>
                            
                            <div className="space-y-2">
                                {material.benefits.slice(0, 2).map((benefit, idx) => (
                                      <div key={idx} className="flex items-center gap-2 text-sm text-neutral-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#C8A86B]"></div>
                                        {benefit}
                                      </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 border-t border-neutral-100 bg-neutral-50 rounded-b-xl mt-auto">
                              <button 
                                onClick={() => alert(`Abrindo ${material.title}`)}
                                className="w-full py-2 px-4 border-2 border-[#2E4034] text-[#2E4034] font-bold rounded-lg hover:bg-[#2E4034] hover:text-white transition-colors flex items-center justify-center gap-2"
                              >
                                <span>Acessar Recurso</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="md:w-1/3 text-center">
                          <div className="w-24 h-24 bg-[#2E4034] rounded-full flex items-center justify-center mx-auto shadow-lg mb-4">
                            <span className="text-4xl font-bold text-[#C8A86B]">?</span>
                          </div>
                          <h3 className="text-2xl font-bold text-[#2E4034]">Como Usar os Materiais?</h3>
                    </div>
                    <div className="md:w-2/3">
                        <ul className="space-y-4">
                            <li className="flex gap-4 bg-white p-4 rounded-lg border border-neutral-200">
                                <span className="font-bold text-[#C8A86B] text-xl">1.</span>
                                <p className="text-neutral-700"><span className="font-bold text-[#2E4034]">Leitura Prévia:</span> Leia o capítulo correspondente no livro "O Seu Dinheiro" antes de cada aula.</p>
                            </li>
                            <li className="flex gap-4 bg-white p-4 rounded-lg border border-neutral-200">
                                <span className="font-bold text-[#C8A86B] text-xl">2.</span>
                                <p className="text-neutral-700"><span className="font-bold text-[#2E4034]">Exercícios:</span> Utilize o Caderno do Aluno durante as aulas para anotações e complete as tarefas semanais.</p>
                            </li>
                              <li className="flex gap-4 bg-white p-4 rounded-lg border border-neutral-200">
                                <span className="font-bold text-[#C8A86B] text-xl">3.</span>
                                <p className="text-neutral-700"><span className="font-bold text-[#2E4034]">Aplicação:</span> Use as planilhas do Caderno de Tarefas para organizar seu orçamento real.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="text-center py-12 md:py-20 bg-[#F5F5DC]">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#2E4034] mb-4 font-serif">Pronto para Começar?</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto mb-8">
                Agora que você tem as ferramentas em mãos, o próximo passo é se comprometer com sua transformação.
            </p>
            <button 
                onClick={() => alert('Inscrição iniciada!')}
                className="bg-[#2E4034] text-white font-bold py-4 px-10 rounded-lg shadow-xl hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
                Inscrever-se no Curso Agora
            </button>
        </div>
      </section>

    </div>
  );
};

export default MaterialsPage;
