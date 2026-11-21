import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const EgyJatekos = () => {
    const params = useParams();
    const id = params.playerId;
    const [player, setPlayer] = useState({});
    const [tolt, setTolt] = useState(false);
    const [hiba, setHiba] = useState(null);
      useEffect(()=> {
        setTolt(true);
        axios
        .get(`https://darts.sulla.hu/darts/${id}`)
        .then((res) => setPlayer(res.data))
        .catch((error) =>{
            setHiba(error);
            console.error("Hiba: ", hiba)})
        .finally(()=> setTolt(false));
        },[]);
return (
    <div className="container-fluid p-5 fadeIn">
  {tolt ? (
    <div className="spinner-border text-warning" role="status"></div>
  ) : (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <h2 className="mb-4">Játékos adatai</h2>
        <div className="card p-4 shadow-sm">
          <div className="card-body d-flex flex-column align-items-center">
            <p className="text-muted mb-1">Játékos neve:</p>
            <h3 className="card-title mb-3">{player.name}</h3>

            <p className="lead mb-1">Születési ideje: {player.birth_date}</p>
            <p className="lead mb-3">
              Megnyert világbajnokságai: {player.world_ch_won}
            </p>

            <div className="mb-4">
              <Link
                to={player.profile_url}
                className="btn btn-primary"
                target="_blank"
              >
                <i className="bi bi-person-square me-1"></i> Profil link
              </Link>
            </div>

            <div className="mb-4">
                <img
                  alt={player.name}
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: 400, objectFit: "cover" }}
                  src={player.image_url || "https://placehold.co/400x800"}
                />
            </div>

            <div className="d-flex justify-content-center gap-4 pt-2 border-top w-100">
              <Link to={"/"} title="Vissza">
                <i className="bi bi-arrow-return-left fs-4"></i>
              </Link>
              <Link to={"/mod-player/" + player.id} title="Módosítás">
                <i className="bi bi-pencil fs-4"></i>
              </Link>
              <Link to={"/del-player/" + player.id} title="Törlés">
                <i className="bi bi-trash3 fs-4 text-danger"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

);
};