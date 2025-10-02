'use client'

import { useState } from 'react'
import { addToWaitingList } from '@/lib/supabase'

interface ContactFormProps {
  onClose: () => void
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Add to waiting list with additional info
      await addToWaitingList(formData.email, `${formData.name} - Contact: ${formData.message}`)
      setIsSuccess(true)
      
      // Close modal after success
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gradient-to-r from-sage-400 to-sage-300 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-rose-900 mb-2">Réservation confirmée !</h3>
        <p className="text-rose-700/70">Nous vous contacterons très bientôt pour organiser votre visite au Rose Studio !</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-rose-900 mb-6 text-center">
        Réservez votre expérience
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Votre prénom"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all duration-300 text-rose-900 placeholder-rose-500"
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all duration-300 text-rose-900 placeholder-rose-500"
          />
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Que souhaitez-vous découvrir ? Café cosy, cookies gourmands, pilates reformer ou tout ?"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-2xl bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all duration-300 text-rose-900 placeholder-rose-500 resize-none"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 glass-effect text-rose-700 font-semibold rounded-2xl hover:bg-rose-50/90 transition-all duration-300"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-sage-500 to-sage-400 text-white font-semibold rounded-2xl shadow-lg hover:shadow-sage-300/50 hover:scale-105 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Envoi...</span>
              </div>
            ) : (
              'Réserver'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}