import { CatAtlas, BREEDS } from 'ims-cat-atlas';
import { useState } from 'react';

export default () => {
  const [breedId, setBreedId] = useState(BREEDS[0].id);
  const breed = BREEDS.find((b) => b.id === breedId)!;

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {BREEDS.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setBreedId(b.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: b.id === breedId ? '2px solid #1677ff' : '1px solid #d9d9d9',
              background: b.id === breedId ? '#e6f4ff' : '#fff',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: b.id === breedId ? 600 : 400,
            }}
          >
            {b.name}
          </button>
        ))}
      </div>
      <div style={{ height: 480, borderRadius: 12, overflow: 'hidden', border: '1px solid #e8e8e8' }}>
        <CatAtlas breed={breed} />
      </div>
      <div style={{ marginTop: 12, color: '#666', fontSize: 13 }}>
        <strong>{breed.name}</strong>（{breed.nameEn}）— {breed.tagline}
      </div>
    </div>
  );
};
