import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

import "./FloatingAddButton.css";

type Props = {
	onClick: () => void;
};

export default function FloatingAddButton({ onClick }: Props) {
	return (
		<IonFab className="app-fab" slot="fixed" vertical="bottom" horizontal="end">
			<IonFabButton onClick={onClick}>
				<IonIcon icon={add} />
			</IonFabButton>
		</IonFab>
	);
}