import React, { memo, useContext, useRef } from 'react'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { apiServiceSuscription } from '../../api/apiServiceSuscription';
import { usuarioContext } from '../../context/usuarioContext';

const ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            letterSpacing: '0.025em',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

const Payment = (props) => {

    const { monto, idSuscription } = props;

    const { state } = useContext(usuarioContext);
    const refIcon = useRef(null);
    const elements = useElements();
    const stripe = useStripe();

    const OnSumit = async (e) => {
        e.preventDefault();
        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardNumberElement)
            });

            if (error) {
                console.log(error);
                return;
            }

            elements.getElement(CardNumberElement).clear();
            elements.getElement(CardExpiryElement).clear();
            elements.getElement(CardCvcElement).clear();

            const body = {
                id: paymentMethod.id,
                suscriptorId: state.id,
                suscriptionId: idSuscription
            }

            let { data } = await apiServiceSuscription.post(`/suscriptor`, body);

            if (!data.ok) {
                console.log(data);
                refIcon.current.classList.remove("hidden", "bg-red-500", "bg-green-500", "text-white");
                refIcon.current.classList.add("text-red-500");
                refIcon.current.textContent = data.message;
                setTimeout(() => {
                    refIcon.current.classList.add("hidden");
                }, 2000);
                return;
            }

            refIcon.current.classList.remove("hidden", "text-red-500");
            refIcon.current.classList.add("bg-green-500", "text-white");
            refIcon.current.textContent = "✓";
            setTimeout(() => {
                refIcon.current.classList.add("hidden");
            }, 2000);

        } catch (error) {
            console.log("Server Stripe :" + error);
            refIcon.current.classList.remove("hidden", "text-red-500");
            refIcon.current.classList.add("text-white", "bg-red-500");
            refIcon.current.textContent = "✕";
            setTimeout(() => {
                refIcon.current.classList.add("hidden");
            }, 2000);
        }
    }

    return (
        <form onSubmit={OnSumit} className={"p-5 bg-white"} >
            <img className={"mx-auto"} style={{ height: 100 }} src="https://cdn-icons-png.flaticon.com/512/5968/5968382.png" alt="sdsd" />
            <div className={"text-center"}>
                <span ref={refIcon} className={"hidden rounded-full px-3 py-1 text-2x"}>✓</span>
            </div>

            <div className={"p-2 my-2 shadow-md rounded-md"}>
                <label htmlFor="cardNumber">Card Number</label>
                <CardNumberElement
                    id="cardNumber"
                    required
                    options={ELEMENT_OPTIONS}
                />
            </div>


            <div className={"flex my-2"}>

                <div className={"flex-grow"}>
                    <div className={"p-2 mr-2 shadow-md rounded-md "}>
                        <label htmlFor="expiry">Card Expiration</label>
                        <CardExpiryElement
                            id="expiry"
                            required
                            options={ELEMENT_OPTIONS}
                        />
                    </div>
                </div>

                <div className={"flex-grow"}>
                    <div className={"p-2 ml-2 shadow-md rounded-md "}>
                        <label htmlFor="cvc">CVC</label>
                        <CardCvcElement
                            id="cvc"
                            required
                            options={ELEMENT_OPTIONS}
                        />
                    </div>
                </div>

            </div>
            <button className={"btn btn-primary w-full mt-2"}>Pagar {monto}$</button>
        </form>
    )

}

export default memo(Payment) 