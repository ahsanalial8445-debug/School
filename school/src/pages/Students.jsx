import { useEffect, useMemo, useState } from 'react'
import { Edit2, GraduationCap, Trash2 } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import DataTable from '../components/ui/DataTable'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import FilterBar from '../components/ui/FilterBar'
import Badge from '../components/ui/Badge'
import FormField from '../components/ui/FormField'
import StatSummary from '../components/ui/StatSummary'
import useCrudResource from '../hooks/useCrudResource'
import useDebounce from '../hooks/useDebounce'
import { apiGet } from '../services/api'
import { useToast } from '../context/ToastContext'
import { formatDate } from '../utils/format'
import { extractList } from '../utils/extractList'
import { buildStudentPayload } from '../utils/buildPayload'

const initialForm = { firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', gender: '', classId: '', section: '', guardianName: '', guardianPhone: '', address: '', bloodGroup: '', status: 'active' }
const statusVariant = { active: 'emerald', pending: 'amber', inactive: 'muted' }
const text = (value, fallback = '—') => value ?? fallback

export default function Students() {
  const { data, loading, error, reload, create, update, remove } = useCrudResource('/students')
  const safeStudents = extractList(data, 'students')
  const rows = safeStudents
  const { showToast } = useToast()
  const [classes, setClasses] = useState([])
  const [stats, setStats] = useState({})
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const [status, setStatus] = useState('')
  const [classId, setClassId] = useState('')
  const [sort, setSort] = useState('')
  const [form, setForm] = useState(initialForm)
  const [editing, setEditing] = useState(null)
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    apiGet('/classes').then((response) => setClasses(Array.isArray(response?.data?.classes) ? response.data.classes : Array.isArray(response?.data) ? response.data : [])).catch(() => setClasses([]))
    apiGet('/students/stats').then((data) => setStats(data?.data || data || {})).catch(() => {})
  }, [])

  const filtered = useMemo(() => rows.filter((student) => {
    const name = student.fullName || `${student.firstName || ''} ${student.lastName || ''}`
    return (!debouncedSearch || name.toLowerCase().includes(debouncedSearch.toLowerCase()) || String(student.admissionNo || '').toLowerCase().includes(debouncedSearch.toLowerCase())) && (!status || String(student.status || '').toLowerCase() === status) && (!classId || String(student.classId || student.class?.id) === classId)
  }).sort((a, b) => sort === 'name' ? String(a.fullName || a.name).localeCompare(String(b.fullName || b.name)) : sort === 'date' ? new Date(b.enrollmentDate) - new Date(a.enrollmentDate) : 0), [rows, debouncedSearch, status, classId, sort])

  const openCreate = () => { setEditing(null); setFormError(''); setForm(initialForm); setOpen(true) }
  const openEdit = (student) => { setEditing(student); setFormError(''); setForm({ ...initialForm, ...student, classId: student.classId || student.class?.id || '' }); setOpen(true) }
  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const save = async (event) => { event.preventDefault(); setSaving(true); setFormError(''); const payload = buildStudentPayload(form); console.log('[Students] Sending payload:', payload); try { if (editing) await update(editing.id, payload); else await create(payload); showToast(editing ? 'Student updated.' : 'Student added.', 'success'); setEditing(null); setOpen(false) } catch (requestError) { const detail = requestError?.errors?.length ? requestError.errors.map((item) => `${item.path || item.field || ''}: ${item.message || 'invalid'}`).join(', ') : requestError?.message || 'Failed to save'; setFormError(detail); showToast(detail, 'error') } finally { setSaving(false) } }
  const confirmDelete = async () => { try { await remove(deleting.id); showToast('Student deleted.', 'success'); setDeleting(null) } catch (requestError) { showToast(requestError.message, 'error') } }

  const columns = [
    { key: 'fullName', label: 'Student', render: (student) => <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary-dark">{String(student.fullName || student.name || '?').split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><div><p className="font-semibold">{text(student.fullName || student.name)}</p><p className="text-xs text-muted">{text(student.admissionNo)}</p></div></div> },
    { key: 'className', label: 'Class', render: (student) => text(student.className || student.class?.name || student.class) },
    { key: 'guardian', label: 'Guardian', render: (student) => <div><p>{text(student.guardianName || student.guardian?.name)}</p><p className="text-xs text-muted">{text(student.guardianPhone || student.guardian?.phone)}</p></div> },
    { key: 'enrollmentDate', label: 'Enrollment Date', render: (student) => formatDate(student.enrollmentDate) },
    { key: 'status', label: 'Status', render: (student) => <Badge variant={statusVariant[String(student.status || '').toLowerCase()] || 'muted'} dot>{String(student.status || 'inactive').toLowerCase().replace(/^./, (letter) => letter.toUpperCase())}</Badge> },
    { key: 'feeStatus', label: 'Fee Status', render: (student) => <Badge variant={String(student.feeStatus || '').toLowerCase() === 'paid' ? 'emerald' : 'amber'}>{text(student.feeStatus, 'Pending')}</Badge> },
    { key: 'actions', label: 'Actions', render: (student) => <div className="flex gap-1"><button type="button" aria-label="Edit student" onClick={() => openEdit(student)} className="rounded-lg p-2 text-muted hover:bg-cream focus-visible:outline-2 focus-visible:outline-primary"><Edit2 className="h-4 w-4" aria-hidden="true" /></button><button type="button" aria-label="Delete student" onClick={() => setDeleting(student)} className="rounded-lg p-2 text-red-600 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-red-600"><Trash2 className="h-4 w-4" aria-hidden="true" /></button></div> },
  ]
  const statItems = [{ id: 'total', label: 'Total', value: String(stats.total ?? rows.length), change: '', trend: '', icon: GraduationCap }, { id: 'active', label: 'Active', value: String(stats.active ?? rows.filter((item) => String(item.status).toLowerCase() === 'active').length), change: '', trend: '', icon: GraduationCap }, { id: 'pending', label: 'Pending', value: String(stats.pending ?? rows.filter((item) => String(item.status).toLowerCase() === 'pending').length), change: '', trend: '', icon: GraduationCap }, { id: 'inactive', label: 'Inactive', value: String(stats.inactive ?? rows.filter((item) => String(item.status).toLowerCase() === 'inactive').length), change: '', trend: '', icon: GraduationCap }]

  return <div className="mx-auto max-w-7xl space-y-6"><PageHeader title="Students" subtitle="Manage enrollment and student records." actionLabel="Add Student" onAction={openCreate} /><StatSummary items={statItems} /><FilterBar search={search} onSearch={setSearch} filters={[{ key: 'status', label: 'Status', value: status, onChange: setStatus, options: ['active', 'pending', 'inactive'] }, { key: 'class', label: 'Class', value: classId, onChange: setClassId, options: classes.map((item) => ({ value: item.id, label: item.name || item.title })) }, { key: 'sort', label: 'Sort', value: sort, onChange: setSort, options: [{ value: 'name', label: 'Name' }, { value: 'date', label: 'Newest' }] }]} /><DataTable columns={columns} data={filtered} loading={loading} error={error} onRetry={reload} renderMobile={(student) => <div className="rounded-xl border border-stone-200 p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{student.fullName || student.name}</p><p className="text-xs text-muted">{student.className || student.class?.name || '—'} · {formatDate(student.enrollmentDate)}</p></div><Badge variant={statusVariant[String(student.status || '').toLowerCase()] || 'muted'} dot>{student.status || 'Inactive'}</Badge></div></div>} /><Modal open={open} title={editing ? 'Edit Student' : 'Add Student'} onClose={() => { setEditing(null); setOpen(false); setForm(initialForm) }}><form onSubmit={save} className="grid gap-4 sm:grid-cols-2"><FormField label="First name" required value={form.firstName} onChange={(event) => setField('firstName', event.target.value)} /><FormField label="Last name" required value={form.lastName} onChange={(event) => setField('lastName', event.target.value)} /><FormField label="Email" type="email" value={form.email} onChange={(event) => setField('email', event.target.value)} /><FormField label="Phone" value={form.phone} onChange={(event) => setField('phone', event.target.value)} /><FormField label="Date of birth" type="date" value={form.dateOfBirth} onChange={(event) => setField('dateOfBirth', event.target.value)} /><FormField label="Gender" as="select" value={form.gender} onChange={(event) => setField('gender', event.target.value)}><option value="">Select gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></FormField><FormField label="Class" as="select" value={form.classId} onChange={(event) => setField('classId', event.target.value)}><option value="">Select class</option>{classes.map((item) => <option key={item.id} value={item.id}>{item.name || item.title}</option>)}</FormField><FormField label="Section" value={form.section} onChange={(event) => setField('section', event.target.value)} /><FormField label="Guardian name" value={form.guardianName} onChange={(event) => setField('guardianName', event.target.value)} /><FormField label="Guardian phone" value={form.guardianPhone} onChange={(event) => setField('guardianPhone', event.target.value)} /><FormField label="Blood group" value={form.bloodGroup} onChange={(event) => setField('bloodGroup', event.target.value)} /><FormField label="Status" as="select" value={form.status} onChange={(event) => setField('status', event.target.value)}><option value="active">Active</option><option value="pending">Pending</option><option value="inactive">Inactive</option></FormField><FormField label="Address" as="textarea" className="sm:col-span-2" value={form.address} onChange={(event) => setField('address', event.target.value)} />{formError ? <p className="text-sm text-red-600 sm:col-span-2">{formError}</p> : null}<div className="flex justify-end gap-3 sm:col-span-2"><button type="button" onClick={() => { setEditing(null); setOpen(false); setForm(initialForm) }} className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-semibold">Cancel</button><button disabled={saving} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? 'Saving...' : 'Save student'}</button></div></form></Modal><ConfirmDialog open={Boolean(deleting)} onCancel={() => setDeleting(null)} onConfirm={confirmDelete} /></div>
}
