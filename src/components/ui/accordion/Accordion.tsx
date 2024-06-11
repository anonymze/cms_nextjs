import React from 'react'
import './Accordion.css';

interface  Props extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
    title: string,
    name: string,
    children: React.ReactNode,
}

export function Accordion({title, name, children, ...props }: Props) {
  return (
    <details name={name} {...props}>
        <summary>{ title }</summary>
        {children}
    </details>
  )
}
