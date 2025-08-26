export function Button({ variant = 'default', className = '', ...props }) {
    const { children, ...rest } = props
    const base =
      'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition'
    const styles =
      variant === 'outline'
        ? 'border bg-white hover:bg-gray-50'
        : 'bg-black text-white hover:opacity-90'
    return (
      <button className={`${base} ${styles} ${className}`} {...rest}>
        {children}
      </button>
    )
  }