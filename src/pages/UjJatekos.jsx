import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const UjJatekos = () => {
    const navigate =useNavigate();
    const [showModal, setShowModal] = useState(false);
const kuldesKezelo = async(event) => {
 event.preventDefault();
 try {
    await axios.post("https://darts.sulla.hu/darts", {
        name: event.target.elements.name.value,
        birth_date: event.target.elements.birth_date.value,
        world_ch_won: event.target.elements.world_ch_won.value,
        profile_url: event.target.elements.profile_url.value,
        image_url: event.target.elements.image_url.value
    });
    setShowModal(true);
 }
 catch(error) {console.log(error);}
};
    return (
  <>
    <div className="container-fluid p-5 fadeIn">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-7">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Új játékos felvitele</h2>
            <form onSubmit={kuldesKezelo}>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-4 col-form-label fw-bold text-sm-end">
                  Játékos neve:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Pl. Phil Taylor"
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
                    className="form-control"
                    min="0"
                    defaultValue="0"
                    required
                  />
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <label className="col-sm-4 col-form-label fw-bold text-sm-end">
                  Profil URL-je:
                </label>
                <div className="col-sm-8">
                  <input
                    type="url"
                    name="profile_url"
                    className="form-control"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="row mb-4 align-items-center">
                <label className="col-sm-4 col-form-label fw-bold text-sm-end">
                  Kép URL-je:
                </label>
                <div className="col-sm-8">
                  <input
                    type="url"
                    name="image_url"
                    className="form-control"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center gap-3 pt-2 border-top">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/")}
                >
                  <i className="bi bi-arrow-return-left me-2"></i> Vissza
                </button>
                <button type="submit" className="btn btn-success">
                  <i className="bi bi-plus-square me-2"></i> Mentés
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
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Sikeres létrehozás!</h5>
            </div>
            <div className="modal-body text-center">
              Az új játékos adatait sikeresen létrehoztuk!
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
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