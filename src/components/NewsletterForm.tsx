'use client'

import { useState } from 'react'
import { addToWaitingList } from '@/lib/supabase'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await addToWaitingList(email, name)
      setIsSuccess(true)
      setEmail('')
      setName('')
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="glass-effect rounded-3xl p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-to-r from-sage-400 to-sage-300 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Bienvenue dans TumorTwin !</h3>
        <p className="text-slate-600">Vous recevrez bientôt vos accès à la plateforme et nos actualités !</p>
      </div>
    )
  }

  return (
    <div className="glass-effect rounded-3xl p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        Rejoignez TumorTwin
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Votre prénom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-blue-50/50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-slate-800 placeholder-blue-500"
          />
        </div>
        
        <div>
          <input
            type="email"
            placeholder="Votre email pour accéder à la plateforme"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-2xl bg-blue-50/50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-slate-800 placeholder-blue-500"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-blue-300/50 hover:scale-105 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Inscription...</span>
            </div>
          ) : (
            'Rejoindre notre communauté'
          )}
        </button>
      </form>

      <p className="text-blue-600/60 text-sm text-center mt-4">
        Newsletter exclusive • Accès beta • Technologies avancées
      </p>
    </div>
  )
}