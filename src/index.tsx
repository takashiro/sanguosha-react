import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

import App from './App';

interface Linguist {
	messages: Record<string, string>;
}

declare global {
	interface Window {
		linguist: Linguist;
	}
}

ReactDOM.render(
	<IntlProvider locale={navigator.language} messages={window.linguist.messages}>
		<App />
	</IntlProvider>,
	document.getElementById('app-container'),
);
