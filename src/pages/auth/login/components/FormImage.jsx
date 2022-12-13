import React, { useState, useRef, useCallback, useContext } from 'react'
import { Animated } from 'react-animated-css'
import Webcam from "react-webcam";
import perfil from '../../../../assets/perfil.png';
import { usuarioContext } from '../../../../context/usuarioContext';
import { dataURItoBlob } from '../../../../helpers/helper';

const videoConstraints = {
    facingMode: "user"
};

const FormImage = () => {

    const { compareFace, state } = useContext(usuarioContext);

    const [play, setPlay] = useState(false);
    const webcamRef = useRef(null);
    const imageRef = useRef(null);
    const [file, setfile] = useState(null);


    const capture = useCallback(() => {
        setPlay((p) => !p);
        const imageSrc = webcamRef.current.getScreenshot();
        imageRef.current.src = imageSrc;
        const customfile = new File([dataURItoBlob(imageSrc)], `${new Date().getTime()}.png`, {
            type: "image/png"
        });
        setfile(customfile);
    }, [webcamRef]);

    const toogleCamera = () => {
        setfile(null);
        imageRef.current.src = perfil;
        setPlay(!play)
    }

    const OnSubmit = (e) => {
        e.preventDefault();
        let fileCompare = null;
        const { file: fileInput } = Object.fromEntries(new FormData(e.target));

        if (fileInput.size == 0 && file == null) {
            alert("Falta una imagen para la validacion!!!");
            return;
        }

        if (file == null) {
            fileCompare = fileInput;
        } else {
            fileCompare = file;
        }

        compareFace(fileCompare, state.perfil, (ok, message) => {

            if (!ok && message.length > 0) {
                alert(message);
                return;
            }

            if (!ok) console.log("Error Server Fails");

        });
    }

    return (
        <Animated animationIn="bounceInRight" animationInDuration={1000} isVisible={true}>
            <div>

                <div className='flex justify-center' style={{ height: 200 }}>
                    {play &&
                        (
                            <div className={"rounded-xl overflow-hidden"}>
                                <Webcam
                                    audio={false}
                                    height={300}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width={300}
                                    videoConstraints={videoConstraints}
                                />
                            </div>
                        )
                    }

                    <div className={`${play ? "hidden" : "block"}`}>
                        <img height={300} ref={imageRef} src={perfil} alt={"image"} className={"h-full rounded-xl overflow-hidden "} />
                    </div>
                </div>

                <div className={"px-5 text-center mt-1"}>
                    {play && <button onClick={capture} className="btn btn-xs">Capture</button>}
                </div>

                <form onSubmit={OnSubmit} className={"p-2"}>
                    <div className={"px-5"}>
                        <label className="label">
                            <small className="label-text">Image Perfile</small>
                        </label>
                        <div className={"grid grid-cols-4 gap-3 text-center"}>
                            <input
                                name={"file"}
                                type="file"
                                className="file-input file-input-sm col-span-3"
                                accept={"image/*"}
                            />
                            <div>
                                <label className="label">
                                    <small className="label-text">camara</small>
                                    <input type="checkbox" onChange={toogleCamera} checked={play} className="checkbox" />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={"px-4 mt-3"}>
                        <button className="btn  btn-sm btn-primary">Login</button>
                    </div>

                </form>

            </div>
        </Animated>
    )
}

export default FormImage