import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const DelJatekos =()=> {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.playerId;
    const [showModal, setShowModal] = useState(false);
    const [hiba, setHiba] = useState(null);
    const [player, setPlayer] = useState({});
    useEffect(()=> {
        axios
        .get(`https://darts.sulla.hu/darts/${id}`)
        .then((res)=> setPlayer(res.data))
        .catch((error)=>{
            setHiba(error);
            console.error("Hiba: ", hiba);
        })
    },[id]);
    return (
  <>
    <div className="container-fluid p-5 fadeIn">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <h2 className="mb-4 text-danger">Játékos törlése</h2>
          <div className="card p-4 shadow-sm border-danger">
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
                  Profil link
                </Link>
              </div>

              <div className="mb-4">
                <Link to={"/"}>
                  <img
                    alt={player.name}
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: 400, objectFit: "cover" }}
                    src={player.image_url || "https://placehold.co/400x800"}
                  />
                </Link>
              </div>

              <div className="d-flex justify-content-center align-items-center gap-4 pt-3 border-top w-100">
                <Link to={"/"} title="Vissza">
                  <i className="bi bi-arrow-return-left fs-4"></i>
                </Link>
                <Link to={"/mod-player/" + player.id} title="Módosítás">
                  <i className="bi bi-pencil fs-4"></i>
                </Link>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    axios
                      .delete(`https://darts.sulla.hu/darts/${id}`)
                      .then(() => setShowModal(true))
                      .catch((error) => {
                        setHiba(error);
                        console.error("Hiba: ", error);
                      });
                  }}
                >
                  <button type="submit" className="btn btn-danger">
                    <i className="bi bi-trash3 me-2"></i>Törlés
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {showModal && (
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Sikeres törlés!</h5>
            </div>
            <div className="modal-body text-center">
              A sakkozó adatait sikeresen töröltük!
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => navigate("/")}
              >
                Rendben
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

}