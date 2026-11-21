import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const ModJatekos = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.playerId;
    const [showModal, setShowModal] = useState(false);
    const [hiba, setHiba] = useState(null);
    const [player, setPlayer] = useState({
        name: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });
    useEffect(()=>{
        const adatokLehivasa = async() => {
            try {
                const valasz = await axios.get(`https://darts.sulla.hu/darts/${id}`);
                setPlayer(valasz.data);
            }
            catch(error) {
                setHiba(error);
                console.error("Hiba: ", hiba);
            }
        };
        adatokLehivasa();
    },[id]);
    const valtozasKezelo = (event) => {
        const { name, value } = event.target;
        setPlayer(prevState => ({
            ...prevState,
            [name] : value
        }));
    };
    const kuldesKezelo = async(event)  => {
        event.preventDefault();
        try {
            await axios.put(`https://darts.sulla.hu/darts/${id}`, player)
            .then(()=> {setShowModal(true);})
        }
        catch(error) {
            setHiba(error);
            console.error("Hiba: ", hiba);}
    }
    return (
  <>
    <div className="container-fluid p-5 fadeIn">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-7">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Játékos adatainak módosítása</h2>
            <form onSubmit={kuldesKezelo}>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-4 col-form-label fw-bold text-sm-end">
                  Játékos neve:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="name"
                    value={player.name || ""}
                    onChange={valtozasKezelo}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <label className="col-sm-4 col-form-label fw-bold text-sm-end">
                  Születési idő:
                </label>
                <div className="col-sm-8">
                  <input
                    type="date"
                    name="birth_date"
                    value={player.birth_date || ""}
                    onChange={valtozasKezelo}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <label className="col-sm-4 col-form-label fw-bold text-sm-end">
                  Nyert VB-k száma:
                </label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    name="world_ch_won"
                    value={player.world_ch_won ?? ""}
                    onChange={valtozasKezelo}
                    className="form-control"
                    min="0"
                  />
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <label className="col-sm-4 col-form-label fw-bold text-sm-end">
                  Profil URL-je:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="profile_url"
                    value={player.profile_url || ""}
                    onChange={valtozasKezelo}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row mb-4 align-items-center">
                <label className="col-sm-4 col-form-label fw-bold text-sm-end">
                  Kép URL-je:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="image_url"
                    value={player.image_url || ""}
                    onChange={valtozasKezelo}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center gap-3 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/")}
                >
                  <i className="bi bi-arrow-return-left me-2"></i> Vissza
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-save me-2"></i> Mentés
                </button>
              </div>
            </form>
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
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Sikeres módosítás!</h5>
            </div>
            <div className="modal-body text-center">
              A játékos adatait sikeresen módosítottuk!
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
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