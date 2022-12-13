import React from 'react'

const Modal = (props) => {

    const { children, modalId, title, openModalText, contentStyle, btnStyle } = props;

    return (
        <div className={contentStyle}>
            <label htmlFor={`#${modalId}`} className={`inline-block cursor-pointer btn-custom rounded-md ${btnStyle}`}>
                {openModalText}
            </label>
            <input type="checkbox" id={`#${modalId}`} className="modal-toggle" />
            <div className="modal" id={modalId}>
                <div className="modal-box text-start">
                    <label htmlFor={`#${modalId}`} className="px-2 cursor-pointer rounded-md bg-theme-primary absolute right-2 top-2">X</label>
                    <h1 className='font-bold'>{title}</h1>
                    <div className='block'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal