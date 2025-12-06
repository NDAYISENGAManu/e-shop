import { formatPrice, getUniqueValues } from '../helpers';

describe('Helper Functions', () => {
    describe('formatPrice', () => {
        it('should format price correctly', () => {
            expect(formatPrice(12345)).toBe('$123.45');
            expect(formatPrice(100)).toBe('$1.00');
            expect(formatPrice(0)).toBe('$0.00');
        });
    });

    describe('getUniqueValues', () => {
        it('should return unique values including "all"', () => {
            const products = [
                { category: 'office' },
                { category: 'living room' },
                { category: 'kitchen' },
                { category: 'office' },
            ];
            const expected = ['all', 'office', 'living room', 'kitchen'];
            expect(getUniqueValues(products, 'category')).toEqual(expect.arrayContaining(expected));
            expect(getUniqueValues(products, 'category')).toHaveLength(4);
        });
    });
});
