import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const JatekosLista = () => {
    const [jatekosok, setJatekosok] = useState([]);
    const [tolt, setTolt] = useState(false);
    const [hiba, setHiba] = useState(null);

    useEffect(()=> {
        setTolt(true);
        axios
        .get("https://darts.sulla.hu/darts")
        .then((res) => setJatekosok(res.data))
        .catch((error) =>{
            setHiba(error);
            console.error("Hiba: ", hiba)})
        .finally(()=> setTolt(false));
        },[]);
return (
    <div className="container-fluid p-3 fadeIn">
  {tolt ? (
    <div className="spinner-border text-primary" role="status"></div>
  ) : (
    <>
      <h2 className="mb-4">Darts játékosok</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {jatekosok.map((jatekos, index) => (
          <div className="col" key={jatekos.id || index}>
            <div className="card h-100 p-2 shadow-sm">
              <div className="card-body d-flex flex-column">
                <p className="text-dark fw-bold">Játékos neve:</p>
                <h3>{jatekos.name}</h3>
                <p className="text-secondary mb-1">Születési ideje: {jatekos.birth_date}</p>
                <p className="text-secondary">Megnyert világbajnokságai: {jatekos.world_ch_won}</p>

                <div className="my-2">
                  <Link
                    to={jatekos.profile_url}
                    className="btn btn-primary"
                    target="_blank"
                  >
                    <i className="bi bi-person-square me-1"></i> Profil link
                  </Link>
                </div>

                <div className="my-2">
                  <Link to={"/player/" + jatekos.id}>
                    <img
                      alt={jatekos.name}
                      className="img-fluid rounded"
                      style={{ maxHeight: 160, objectFit: "cover" }}
                      src={jatekos.image_url || "https://placehold.co/400x800"}
                    />
                  </Link>
                </div>

                {/* Az mt-auto mindig a kártya aljára tolja az ikonokat */}
                <div className="mt-auto pt-2">
                  <Link to={"/player/" + jatekos.id}>
                    <i className="bi bi-eye fs-5 me-3"></i>
                  </Link>
                  <Link to={"/mod-player/" + jatekos.id}>
                    <i className="bi bi-pencil fs-5 me-3"></i>
                  </Link>
                  <Link to={"/del-player/" + jatekos.id}>
                    <i className="bi bi-trash3 fs-5"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )}
</div>
);
};