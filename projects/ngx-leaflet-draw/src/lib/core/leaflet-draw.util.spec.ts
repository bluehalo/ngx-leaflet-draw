import { LeafletDrawUtil } from './leaflet-draw.util';


describe('LeafletDrawUtil', () => {

	describe('deepLiteralCopy', () => {

		it('should return dest unchanged when src is null', () => {
			const dest = { a: 'original' };
			const result = LeafletDrawUtil.deepLiteralCopy(dest, null);
			expect(result).toBe(dest);
			expect(result.a).toBe('original');
		});

		it('should return dest unchanged when dest is null', () => {
			const result = LeafletDrawUtil.deepLiteralCopy(null, { a: 'value' });
			expect(result).toBeNull();
		});

		it('should copy string values from src into dest', () => {
			const dest: any = {};
			LeafletDrawUtil.deepLiteralCopy(dest, { label: 'Draw', tooltip: 'Click to draw' });
			expect(dest.label).toBe('Draw');
			expect(dest.tooltip).toBe('Click to draw');
		});

		it('should not copy non-string values directly (only recurses into them)', () => {
			const dest: any = { count: 0 };
			LeafletDrawUtil.deepLiteralCopy(dest, { count: 42 });
			// count is a number, not a string — should not be copied
			expect(dest.count).toBe(0);
		});

		it('should recursively copy nested string values', () => {
			const dest: any = { draw: { handlers: { polygon: { tooltip: { start: '' } } } } };
			const src = { draw: { handlers: { polygon: { tooltip: { start: 'Click to start' } } } } };
			LeafletDrawUtil.deepLiteralCopy(dest, src);
			expect(dest.draw.handlers.polygon.tooltip.start).toBe('Click to start');
		});

		it('should not copy inherited properties from src', () => {
			const proto = { inherited: 'should-not-copy' };
			const src = Object.create(proto);
			src.own = 'should-copy';
			const dest: any = {};
			LeafletDrawUtil.deepLiteralCopy(dest, src);
			expect(dest.own).toBe('should-copy');
			expect(dest.inherited).toBeUndefined();
		});

	});

});
