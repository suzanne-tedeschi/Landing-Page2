'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseDebug() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          🔧
        </button>
      </div>
    )
  }

  const testConnection = async () => {
    setIsLoading(true)
    try {
      // Test de connexion basique - syntaxe corrigée
      const { data, error, count } = await supabase
        .from('waiting_list')
        .select('*', { count: 'exact', head: true })

      if (error) {
        setDebugInfo({
          success: false,
          error: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        })
      } else {
        setDebugInfo({
          success: true,
          message: 'Connexion réussie !',
          data: `Table contient ${count} enregistrements`,
          tableCount: count
        })
      }
    } catch (err: any) {
      setDebugInfo({
        success: false,
        error: err.message,
        type: 'Connection Error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testInsert = async () => {
    setIsLoading(true)
    try {
      const testEmail = `test-debug-${Date.now()}@example.com`
      
      console.log('Tentative d\'insertion avec:', { email: testEmail })
      
      // Test avec les mêmes paramètres que le vrai formulaire
      const { data, error } = await supabase
        .from('waiting_list')
        .insert([{ 
          email: testEmail
        }])
        .select()

      console.log('Résultat insertion:', { data, error })

      if (error) {
        setDebugInfo({
          success: false,
          error: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          action: 'INSERT TEST',
          suggestion: error.code === '42501' ? 
            'Erreur RLS: Exécutez "ALTER TABLE public.waiting_list DISABLE ROW LEVEL SECURITY;" dans Supabase SQL Editor' :
            error.message.includes('row-level security') ?
            'Problème RLS: Vérifiez les politiques ou désactivez RLS temporairement' :
            'Vérifiez la structure de la table et les permissions'
        })
      } else {
        setDebugInfo({
          success: true,
          message: 'Test d\'insertion réussi !',
          data: data,
          action: 'INSERT TEST',
          insertedRecord: data?.[0]
        })
      }
    } catch (err: any) {
      console.error('Erreur catch:', err)
      setDebugInfo({
        success: false,
        error: err.message,
        type: 'Insert Error - Exception',
        action: 'INSERT TEST',
        suggestion: 'Erreur JavaScript - vérifiez la console pour plus de détails'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const disableRLS = async () => {
    setIsLoading(true)
    try {
      // Cette commande ne fonctionnera que si l'utilisateur a les droits admin
      // C'est juste pour montrer la commande SQL à exécuter
      setDebugInfo({
        success: false,
        error: 'Cette action doit être faite dans le dashboard Supabase',
        suggestion: 'Allez dans SQL Editor et exécutez: ALTER TABLE public.waiting_list DISABLE ROW LEVEL SECURITY;',
        type: 'Info'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testRead = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('waiting_list')
        .select('id, email, created_at')
        .limit(3)
        .order('created_at', { ascending: false })

      if (error) {
        setDebugInfo({
          success: false,
          error: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          action: 'READ TEST'
        })
      } else {
        setDebugInfo({
          success: true,
          message: 'Test de lecture réussi !',
          data: data,
          action: 'READ TEST',
          recordCount: data?.length || 0
        })
      }
    } catch (err: any) {
      setDebugInfo({
        success: false,
        error: err.message,
        type: 'Read Error',
        action: 'READ TEST'
      })
    } finally {
      setIsLoading(false)
    }
  }

    return (
      <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-lg max-w-sm z-50">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-800">🔧 Debug Supabase</h3>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ➖
          </button>
        </div>      <div className="space-y-2">
        <button
          onClick={testConnection}
          disabled={isLoading}
          className="w-full px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Test...' : 'Test Connexion'}
        </button>
        
        <button
          onClick={testRead}
          disabled={isLoading}
          className="w-full px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 disabled:opacity-50"
        >
          {isLoading ? 'Test...' : 'Test Lecture'}
        </button>
        
        <button
          onClick={testInsert}
          disabled={isLoading}
          className="w-full px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50"
        >
          {isLoading ? 'Test...' : 'Test Insertion'}
        </button>

        <button
          onClick={disableRLS}
          disabled={isLoading}
          className="w-full px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 disabled:opacity-50"
        >
          Aide RLS
        </button>
      </div>

      {debugInfo && (
        <div className={`mt-3 p-2 rounded text-xs ${
          debugInfo.success 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {debugInfo.success ? (
            <div>
              <div className="font-bold">✅ {debugInfo.message}</div>
              {debugInfo.data && (
                <pre className="mt-1 text-xs">{JSON.stringify(debugInfo.data, null, 2)}</pre>
              )}
            </div>
          ) : (
            <div>
              <div className="font-bold">❌ Erreur</div>
              <div>Code: {debugInfo.code}</div>
              <div>Message: {debugInfo.error}</div>
              {debugInfo.hint && <div>Conseil: {debugInfo.hint}</div>}
              {debugInfo.details && <div>Détails: {debugInfo.details}</div>}
              {debugInfo.suggestion && (
                <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded">
                  <strong>Solution:</strong> {debugInfo.suggestion}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-500">
        URL: {process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30)}...
      </div>
    </div>
  )
}