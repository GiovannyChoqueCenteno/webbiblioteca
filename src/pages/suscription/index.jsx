import React, { useEffect, useState } from 'react'

import day from '../../assets/day.png';
import month from '../../assets/month.png';
import year from '../../assets/year.png';
import wave from '../../assets/wave.svg';
import Payment from '../../components/payment';
import Modal from '../../components/modal';
import useSuscription from '../../hooks/useSuscription';

const SuscriptionImage = new Map();
SuscriptionImage.set("Day", day);
SuscriptionImage.set("Month", month);
SuscriptionImage.set("Year", year);

const Suscription = () => {

    const [monto, setmonto] = useState(0);
    const [suscription, setsuscription] = useState(null);
    const [idSuscription, setidSuscription] = useState(null);
    const { getAll } = useSuscription();

    useEffect(() => {
        getAll()
            .then((data) => setsuscription(data))
            .catch((error) => {
                console.log(error);
                setsuscription([]);
            })
    }, []);

    function OnModal(monto, id) {
        setmonto(monto);
        setidSuscription(id)
        let modal = document.getElementById("payment").parentElement.children[1];
        modal.checked = true;
    }

    return (
        <div className={"h-screen flex justify-center items-center flex-wrap "}>

            <Modal
                modalId={"payment"}
            >
                <Payment monto={monto} idSuscription={idSuscription} />
            </Modal>

            {
                (suscription == null) && <div className="radial-progress" style={{ "--value": 100 }}></div>
            }

            {
                (suscription != null) && (
                    suscription.map((suscription) => (
                        <div key={suscription._id} style={{ minHeight: 400 }} className="card w-96 bg-base-100 shadow-2xl mx-4 my-2 overflow-auto">
                            <img src={wave} className={"rotate-180"} alt="imagen" />
                            <div className="card-body flex-colum justify-between">
                                <h2 className="text-center font-bold text-4xl block">{suscription.nombre} {suscription.precio}$</h2>
                                <div>
                                    <img style={{ height: 120 }} src={SuscriptionImage.get(suscription.nombre)} alt="imagen" className='mx-auto' />
                                </div>
                                <div className="card-actions justify-end">
                                    <button onClick={() => OnModal(suscription.precio,suscription._id)} className="btn btn-primary w-full">Buy Now</button>
                                </div>
                            </div>
                            <img src={wave} alt="imagen" />
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Suscription