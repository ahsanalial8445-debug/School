import { useId } from 'react'

export default function FormField({ label, name, value, onChange, error, type = 'text', options, required, placeholder, as = 'input', children, ...rest }) {
  const generatedId = useId()
  const id = name || `field-${generatedId.replace(/:/g, '')}`
  const commonProps = {
    id,
    name,
    value: value ?? '',
    onChange,
    required,
    placeholder,
    ...rest,
    className: `mt-2 w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-800 dark:text-cream ${error ? 'border-red-400' : 'border-stone-200'}`,
  }

  return <div className="block text-sm font-medium text-charcoal dark:text-cream">
    {label ? <label htmlFor={id}>{label}</label> : null}
    {as === 'textarea' ? <textarea {...commonProps}>{children}</textarea> : as === 'select' ? <select {...commonProps}>{options?.map((option) => <option key={option.value ?? option} value={option.value ?? option}>{option.label ?? option}</option>)}{children}</select> : <input {...commonProps} type={type} />}
    {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
  </div>
}
