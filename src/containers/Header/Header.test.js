import React from 'react';
import { Header } from './Header';
import { renderWithRouter } from '../../misc/tools/util';

describe('Header', () => {

    it('finds a hidden navigation menu', () => {
        const { getByRole } = renderWithRouter(<Header signedIn />);
        const menu = getByRole('navigation');
        expect(menu).toBeInTheDocument();
        expect(menu).toHaveClass('-hidden');
    });

    it('finds a logo with an alt text', () => {
        const { getByAltText } = renderWithRouter(<Header signedIn />);

        const menu = getByAltText(/logo/i);
        expect(menu).toBeInTheDocument();
    });

    it('finds a register link', () => {
        const { getByText } = renderWithRouter(<Header signedIn={false} />);
        const link = getByText(/register/i);
        expect(link).toBeInTheDocument();
    });
})