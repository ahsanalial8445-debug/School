import Modal from './Modal'

export default function ConfirmDialog({ open, title = 'Confirm deletion', message = 'This action cannot be undone.', onCancel, onConfirm, loading = false }) {
  return <Modal open={open} title={title} onClose={onCancel} footer={<><button type="button" onClick={onCancel} className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-semibold text-charcoal focus-visible:outline-2 focus-visible:outline-primary">Cancel</button><button type="button" onClick={onConfirm} disabled={loading} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-60">{loading ? 'Deleting...' : 'Delete'}</button></>}>
    <p className="text-sm text-muted">{message}</p>
  </Modal>
}
