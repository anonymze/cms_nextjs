import React, { type PropsWithChildren } from 'react'

type Props = {

}

const MediaOperation: React.FC<PropsWithChildren<Props>> = ({ children }) => {
    const fileReader = new FileReader();

  return (
    <figure>
        {children}
        <figcaption>Bonjour</figcaption>
    </figure>
  )
}

export default MediaOperation 