'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

interface Experience {
  id: string
  company: string
  role: string
  period: string
  type: string
  description: string
  sort_order: number
}

export default function AdminExperience() {
  const router = useRouter()
  const [items, setItems] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState({
    company: '',
    role: '',
    period: '',
    type: 'KERJA',
    description: '',
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await supabase
      .from('experiences')
      .select('*')
      .order('sort_order')
    if (data) setItems(data)
    setLoading(false)
  }

  const handleUpdate = async (item: Experience) => {
    setSaving(item.id)
    await supabase
      .from('experiences')
      .update({
        company: item.company,
        role: item.role,
        period: item.period,
        type: item.type,
        description: item.description,
      })
      .eq('id', item.id)
    setSaving(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus experience ini?')) return
    await supabase.from('experiences').delete().eq('id', id)
    setItems(items.filter(i => i.id !== id))
  }

  const handleAdd = async () => {
    if (!newItem.company || !newItem.role) return
    const { data } = await supabase
      .from('experiences')
      .insert({ ...newItem, sort_order: items.length })
      .select()
      .single()
    if (data) {
      setItems([...items, data])
      setNewItem({ company: '', role: '', period: '', type: 'KERJA', description: '' })
      setShowForm(false)
    }
  }

  const updateItem = (id: string, field: keyof Experience, value: string) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i))
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Memuat...</p>
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      padding: 'clamp(32px, 6vw, 80px)',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}>
          <div>
            <button
              onClick={() => router.push('/admin')}
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                marginBottom: '12px',
                display: 'block',
                fontFamily: 'var(--font-sans)',
              }}
            >
              ← Dashboard
            </button>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: '400',
              color: 'var(--text-primary)',
            }}>Experience</h1>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              fontSize: '13px',
              color: 'var(--bg)',
              background: 'var(--accent)',
              border: 'none',
              borderRadius: '4px',
              padding: '9px 20px',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            + Tambah
          </button>
        </div>

        {/* Form tambah baru */}
        {showForm && (
          <div style={{
            background: 'white',
            border: '0.5px solid var(--border)',
            borderRadius: '6px',
            padding: '24px',
            marginBottom: '24px',
          }}>
            <p style={{
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '16px',
              fontFamily: 'var(--font-sans)',
            }}>Experience Baru</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { field: 'company', label: 'Company / Nama', placeholder: 'PT. Contoh' },
                { field: 'role', label: 'Role', placeholder: 'Frontend Developer' },
                { field: 'period', label: 'Period', placeholder: '2024' },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label style={{
                    display: 'block',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                    fontFamily: 'var(--font-sans)',
                  }}>{label}</label>
                  <input
                    type="text"
                    value={newItem[field as keyof typeof newItem]}
                    onChange={e => setNewItem({ ...newItem, [field]: e.target.value })}
                    placeholder={placeholder}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '13px',
                      background: 'var(--bg-surface)',
                      border: '0.5px solid var(--border)',
                      borderRadius: '4px',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}

              {/* Type */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                  fontFamily: 'var(--font-sans)',
                }}>Type</label>
                <select
                  value={newItem.type}
                  onChange={e => setNewItem({ ...newItem, type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    background: 'var(--bg-surface)',
                    border: '0.5px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <option value="KERJA">KERJA</option>
                  <option value="JUARA">JUARA</option>
                  <option value="EDU">EDU</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                  fontFamily: 'var(--font-sans)',
                }}>Deskripsi</label>
                <textarea
                  value={newItem.description}
                  onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Deskripsi singkat..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    background: 'var(--bg-surface)',
                    border: '0.5px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowForm(false)}
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    background: 'transparent',
                    border: '0.5px solid var(--border)',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Batal
                </button>
                <button
                  onClick={handleAdd}
                  style={{
                    fontSize: '13px',
                    color: 'var(--bg)',
                    background: 'var(--text-primary)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* List experience */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.length === 0 ? (
            <div style={{
              padding: '40px',
              background: 'white',
              border: '0.5px solid var(--border)',
              borderRadius: '6px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Belum ada experience. Klik + Tambah untuk menambahkan.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{
                background: 'white',
                border: '0.5px solid var(--border)',
                borderRadius: '6px',
                padding: '20px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { field: 'company', label: 'Company', placeholder: 'PT. Contoh' },
                    { field: 'role', label: 'Role', placeholder: 'Frontend Developer' },
                    { field: 'period', label: 'Period', placeholder: '2024' },
                  ].map(({ field, label, placeholder }) => (
                    <div key={field}>
                      <label style={{
                        display: 'block',
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                        fontFamily: 'var(--font-sans)',
                      }}>{label}</label>
                      <input
                        type="text"
                        value={item[field as keyof Experience] as string || ''}
                        onChange={e => updateItem(item.id, field as keyof Experience, e.target.value)}
                        placeholder={placeholder}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          fontSize: '13px',
                          background: 'var(--bg-surface)',
                          border: '0.5px solid var(--border)',
                          borderRadius: '4px',
                          color: 'var(--text-primary)',
                          outline: 'none',
                          fontFamily: 'var(--font-sans)',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  ))}

                  {/* Type */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                      fontFamily: 'var(--font-sans)',
                    }}>Type</label>
                    <select
                      value={item.type || 'KERJA'}
                      onChange={e => updateItem(item.id, 'type', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '13px',
                        background: 'var(--bg-surface)',
                        border: '0.5px solid var(--border)',
                        borderRadius: '4px',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      <option value="KERJA">KERJA</option>
                      <option value="JUARA">JUARA</option>
                      <option value="EDU">EDU</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                      fontFamily: 'var(--font-sans)',
                    }}>Deskripsi</label>
                    <textarea
                      value={item.description || ''}
                      onChange={e => updateItem(item.id, 'description', e.target.value)}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '13px',
                        background: 'var(--bg-surface)',
                        border: '0.5px solid var(--border)',
                        borderRadius: '4px',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontFamily: 'var(--font-sans)',
                        resize: 'vertical',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* Actions */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '8px',
                    paddingTop: '8px',
                    borderTop: '0.5px solid var(--border)',
                  }}>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        fontSize: '12px',
                        color: 'var(--accent)',
                        background: 'transparent',
                        border: '0.5px solid var(--accent)',
                        borderRadius: '4px',
                        padding: '6px 14px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      Hapus
                    </button>
                    <button
                      onClick={() => handleUpdate(item)}
                      disabled={saving === item.id}
                      style={{
                        fontSize: '12px',
                        color: 'var(--bg)',
                        background: saving === item.id ? 'var(--border)' : 'var(--text-primary)',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 14px',
                        cursor: saving === item.id ? 'not-allowed' : 'pointer',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {saving === item.id ? 'Menyimpan...' : 'Simpan'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}