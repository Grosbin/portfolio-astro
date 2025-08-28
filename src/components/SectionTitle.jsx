export default function SectionTitle({ children, className = "" }) {
  return (
    <span 
      className={`bg-gradient-to-r bg-clip-text text-transparent ${className}`}
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #CCCCCC 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}
    >
      {children}
    </span>
  );
}