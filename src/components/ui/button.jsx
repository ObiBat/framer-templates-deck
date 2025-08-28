export function Button({ variant = 'default', className = '', isDarkMode = false, ...props }) {
    const { children, ...rest } = props
    const base =
      'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition'
    const styles =
      variant === 'outline'
        ? `border ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-200' : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'}`
        : `${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:opacity-90'}`
    return (
      <button className={`${base} ${styles} ${className}`} {...rest}>
        {children}
      </button>
    )
  }