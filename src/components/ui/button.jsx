export function Button({ variant = 'default', className = '', isDarkMode = false, ...props }) {
    const { children, ...rest } = props
    const base =
      'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition'
                    const styles =
                  variant === 'outline'
                    ? `border ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-200' : 'bg-gray-700 hover:bg-gray-600 border-gray-700 text-white'}`
                    : `${isDarkMode ? 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100' : 'bg-gray-700 text-white border border-gray-700 hover:bg-gray-600'}`
    return (
      <button className={`${base} ${styles} ${className}`} {...rest}>
        {children}
      </button>
    )
  }