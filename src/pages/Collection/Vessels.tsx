import { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import FloatingAddButton from "../../components/FloatingAddButton";
import {
  createVessel,
  getVessels,
  type Vessel,
} from "../../data/repositories/VesselsRepository";

export default function Vessels() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadVessels() {
    const data = await getVessels();
    setVessels(data);
    setIsLoading(false);
  }

  async function handleAddVessel() {
    await createVessel({
      name: `Vessel #${vessels.length + 1}`,
      type: "Glass carboy",
      volumeLiters: 5,
    });

    await loadVessels();
  }

  useEffect(() => {
    loadVessels();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Vessels</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <main className="page">
          <header className="page-header">
            <div>
              <p>
                {isLoading
                  ? "Loading vessels..."
                  : `${vessels.length} vessels in your cellar`}
              </p>
            </div>
          </header>

          <section className="card-list">
            {vessels.map((vessel) => (
              <article key={vessel.id} className="card">
                <div className="card-main">
                  <div>
                    <h2>{vessel.name}</h2>
                    <p>
                      {vessel.type} · {vessel.volumeLiters}L
                    </p>
                  </div>

                  <span className="badge">Empty</span>
                </div>

                <div className="vessel-content">
                  <p>
                    <strong>NFC:</strong> {vessel.nfcTagId ?? "No tag linked"}
                  </p>
                  <p>
                    <strong>Sync:</strong> {vessel.syncStatus}
                  </p>
                </div>

                <div className="vessel-actions">
                  <button>Assign recipe</button>
                  <button>Scan NFC tag</button>
                  <button className="danger">Delete</button>
                </div>
              </article>
            ))}
          </section>

          <FloatingAddButton onClick={handleAddVessel} />
        </main>
      </IonContent>
    </IonPage>
  );
}
