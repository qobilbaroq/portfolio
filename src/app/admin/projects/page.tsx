'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  tech_stack: string[]
  image_url: string
  live_url: string
  github_url: string
  display_month: string
  created_at: string
}

const emptyProject = {
  title: '',
  slug: '',
  description: '',
  tech_stack: [],
  image_url: '',
  live_url: '',
  github_url: '',
  display_month: '',
}

export default function AdminProjects() {
  const router = useRouter()
  const [items, setItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState(emptyProject)
  const [techInput, setTechInput] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setItems(data)
    setLoading(false)
  }

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  const handleAdd = async () => {
    if (!newItem.title) return
    const slug = newItem.slug || generateSlug(newItem.title)
    const { data } = await supabase
      .from('projects')
      .insert({ ...newItem, slug })
      .select()
      .single()
    if (data) {
      setItems([data, ...items])
      setNewItem(emptyProject)
      setTechInput('')
      setShowForm(false)
    }
  }

  const handleUpdate = async (item: Project) => {
    setSaving(item.id)
    await supabase
      .from('projects')
      .update({
        title: item.title,
        slug: item.slug,
        description: item.description,
        tech_stack: item.tech_stack,
        image_url: item.image_url,
        live_url: item.live_url,
        github_url: item.github_url,
        display_month: item.display_month,
      })
      .eq('id', item.id)
    setSaving(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus project ini?')) return
    await supabase.from('projects').delete().eq('id', id)
    setItems(items.filter(i => i.id !== id))
  }

  const updateItem = (id: string, field: keyof Project, value: string | string[]) => {
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
            }}>Projects</h1>
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
            }}>Project Baru</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { field: 'title', label: 'Judul', placeholder: 'LogicPath' },
                { field: 'slug', label: 'Slug (auto dari judul)', placeholder: 'logicpath' },
                { field: 'display_month', label: 'Bulan Tampil', placeholder: 'January' },
                { field: 'live_url', label: 'Live URL', placeholder: 'https://...' },
                { field: 'github_url', label: 'GitHub URL', placeholder: 'https://github.com/...' },
                { field: 'image_url', label: 'Image URL', placeholder: 'https://...' },
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
                    value={newItem[field as keyof typeof newItem] as string}
                    onChange={e => {
                      const val = e.target.value
                      setNewItem(prev => ({
                        ...prev,
                        [field]: val,
                        ...(field === 'title' ? { slug: generateSlug(val) } : {}),
                      }))
                    }}
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

              {/* Tech stack */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                  fontFamily: 'var(--font-sans)',
                }}>Tech Stack (tekan Enter untuk tambah)</label>
                <input
                  type="text"
                  value={techInput}
                  onChange={e => setTechInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && techInput.trim()) {
                      setNewItem(prev => ({
                        ...prev,
                        tech_stack: [...prev.tech_stack, techInput.trim()],
                      }))
                      setTechInput('')
                    }
                  }}
                  placeholder="Next.js, Vue.js, ..."
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
                {newItem.tech_stack.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                    {newItem.tech_stack.map((tech, i) => (
                      <span
                        key={i}
                        onClick={() => setNewItem(prev => ({
                          ...prev,
                          tech_stack: prev.tech_stack.filter((_, j) => j !== i),
                        }))}
                        style={{
                          fontSize: '11px',
                          background: 'var(--text-primary)',
                          color: 'var(--bg)',
                          padding: '3px 10px',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        {tech} ×
                      </span>
                    ))}
                  </div>
                )}
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
                  placeholder="Deskripsi project..."
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
                  onClick={() => { setShowForm(false); setNewItem(emptyProject); setTechInput('') }}
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

        {/* List projects */}
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
                Belum ada project. Klik + Tambah untuk menambahkan.
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

                  {/* Title + slug */}
                  {[
                    { field: 'title', label: 'Judul', placeholder: 'LogicPath' },
                    { field: 'slug', label: 'Slug', placeholder: 'logicpath' },
                    { field: 'display_month', label: 'Bulan Tampil', placeholder: 'January' },
                    { field: 'live_url', label: 'Live URL', placeholder: 'https://...' },
                    { field: 'github_url', label: 'GitHub URL', placeholder: 'https://github.com/...' },
                    { field: 'image_url', label: 'Image URL', placeholder: 'https://...' },
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
                        value={item[field as keyof Project] as string || ''}
                        onChange={e => updateItem(item.id, field as keyof Project, e.target.value)}
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

                  {/* Tech stack */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                      fontFamily: 'var(--font-sans)',
                    }}>Tech Stack</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                      {(item.tech_stack || []).map((tech, i) => (
                        <span
                          key={i}
                          onClick={() => updateItem(
                            item.id,
                            'tech_stack',
                            item.tech_stack.filter((_, j) => j !== i)
                          )}
                          style={{
                            fontSize: '11px',
                            background: 'var(--text-primary)',
                            color: 'var(--bg)',
                            padding: '3px 10px',
                            borderRadius: '2px',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-sans)',
                          }}
                        >
                          {tech} ×
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Tambah tech (tekan Enter)"
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          const val = (e.target as HTMLInputElement).value.trim()
                          if (val) {
                            updateItem(item.id, 'tech_stack', [...(item.tech_stack || []), val])
                            ;(e.target as HTMLInputElement).value = ''
                          }
                        }
                      }}
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