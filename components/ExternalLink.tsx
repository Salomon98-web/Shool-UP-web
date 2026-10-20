"use client"
import { useEffect } from 'react'

useEffect(() => {
  const handler = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;

    // Si le lien ne commence pas par /lite et va vers schoolup.net
    if (href.startsWith('https://schoolup.net') && !href.includes('/lite')) {
      e.preventDefault();
      window.open(href, '_blank');
    }
    if (href === '/' || (href.startsWith('/') && !href.startsWith('/lite'))) {
      e.preventDefault();
      window.open(`https://schoolup.net${href}`, '_blank');
    }
  }
  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler);
}, [])