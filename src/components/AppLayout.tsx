import { Outlet } from "react-router-dom";
import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { home, book, beer, cube, search } from 'ionicons/icons';
import "./AppLayout.css";

export default function AppLayout() {
	// const [isMenuOpen, setIsMenuOpen] = useState(false);

	// function closeMenu() {
	// 	setIsMenuOpen(false);
	// }

	return (
		// <div className="app-layout">
		//   <button
		//     className="hamburger-button"
		//     onClick={() => setIsMenuOpen(true)}
		//     aria-label="Open menu"
		//   >
		//     ☰
		//   </button>

		//   {isMenuOpen && <div className="backdrop" onClick={closeMenu} />}

		//   <aside className={`side-menu ${isMenuOpen ? "open" : ""}`}>
		//     <div className="side-menu-header">
		//       <h2>Vinology</h2>
		//       <button onClick={closeMenu} aria-label="Close menu">
		//         ×
		//       </button>
		//     </div>

		//     <nav className="side-menu-nav">
		//       <Link to="/" onClick={closeMenu}>Dashboard</Link>
		//       <Link to="/recipes" onClick={closeMenu}>My Recipes</Link>
		//       <Link to="/batches" onClick={closeMenu}>Batches</Link>
		//       <Link to="/vessels" onClick={closeMenu}>Vessels</Link>
		//       <Link to="/explore" onClick={closeMenu}>Explore recipes</Link>
		//     </nav>
		//   </aside>


		// </div>

		<>
			<IonMenu contentId="main-content">
				<IonHeader>
					<IonToolbar>
						<IonTitle>Menu Content</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent className="ion-padding">
					<IonList>
						<IonMenuToggle autoHide={false}>
							<IonItem routerLink="/" detail={false}>
								<IonIcon icon={home} slot="start" />
								<IonLabel>Dashboard</IonLabel>
							</IonItem>
							<IonItem routerLink="/recipes" detail={false}>
								<IonIcon icon={book} slot="start" />
								<IonLabel>My Recipes</IonLabel>
							</IonItem>
							<IonItem routerLink="/batches" detail={false}>
								<IonIcon icon={beer} slot="start" />
								<IonLabel>Batches</IonLabel>
							</IonItem>
							<IonItem routerLink="/vessels" detail={false}>
								<IonIcon icon={cube} slot="start" />
								<IonLabel>Vessels</IonLabel>
							</IonItem>
							<IonItem routerLink="/explore" detail={false}>
								<IonIcon icon={search} slot="start" />
								<IonLabel>Explore recipes</IonLabel>
							</IonItem>
						</IonMenuToggle>
					</IonList>
				</IonContent>
			</IonMenu>
			<IonPage id="main-content">
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonMenuButton></IonMenuButton>
						</IonButtons>
						<IonTitle>Menu</IonTitle>
					</IonToolbar>
				</IonHeader>
				<div className="page-content">
					<Outlet />
				</div>
			</IonPage>
		</>
	);
}