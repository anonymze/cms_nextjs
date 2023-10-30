import React from 'react'

type Props = {
    file: File
}

const ImageOperation: React.FC<Props> = ({ file }) => {
    const fileReader = new FileReader();

  return (
    <figure>
        <img src="" alt="ok" />
        <figcaption>Bonjour</figcaption>
    </figure>
  )
}

export default ImageOperation