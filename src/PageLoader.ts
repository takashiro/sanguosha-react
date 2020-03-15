import { Client } from '@karuta/client';

import Page from './Page';
import Room from './game/Room';

interface PageLoader {
	page: Page;
	userId?: number;
	client?: Client;
	roomId?: number;
	room?: Room;
}

export default PageLoader;
