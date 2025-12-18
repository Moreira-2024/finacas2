import { Module, TestimonialVideo, FaqItem, TestimonialStudent, PricingPlan, CourseMaterial } from './types';

export const HIGHLIGHTS = [
  {
    icon: 'BookOpen',
    title: '6 Módulos Práticos',
  },
  {
    icon: 'Bible',
    title: 'Baseado na Bíblia',
  },
  {
    icon: 'Infinity',
    title: 'Acesso Vitalício',
  },
];

export const WHY_THIS_COURSE_ITEMS = [
    { icon: 'Bible', title: 'Ensino Bíblico', description: 'Fundamentado em princípios sólidos e eternos.' },
    { icon: 'Sparkles', title: 'Transformação Real', description: 'Ferramentas práticas para uma mudança duradoura.' },
    { icon: 'TrendingUp', title: 'Prosperidade Verdadeira', description: 'Alinhe suas finanças com o propósito de Deus.' },
    { icon: 'Shield', title: 'Proteção Financeira', description: 'Aprenda a se proteger de dívidas e crises.' },
    { icon: 'Users', title: 'Comunidade', description: 'Cresça junto com pessoas no mesmo propósito.' },
    { icon: 'HeartHandshake', title: 'Mordomia Fiel', description: 'Administre os recursos de Deus com excelência.' },
];

export const MODULES: Module[] = [
  { number: 1, title: 'Introdução e Fundamentos', description: 'Estabeleça a base para uma vida financeira transformada, entendendo o propósito de Deus para seus recursos.' },
  { number: 2, 'title': 'A Parte de Deus e a Nossa Parte', description: 'Descubra as responsabilidades divinas e humanas na administração financeira e como a parceria funciona.' },
  { number: 3, 'title': 'Dívida: A Escravidão Moderna', description: 'Aprenda a identificar, evitar e eliminar as dívidas que aprisionam sua liberdade financeira.' },
  { number: 4, 'title': 'Conselho e Sabedoria', description: 'Entenda a importância de buscar conselhos sábios e como tomar decisões financeiras mais seguras.' },
  { number: 5, 'title': 'Honestidade e Integridade', description: 'Construa uma reputação de integridade em suas finanças, honrando a Deus em todos os negócios.' },
  { number: 6, 'title': 'Generosidade e Contribuição', description: 'Experimente a alegria de contribuir e o poder da generosidade para abençoar outros e glorificar a Deus.' },
];

// Substitua a URL abaixo pela URL da imagem da Crown que você enviou, se desejar.
// Esta imagem é um placeholder de alta qualidade com o tema Bíblia e Finanças.
export const GLOBAL_VIDEO_COVER = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80";

export const TESTIMONIAL_VIDEOS: TestimonialVideo[] = [
  { id: '1', title: 'Testemunho 1: Transformação financeira através da fé', youtubeId: 'lVZrEf3smG4' },
  { id: '2', title: 'Testemunho 2: Como Deus mudou minha vida financeira', youtubeId: 'dpkbcfPr0mw' },
  { id: '3', title: 'Testemunho 3: Da dívida à prosperidade com princípios bíblicos', youtubeId: 'FXUfxcSxMEE' },
];

export const FAQ_ITEMS: FaqItem[] = [
  { question: 'Para quem é este curso?', answer: 'Este curso é para todos que desejam administrar suas finanças de acordo com os princípios bíblicos, independente da idade, profissão ou situação financeira atual.' },
  { question: 'Preciso ter conhecimento prévio de finanças ou da Bíblia?', answer: 'Não. O curso foi desenhado para ser acessível a todos, desde o iniciante ao mais experiente. Abordamos os conceitos de forma clara e prática.' },
  { question: 'Como funciona o acesso ao curso?', answer: 'Após a inscrição, você receberá acesso vitalício a todas as aulas em vídeo, materiais de apoio e atualizações futuras. Você pode assistir no seu ritmo, quando e onde quiser.' },
  { question: 'Quais materiais de apoio estão inclusos?', answer: 'Você terá acesso a planilhas de orçamento, guias em PDF, checklists e outras ferramentas práticas para aplicar o que aprendeu nas aulas.' },
  { question: 'Terei suporte durante o curso?', answer: 'Sim. Dependendo do plano escolhido, você terá acesso à nossa comunidade de alunos, suporte via e-mail e até mesmo sessões de mentoria.' },
  { question: 'E se eu não gostar do curso?', answer: 'Oferecemos uma garantia de satisfação. Se por qualquer motivo você não ficar satisfeito nos primeiros 7 dias, devolvemos seu investimento integralmente.' },
];

export const STUDENT_TESTIMONIALS: TestimonialStudent[] = [
    { id: 1, quote: 'Este curso mudou completamente minha perspectiva sobre dinheiro. Aprendi a ser um mordomo fiel e a paz que isso trouxe é indescritível.', name: 'Ana Carolina', profession: 'Advogada' },
    { id: 2, quote: 'As ferramentas de orçamento são incríveis! Pela primeira vez, eu e minha esposa conseguimos controlar nossas despesas e planejar o futuro.', name: 'Ricardo Mendes', profession: 'Engenheiro' },
    { id: 3, quote: 'Sair das dívidas parecia impossível, mas os princípios ensinados aqui me deram um plano claro e a motivação que eu precisava. Estou livre!', name: 'Fernanda Lima', profession: 'Professora' },
    { id: 4, quote: 'A abordagem bíblica é o grande diferencial. Não é apenas sobre números, é sobre propósito e honra a Deus em todas as áreas da vida.', name: 'Paulo Costa', profession: 'Empresário' },
    { id: 5, quote: 'A comunidade é um bônus fantástico. Trocar experiências e aprender com outros alunos enriqueceu muito minha jornada.', name: 'Juliana Alves', profession: 'Designer' },
    { id: 6, quote: 'Um investimento que vale cada centavo. O conhecimento adquirido aqui vai abençoar não só a mim, mas as futuras gerações da minha família.', name: 'Marcos Borges', profession: 'Médico' },
];

export const PRICING_PLANS: PricingPlan[] = [
    {
        name: 'Básico',
        price: 'R$ 39,90',
        features: [
            'Acesso vitalício aos 6 módulos',
            'Planilhas e PDFs de apoio',
            'Acesso à comunidade de alunos',
            'Suporte por e-mail'
        ],
        isPopular: false
    },
    {
        name: 'Intermediário',
        price: 'R$ 59,90',
        features: [
            'Tudo do plano Básico',
            '6 Aulas Bônus exclusivas',
            'Workshop mensal ao vivo',
            'Grupo VIP no WhatsApp'
        ],
        isPopular: true
    },
    {
        name: 'Premium',
        price: 'R$ 89,90',
        features: [
            'Tudo do plano Intermediário',
            '2 sessões de mentoria individual',
            'Análise de perfil financeiro',
            'Acesso antecipado a novos cursos'
        ],
        isPopular: false
    }
];

export const COURSE_MATERIALS: CourseMaterial[] = [
  {
    id: 'full-bundle',
    title: 'Kit Didático Completo',
    type: 'bundle',
    pages: 350,
    description: 'O pacote definitivo para sua transformação financeira. Inclui todo o conteúdo do curso em formato digital consolidado.',
    benefits: [
      'Conteúdo integral do curso',
      'Exercícios práticos unificados',
      'Acesso a planilhas exclusivas',
      'Certificado de conclusão simbólico'
    ],
    isHighlight: true
  },
  {
    id: 'book-money',
    title: 'Livro: O Seu Dinheiro',
    type: 'book',
    pages: 180,
    description: 'A leitura fundamental que revela os segredos bíblicos para lidar com as finanças. Base para todo o curso.',
    benefits: [
      'Princípios bíblicos profundos',
      'Histórias reais inspiradoras',
      'Mudança de mentalidade'
    ]
  },
  {
    id: 'student-notebook',
    title: 'Manual do Participante',
    type: 'workbook',
    pages: 120,
    description: 'Seu companheiro de jornada. Espaço para anotações, reflexões e exercícios de cada módulo.',
    benefits: [
      'Acompanhamento passo a passo',
      'Perguntas para reflexão',
      'Fixação do aprendizado'
    ]
  },
  {
    id: 'leader-guide',
    title: 'Guia do Líder',
    type: 'guide',
    pages: 85,
    description: 'Material exclusivo para quem deseja multiplicar o conhecimento e liderar pequenos grupos.',
    benefits: [
      'Roteiros de reuniões',
      'Dicas de facilitação',
      'Respostas para dúvidas comuns'
    ]
  },
  {
    id: 'tasks',
    title: 'Caderno de Tarefas Práticas',
    type: 'task',
    pages: 45,
    description: 'A teoria em ação. Planilhas de orçamento, planos de pagamento de dívidas e inventários.',
    benefits: [
      'Ferramentas de aplicação imediata',
      'Modelos prontos para usar',
      'Resultados tangíveis'
    ]
  }
];