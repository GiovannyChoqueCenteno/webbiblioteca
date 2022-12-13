import React from 'react'

const PdfLibrp = ({url}) => {
  return (
    <div>
    <Document file={{
        url : url
    }} onLoadSuccess={onDocumentLoadSuccess}     onLoadError={(error) => console.log("Inside Error", error)}
    >
        <Page pageNumber={pageNumber} />
    </Document>
    <p>
        Page {pageNumber} of {numPages}
    </p>
</div>
    )
}

export default PdfLibrp