export function Card({ className = '', ...props }) {
    const { children, ...rest } = props
    return (
      <div className={`rounded-2xl border bg-white ${className}`} {...rest}>
        {children}
      </div>
    )
  }
  
  export function CardContent({ className = '', ...props }) {
    const { children, ...rest } = props
    return (
      <div className={`p-6 ${className}`} {...rest}>
        {children}
      </div>
    )
  }