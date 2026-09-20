import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { BREEDS, FUR_PRESETS, type Breed } from './data/breeds';
import { CatScene } from './components/CatScene';
import './App.css';

export default function App() {
  const [breed, setBreed] = useState<Breed>(BREEDS[0]);
  const [furColor, setFurColor] = useState(BREEDS[0].fur);
  const [accentColor, setAccentColor] = useState(BREEDS[0].accent);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    setFurColor(breed.fur);
    setAccentColor(breed.accent);
    gsap.fromTo(
      '.info-panel, .brand-block',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' },
    );
  }, [breed.id]);

  return (
    <div className="app">
      <CatScene
        breed={breed}
        furColor={furColor}
        accentColor={accentColor}
        autoRotate={autoRotate}
      />

      <header className="brand-block">
        <p className="brand">Cat Atlas</p>
        <h1>{breed.name}</h1>
        <p className="tagline">{breed.tagline}</p>
      </header>

      <aside className="panel left-panel">
        <h2>品种</h2>
        <ul className="breed-list">
          {BREEDS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={item.id === breed.id ? 'active' : ''}
                onClick={() => setBreed(item)}
              >
                <span
                  className="swatch"
                  style={{
                    background: `linear-gradient(135deg, ${item.fur}, ${item.accent})`,
                  }}
                />
                <span className="breed-meta">
                  <strong>{item.name}</strong>
                  <em>{item.nameEn}</em>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <aside className="panel right-panel info-panel">
        <h2>毛色</h2>
        <div className="color-list">
          {FUR_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`color-item${furColor === preset.color ? ' active' : ''}`}
              style={{ background: preset.color }}
              title={preset.label}
              aria-label={preset.label}
              onClick={() => setFurColor(preset.color)}
            />
          ))}
        </div>

        <h2 className="mt">重点色</h2>
        <div className="color-list">
          {FUR_PRESETS.map((preset) => (
            <button
              key={`accent-${preset.id}`}
              type="button"
              className={`color-item${accentColor === preset.color ? ' active' : ''}`}
              style={{ background: preset.color }}
              title={preset.label}
              aria-label={`重点色 ${preset.label}`}
              onClick={() => setAccentColor(preset.color)}
            />
          ))}
        </div>

        <div className="breed-card">
          <p className="origin">{breed.origin}</p>
          <p className="desc">{breed.description}</p>
          <div className="tags">
            {breed.temperament.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        <label className="toggle">
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={(e) => setAutoRotate(e.target.checked)}
          />
          自动旋转
        </label>
      </aside>

      <footer className="hint">拖拽旋转 · 滚轮缩放 · 左侧切换品种 · 右侧调毛色</footer>
    </div>
  );
}
