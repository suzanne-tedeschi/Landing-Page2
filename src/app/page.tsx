'use client'

import { useState } from 'react'
import Image from 'next/image'
import NewsletterForm from '@/components/NewsletterForm'
import ContactForm from '@/components/ContactForm'
import Modal from '@/components/Modal'
import ConstellationBackground from '@/components/ConstellationBackground'

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <>
      {/* Hero Section avec constellation */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        {/* Constellation Background uniquement pour le hero */}
        <ConstellationBackground />
        
        {/* Étoiles scintillantes enrichies */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-80"></div>
          <div className="absolute top-32 right-1/3 w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse opacity-60" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-70" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 w-0.5 h-0.5 bg-blue-100 rounded-full animate-pulse opacity-50" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-60" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/4 right-1/5 w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse opacity-80" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-10 left-1/2 w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-70" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-20 right-1/6 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-60" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute top-2/3 left-1/5 w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-50" style={{animationDelay: '3.5s'}}></div>
          <div className="absolute bottom-1/2 right-2/3 w-1.5 h-1.5 bg-blue-100 rounded-full animate-pulse opacity-80" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-1/3 left-3/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-65" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-200 rounded-full animate-pulse opacity-75" style={{animationDelay: '2.8s'}}></div>
        </div>
        
        {/* Navigation */}
        <nav className="relative z-10 px-6 py-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-display font-bold text-white">
              TumorTwin
            </div>
            <div className="hidden md:flex space-x-8 text-slate-300 font-medium">
              <a href="#features" className="hover:text-white transition-colors duration-300">Fonctionnalités</a>
              <a href="#about" className="hover:text-white transition-colors duration-300">À propos</a>
              <a href="#pricing" className="hover:text-white transition-colors duration-300">Tarifs</a>
              <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 px-6 py-20 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8 animate-fade-in-down">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></span>
              Nouvelle génération de jumeaux numériques
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 animate-fade-in-up">
              <span className="text-white block mb-4">
                TumorTwin
              </span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-300 tracking-wide">
                L&apos;avenir de la recherche oncologique
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Transformez vos données d&apos;imagerie médicale en <strong className="text-blue-300">modèles 3D interactifs</strong>. 
              Simulez l&apos;évolution tumorale avec une précision inégalée grâce à l&apos;IA.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-2xl shadow-2xl hover:bg-slate-100 hover:scale-105 transition-all duration-300 text-lg"
              >
                Demander une démo
              </button>
              <a 
                href="#features"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 hover:shadow-xl transition-all duration-300 text-lg"
              >
                Découvrir les fonctionnalités
              </a>
            </div>

            {/* Newsletter Subscription */}
            <div className="max-w-xl mx-auto mb-16 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">
                  Rejoignez la liste d&apos;attente
                </h3>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition invisible - même dégradé que le hero */}
      <div className="h-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative z-5"></div>

      {/* Reste du contenu avec exactement la même palette */}
      <main className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
        {/* Éléments décoratifs harmonieux dans les tons du hero */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl floating-animation"></div>
          <div className="absolute top-1/3 right-20 w-80 h-80 bg-blue-400/6 rounded-full blur-3xl floating-animation" style={{animationDelay: '-2s'}}></div>
          <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-slate-300/4 rounded-full blur-3xl floating-animation" style={{animationDelay: '-4s'}}></div>
          <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-blue-300/5 rounded-full blur-3xl floating-animation" style={{animationDelay: '-3s'}}></div>
          <div className="absolute bottom-20 left-1/6 w-88 h-88 bg-teal-400/6 rounded-full blur-3xl floating-animation" style={{animationDelay: '-1s'}}></div>
        </div>

        {/* Hero Visual Section */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
              <div className="aspect-[16/9] relative">
                <Image 
                  src="https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Interface de modélisation 3D TumorTwin" 
                  className="w-full h-full object-cover"
                  width={1200}
                  height={675}
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent"></div>
                
                {/* Floating stats */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-blue-600">99.2%</div>
                    <div className="text-sm text-slate-600">Précision IA</div>
                  </div>
                </div>
                
                <div className="absolute top-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-teal-600">24/7</div>
                    <div className="text-sm text-slate-600">Disponibilité</div>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-indigo-600">+500</div>
                    <div className="text-sm text-slate-600">Chercheurs actifs</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl animate-float"></div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-teal-200/30 rounded-full blur-2xl animate-float" style={{animationDelay: '-2s'}}></div>
          </div>
        </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Technologies Avancées
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div id="modelisation" className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/30 rounded-3xl overflow-hidden hover:bg-slate-700/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center relative overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Modélisation 3D de tumeurs" 
                  className="w-full h-full object-cover"
                  width={1000}
                  height={750}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-teal-300/50 rounded-full"></div>
                <div className="absolute top-2 left-2 w-6 h-6 bg-blue-200/50 rounded-full"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">🧬 Modélisation 3D</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Création de modèles 3D précis de tumeurs basés sur l&apos;imagerie médicale. 
                  Reconstruction anatomique détaillée pour une analyse approfondie.
                </p>
                <div className="text-sm text-teal-300 bg-teal-900/30 rounded-lg p-3">
                  IRM • Scanner • Reconstruction • Visualisation
                </div>
              </div>
            </div>

            <div id="simulation" className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/30 rounded-3xl overflow-hidden hover:bg-slate-700/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl group" style={{animationDelay: '0.1s'}}>
              <div className="aspect-[4/3] bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center relative overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Intelligence artificielle et analyse de données médicales" 
                  className="w-full h-full object-cover"
                  width={1000}
                  height={750}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-teal-300/50 rounded-full"></div>
                <div className="absolute top-2 left-2 w-6 h-6 bg-blue-200/50 rounded-full"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">⚡ Simulation IA</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Simulation de l&apos;évolution tumorale et prédiction de réponse aux traitements. 
                  Algorithmes d&apos;apprentissage automatique pour des prédictions précises.
                </p>
                <div className="text-sm text-blue-300 bg-blue-900/30 rounded-lg p-3">
                  Machine Learning • Prédiction • Évolution • Traitement
                </div>
              </div>
            </div>

            <div id="recherche" className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/30 rounded-3xl overflow-hidden hover:bg-slate-700/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl group" style={{animationDelay: '0.2s'}}>
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center relative overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Recherche médicale collaborative" 
                  className="w-full h-full object-cover"
                  width={1000}
                  height={750}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-teal-300/50 rounded-full"></div>
                <div className="absolute top-2 left-2 w-6 h-6 bg-blue-200/50 rounded-full"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">🔬 Recherche</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Plateforme collaborative pour la recherche oncologique. 
                  Partage de données sécurisé et analyses comparatives entre équipes.
                </p>
                <div className="text-sm text-slate-300 bg-slate-700/50 rounded-lg p-3">
                  Collaboration • Données • Analyses • Publications
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="communaute" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Plateforme Collaborative
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white">
                Rejoignez l&apos;écosystème de recherche médicale
              </h3>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-center space-x-4 p-4 bg-slate-700/40 border border-slate-600/50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-600/60 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <span>Accès aux outils de modélisation avancés</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-slate-700/40 border border-slate-600/50 rounded-xl">
                  <div className="w-10 h-10 bg-teal-600/60 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-200" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <span>Collaboration avec équipes internationales</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-slate-700/40 border border-slate-600/50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-600/60 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </div>
                  <span>Analyses comparative et benchmarking</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-slate-700/40 border border-slate-600/50 rounded-xl">
                  <div className="w-10 h-10 bg-teal-600/60 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-200" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2"/>
                    </svg>
                  </div>
                  <span>Formation et ressources pédagogiques</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-slate-700/40 border border-slate-600/50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-600/60 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                    </svg>
                  </div>
                  <span>Support technique et maintenance</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/30 rounded-3xl p-8">
              <h4 className="text-2xl font-bold mb-6 text-white text-center">
                Niveaux d&apos;Accès
              </h4>
              <div className="space-y-4">
                <div className="bg-slate-700/50 border border-blue-600/40 rounded-2xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600/60 rounded-full flex items-center justify-center">
                      <span className="text-blue-200 font-bold text-sm">R</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Recherche</div>
                      <div className="text-sm text-slate-300">Accès modélisation • Données limitées</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700/50 border border-teal-600/40 rounded-2xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-teal-600/60 rounded-full flex items-center justify-center">
                      <span className="text-teal-200 font-bold text-sm">P</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Professionnel</div>
                      <div className="text-sm text-slate-300">Simulation IA • Collaboration étendue</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700/50 border border-indigo-600/40 rounded-2xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-600/60 rounded-full flex items-center justify-center">
                      <span className="text-indigo-200 font-bold text-sm">E</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Enterprise</div>
                      <div className="text-sm text-slate-300">API privée • Support dédié • On-premise</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center bg-slate-800/60 backdrop-blur-sm border border-slate-600/30 rounded-3xl p-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Prêt à révolutionner la recherche ?
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Rejoignez TumorTwin et accédez aux technologies les plus avancées de modélisation tumorale. 
            Transformez vos recherches avec l&apos;intelligence artificielle et la collaboration mondiale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-full shadow-2xl hover:bg-slate-100 hover:scale-105 transition-all duration-300 transform text-lg"
            >
              Demander un accès
            </button>
            <a 
              href="#services"
              className="px-8 py-4 bg-slate-700/60 backdrop-blur-sm border border-slate-500/50 text-slate-200 font-semibold rounded-full hover:bg-slate-600/70 transition-all duration-300 text-lg"
            >
              Découvrir la plateforme
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-slate-600/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">
                TumorTwin
              </div>
              <p className="text-slate-300 text-sm">
                Plateforme de jumeaux numériques pour la recherche oncologique et l&apos;intelligence artificielle médicale.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Technologies</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <div>Modélisation 3D</div>
                <div>Simulation IA</div>
                <div>Recherche Collaborative</div>
                <div>Analyses Prédictives</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Support</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <div>Documentation API</div>
                <div>Formation</div>
                <div>Support technique</div>
                <div>Communauté</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <div>research@tumortwin.com</div>
                <div>+33 1 23 45 67 89</div>
                <div>Paris, France</div>
                <div>LinkedIn • Twitter</div>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-slate-600/30">
            <p className="text-slate-300">
              © 2025 TumorTwin. Tous droits réservés. Plateforme certifiée ISO 27001 pour la sécurité des données médicales.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
        <ContactForm onClose={() => setIsContactModalOpen(false)} />
      </Modal>
      </main>
    </>
  );
}