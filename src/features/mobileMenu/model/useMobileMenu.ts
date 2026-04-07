'use client';

import { useCallback, useState } from 'react';
import {
	trackMobileMenuClose,
	trackMobileMenuOpen,
} from '@/shared/lib/analytics';

export type MobileMenuCloseReason =
	| 'backdrop'
	| 'escape'
	| 'close_button'
	| 'item_navigate'
	| 'language_change';

export function useMobileMenu() {
	const [isOpen, setIsOpen] = useState(false);

	const openMenu = useCallback(() => {
		trackMobileMenuOpen();
		setIsOpen(true);
	}, []);

	const closeMenu = useCallback((reason: MobileMenuCloseReason) => {
		trackMobileMenuClose(reason);
		setIsOpen(false);
	}, []);

	return {
		isOpen,
		openMenu,
		closeMenu,
	};
}
