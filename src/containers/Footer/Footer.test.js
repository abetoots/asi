import React from 'react';
import { Footer } from './Footer';
import { renderWithRouter } from '../../misc/tools/util';

describe('Footer', () => {
    it('has a copyright', () => {
        const { getByText } = renderWithRouter(<Footer />);
        const el = getByText(/copyright/i);
        expect(el).toBeVisible();
    })
})
