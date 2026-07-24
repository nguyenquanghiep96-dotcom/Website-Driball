import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function ScrollReveal({ children, className = '', delay = 0, as: Tag = 'div', ...props }) {
  const ref = useScrollReveal();
  const delayClass = delay > 0 ? ` scroll-reveal-delay-${delay}` : '';

  return (
    <Tag ref={ref} className={`scroll-reveal${delayClass} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
