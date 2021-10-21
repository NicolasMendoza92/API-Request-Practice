
import {Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { leerDeLocalStorage } from "../utils/localStorage";


const exampleImage = 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'


export default function Perfil({ onChangeImg , user}) {
    const tokenLocal = leerDeLocalStorage('token') || {};

    const history = useHistory ();

    const logOut = () => {
        localStorage.removeItem('token');
        window.location.reload();
        history.push('/login');
    };

    return (
        <div>
            <h2>Perfil</h2>
            <div className="text-center bg-white p-2 my-5 mb-2">
                <div className="d-flex justify-content-center align-items-end ml-4 m-2">
                    <img
                        src={exampleImage}
                        alt="profile"
                        width="200"
                        className="rounded-circle"
                        style={{ border: '2px solid #18809a' }}
                    />
                    <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                        <img
                            src="https://icongr.am/feather/camera.svg?size=128&color=293f8e"
                            alt="camera edit"
                            width="20"
                        />
                    </label>
                    <input id="file-input" className="d-none" accept="image/png, image/jpeg" type="file" onChange={onChangeImg} />
                </div>
                <p>Nombre: {user.name}</p>
            </div>
            <div className="d-flex justify-content-center mx-auto">
                {/* si hay token logeado entonces aparece este boton de cerrar sesion */}
               {tokenLocal.token && <Button onClick={logOut} className="mx-auto btn-secondary mt-4">
                    Cerrar Sesion
                </Button>}
            </div>
        </div>

    );
}
