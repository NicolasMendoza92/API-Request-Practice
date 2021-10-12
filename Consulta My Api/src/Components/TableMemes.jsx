
import { Table, Button } from 'react-bootstrap';

export default function TableMemes({ memes}) {

    const eraseMeme = (meme) => {
        
        const memeEncontrado = memes.find((m) => m.id === meme.id);
        console.log(memeEncontrado);

        // localStorage.removeItem('memeId');
    };

    return (
        <Table striped bordered hover variant="dark">
            <tbody>
                {memes.length === [] ? 'no hay memes colgados' :
                    memes.map((meme, i) => (
                        <tr key={i}>
                            <td><img src={meme.image} alt="" style={{ width: '18rem' }} /></td>
                            <td>{meme.title}</td>
                            <td> <Button onClick={eraseMeme} className="btn-danger">Borrar</Button> </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
}


