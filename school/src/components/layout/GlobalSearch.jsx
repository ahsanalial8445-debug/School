import { BookOpen, GraduationCap, LoaderCircle, School, Search, User } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import { globalSearch } from '../../services/search.service'

const groups = [
  { key: 'students', label: 'Students', page: 'students', icon: User, limit: 5 },
  { key: 'teachers', label: 'Teachers', page: 'teachers', icon: GraduationCap, limit: 5 },
  { key: 'classes', label: 'Classes', page: 'classes', icon: School, limit: 3 },
  { key: 'subjects', label: 'Subjects', page: 'subjects', icon: BookOpen, limit: 3 },
]

function getResultText(groupKey, item) {
  if (groupKey === 'students') {
    return {
      primary: item.fullName || item.name || `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Unnamed student',
      secondary: [item.admissionNo, item.className || item.class?.name].filter(Boolean).join(' · ') || 'Student record',
    }
  }

  if (groupKey === 'teachers') {
    return {
      primary: item.fullName || item.name || `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Unnamed teacher',
      secondary: Array.isArray(item.specialization) ? item.specialization.join(', ') : item.specialization || item.qualification || 'Teacher record',
    }
  }

  if (groupKey === 'classes') {
    const strength = item.strength ?? item.studentsCount
    const capacity = item.capacity
    return {
      primary: item.name || item.title || 'Unnamed class',
      secondary: strength !== undefined && capacity !== undefined ? `${strength}/${capacity} students` : item.section || 'Class record',
    }
  }

  return {
    primary: item.name || item.title || 'Unnamed subject',
    secondary: [item.code, item.type].filter(Boolean).join(' · ') || 'Subject record',
  }
}

export default function GlobalSearch() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [results, setResults] = useState({ students: [], teachers: [], classes: [], subjects: [] })
  const [loading, setLoading] = useState(false)
  const [searchError, setSearchError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const items = useMemo(() => groups.flatMap((group) => (
    results[group.key].slice(0, group.limit).map((item) => ({ ...item, group }))
  )), [results])
  const hasQuery = query.trim().length > 0
  const hasResults = items.length > 0
  const showDropdown = isOpen && hasQuery

  useEffect(() => {
    let stale = false
    const trimmedQuery = debouncedQuery.trim()

    if (trimmedQuery.length < 2) {
      return undefined
    }

    setLoading(true)
    setSearchError(false)
    globalSearch(trimmedQuery)
      .then((nextResults) => {
        if (stale) return
        setResults(nextResults)
        setSearchError(nextResults.error)
        setHighlightedIndex(-1)
      })
      .catch(() => {
        if (stale) return
        setResults({ students: [], teachers: [], classes: [], subjects: [] })
        setSearchError(true)
      })
      .finally(() => {
        if (!stale) setLoading(false)
      })

    return () => { stale = true }
  }, [debouncedQuery])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false)
    }
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    window.addEventListener('keydown', handleShortcut)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      window.removeEventListener('keydown', handleShortcut)
    }
  }, [])

  const navigateTo = (page) => {
    window.dispatchEvent(new CustomEvent('educore:navigate', { detail: page }))
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
      setHighlightedIndex(-1)
      return
    }
    if (!showDropdown || !hasResults) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex((current) => (current + 1) % items.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex((current) => (current <= 0 ? items.length - 1 : current - 1))
    } else if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault()
      navigateTo(items[highlightedIndex].group.page)
    }
  }

  const handleQueryChange = (value) => {
    setQuery(value)
    setIsOpen(true)
    if (value.trim().length < 2) {
      setResults({ students: [], teachers: [], classes: [], subjects: [] })
      setSearchError(false)
      setLoading(false)
      setHighlightedIndex(-1)
    }
  }

  return (
    <div ref={containerRef} className="relative hidden md:block">
      <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(event) => handleQueryChange(event.target.value)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search campus…"
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls="global-search-results"
        aria-autocomplete="list"
        aria-activedescendant={highlightedIndex >= 0 ? `global-search-result-${highlightedIndex}` : undefined}
        className="h-10 w-56 rounded-xl border border-stone-200 bg-cream/70 pr-20 pl-9 text-sm text-charcoal outline-none placeholder:text-muted focus:border-primary focus:bg-white dark:border-white/10 dark:bg-neutral-800 dark:text-cream dark:focus:bg-neutral-800 lg:w-72"
      />
      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[10px] font-semibold text-muted">{loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-label="Searching" /> : 'Ctrl+K'}</span>

      {showDropdown && (
        <div id="global-search-results" role="listbox" className="absolute top-full right-0 z-50 mt-2 max-h-[400px] w-full min-w-[320px] overflow-y-auto rounded-xl border border-stone-200 bg-white p-2 shadow-xl dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-none">
          {loading ? <p className="px-3 py-6 text-center text-sm text-muted">Searching...</p> : searchError ? <p className="px-3 py-6 text-center text-sm text-red-600">Search failed. Try again.</p> : !hasResults ? <p className="px-3 py-6 text-center text-sm text-muted">No results found for &apos;{query.trim()}&apos;</p> : (
            <>
              {groups.map((group) => {
                const groupResults = results[group.key].slice(0, group.limit)
                if (!groupResults.length) return null
                return (
                  <section key={group.key} aria-label={group.label}>
                    <h2 className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-wider text-muted uppercase">{group.label}</h2>
                    {groupResults.map((item) => {
                      const itemIndex = items.findIndex((result) => result.group.key === group.key && result.id === item.id)
                      const text = getResultText(group.key, item)
                      const Icon = group.icon
                      return <button key={`${group.key}-${item.id || text.primary}`} id={`global-search-result-${itemIndex}`} type="button" role="option" aria-selected={highlightedIndex === itemIndex} onMouseEnter={() => setHighlightedIndex(itemIndex)} onClick={() => navigateTo(group.page)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left ${highlightedIndex === itemIndex ? 'bg-primary/10' : 'hover:bg-cream dark:hover:bg-neutral-800'}`}><Icon className="h-4 w-4 shrink-0 text-primary-dark" aria-hidden="true" /><span className="min-w-0"><span className="block truncate text-sm font-semibold text-charcoal dark:text-cream">{text.primary}</span><span className="block truncate text-xs text-muted">{text.secondary}</span></span></button>
                    })}
                  </section>
                )
              })}
              <button type="button" onClick={() => navigateTo('students')} className="mt-2 w-full border-t border-stone-200 px-3 pt-3 pb-1 text-left text-sm font-semibold text-primary-dark hover:underline dark:border-neutral-700">View all results →</button>
            </>
          )}
          <span className="sr-only" aria-live="polite">{items.length} search results found</span>
        </div>
      )}
    </div>
  )
}
