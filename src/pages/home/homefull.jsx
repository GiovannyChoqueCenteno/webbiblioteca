import React from 'react'
import { apiLibro } from '../../api/apiLibro'
import Carousel from '../../components/carousel'
import {CiCalculator2} from 'react-icons/ci'
import {SlChemistry,SlBag} from 'react-icons/sl'
import {DiAtom } from 'react-icons/di'
import {BsNut} from 'react-icons/bs'

export const Homefull = ({libros}) => {
  return (
    <>
    <Carousel
        show={4}
        withIndicator
    >
        {libros.map(libro=>(
             <img className='ml-5' src={`${apiLibro.getUri()}${libro.portada}`} />
             )

            )}
    </Carousel>
    <div className='flex flex-col'>
        <div>
        <h3>Temas</h3>
        </div>
        <div className='flex justify-between'>
        <div className='flex flex-col items-center'>
            <DiAtom size={100} />
            <span>Fisica</span>
            </div>
            <div className='flex flex-col items-center'>
            <CiCalculator2 size={100} />
            <span>Matematica</span>
            </div>
            <div className='flex flex-col items-center'>
            <SlChemistry size={100} />
            <span>Quimica</span>
            </div>
            <div className='flex flex-col items-center'>
            <SlBag size={100} />
            <span>Contabilidad</span>
            </div>
            <div className='flex flex-col items-center'>
            <BsNut size={100} />
            <span>Mecanica</span>
            </div>
        </div>
    </div>
    </>
  )
}
