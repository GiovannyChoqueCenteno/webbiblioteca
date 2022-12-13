import React, { useState } from 'react'
import svgwave from '../../../assets/wave.svg';
import RenderStep from './components/RenderStep';

const Login = () => {
  
  const [step, setstep] = useState(0);

  return (
    <div className={"flex h-screen justify-center items-center"}>
      <div style={{ width: 450, minHeight: 360 }} className={"relative rounded-md shadow-2xl bg-white overflow-hidden"} >
        <div>
          <ul className="steps w-full py-2">
            <li data-content={step > 0 ? "✓" : ""} className="step step-primary">Login</li>
            <li data-content={step > 1 ? "✓" : ""} className="step step-primary">Face Validation</li>
          </ul>
        </div>
        <div>
          <RenderStep step={step} setstep={setstep} />
        </div>
        <div className='w-full drop-shadow-2xl mt-1'>
          <img className={"object-cover h-20 w-full "} src={svgwave} alt="svg image" />
        </div>
      </div>
    </div>
  )
}

export default Login