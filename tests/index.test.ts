import { BREEDS, FUR_PRESETS } from 'ims-cat-atlas';

test('breeds catalog', () => {
  expect(BREEDS.length).toBeGreaterThanOrEqual(6);
  expect(BREEDS.some((b) => b.id === 'ragdoll')).toBe(true);
  expect(BREEDS.some((b) => b.id === 'golden')).toBe(true);
});

test('fur presets', () => {
  expect(FUR_PRESETS.length).toBeGreaterThan(0);
  expect(FUR_PRESETS[0]).toHaveProperty('color');
});
