import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Scene = {
  id: string;
  chapter: string;
  eyebrow: string;
  title: string;
  body: string;
  tone: string;
  accent: string;
  enemy?: boolean;
  special?: 'tree' | 'spires' | 'stars' | 'loop';
};

const scenes: Scene[] = [
  { id: 'arrival', chapter: 'I · Arrival', eyebrow: 'The first step', title: 'Into the dim world.', body: 'A lone wanderer enters a landscape almost without light. Ruins sit at the edge of vision while something enormous watches from the dark.', tone: 'arrival', accent: '#9aa8b7', enemy: true },
  { id: 'tree', chapter: 'II · Revelation', eyebrow: 'Revelation', title: 'Gold against the night.', body: 'The darkness opens into a colossal luminous tree. The traveler becomes tiny by comparison, turning scroll into a reveal of impossible scale.', tone: 'tree', accent: '#e2b857', special: 'tree' },
  { id: 'academy', chapter: 'III · Sorcery', eyebrow: 'Arcane towers', title: 'Moonlit academy.', body: 'Cold blues, crystalline light and gothic spires shift the journey from divine awe to dangerous scholarship.', tone: 'academy', accent: '#9bb7ee', enemy: true, special: 'spires' },
  { id: 'caelid', chapter: 'IV · Decay', eyebrow: 'Scarlet corruption', title: 'The land is sick.', body: 'The palette turns violent. Red spores, warped silhouettes and uneven motion make the environment hostile before the enemy even attacks.', tone: 'caelid', accent: '#d05a41', enemy: true },
  { id: 'capital', chapter: 'V · Ruin', eyebrow: 'Ashen grandeur', title: 'A city buried in gold.', body: 'The pace slows. Monumental architecture, falling ash and pale gold replace aggression with the weight of irreversible ruin.', tone: 'capital', accent: '#d7b56d' },
  { id: 'underground', chapter: 'VI · Descent', eyebrow: 'Beneath the world', title: 'Stars under stone.', body: 'The path drops into blackness and opens into an impossible night sky beneath the earth. Depth becomes the main spectacle.', tone: 'underground', accent: '#9eb7df', special: 'stars' },
  { id: 'shadow', chapter: 'VII · Beyond', eyebrow: 'Beyond the known world', title: 'Into the shadow realm.', body: 'The final region feels unfamiliar even after everything before it. Shapes are stranger, timing is slower, and landmarks are partially hidden.', tone: 'shadow', accent: '#9d86b9', enemy: true },
  { id: 'loop', chapter: 'VIII · Return', eyebrow: 'The cycle closes', title: 'Die. Return. Walk again.', body: 'The final darkness folds back into the opening composition so the journey feels circular rather than finished.', tone: 'loop', accent: '#8794a1', special: 'loop' }
];

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app');

const particleMarkup = (accent: string) => Array.from({ length: 28 }, (_, i) => {
  const left = (i * 37) % 100;
  const delay = -((i * 0.61) % 10);
  const duration = 7 + ((i * 13) % 8);
  const opacity = 0.18 + ((i % 5) * 0.08);
  return `<i class="particle" style="left:${left}%;--accent:${accent};--delay:${delay}s;--duration:${duration}s;--opacity:${opacity}"></i>`;
}).join('');

const environment = (scene: Scene) => {
  if (scene.special === 'tree') return '<div class="gold-tree"><span class="crown"></span><span class="trunk"></span></div><div class="fog"></div>';
  if (scene.special === 'spires') return '<div class="spires"></div><div class="moon"></div><div class="fog"></div>';
  if (scene.special === 'stars') return '<div class="stars"></div><div class="floating-rocks"></div>';
  if (scene.special === 'loop') return '<div class="loop-ring"></div><div class="fog"></div>';
  return '<div class="mountains"></div><div class="fog"></div>';
};

app.innerHTML = `
  <div class="progress" id="progress"></div>
  <header class="hud"><span class="brand">Pilgrimage</span><span id="chapter">I · Arrival</span></header>
  <div class="traveler" aria-hidden="true"><span class="sword"></span><span class="cloak"></span><span class="head"></span><span class="leg leg-a"></span><span class="leg leg-b"></span></div>
  <main>
    ${scenes.map((scene, index) => `
      <section class="scene scene-${scene.tone}" id="${scene.id}" data-chapter="${scene.chapter}" data-index="${index}">
        <div class="world">${environment(scene)}</div>
        <div class="particles">${particleMarkup(scene.accent)}</div>
        ${scene.enemy ? '<div class="enemy"><span></span></div>' : ''}
        <div class="frame">
          <div class="copy">
            <div class="eyebrow">${scene.eyebrow}</div>
            <h${index === 0 ? '1' : '2'} class="title">${scene.title}</h${index === 0 ? '1' : '2'}>
            <p>${scene.body}</p>
          </div>
        </div>
      </section>
    `).join('')}
  </main>`;

const chapter = document.querySelector<HTMLElement>('#chapter')!;
const progress = document.querySelector<HTMLElement>('#progress')!;
const traveler = document.querySelector<HTMLElement>('.traveler')!;
const sceneEls = gsap.utils.toArray<HTMLElement>('.scene');

sceneEls.forEach((scene, index) => {
  const world = scene.querySelector<HTMLElement>('.world');
  const copy = scene.querySelector<HTMLElement>('.copy');
  const enemy = scene.querySelector<HTMLElement>('.enemy');

  if (copy) {
    gsap.fromTo(copy,
      { opacity: 0, y: 70 },
      { opacity: 1, y: 0, ease: 'none', scrollTrigger: { trigger: scene, start: 'top 78%', end: 'top 34%', scrub: 1 } }
    );
  }

  if (world) {
    gsap.fromTo(world,
      { yPercent: -4, scale: 1.04 },
      { yPercent: 5, scale: 1.1, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: 1.2 } }
    );
  }

  if (enemy) {
    gsap.fromTo(enemy,
      { opacity: 0, x: 90, scale: 0.78 },
      { opacity: index === 3 ? 0.62 : 0.38, x: 0, scale: index === 3 ? 1.14 : 1, ease: 'none', scrollTrigger: { trigger: scene, start: 'top 66%', end: 'center 50%', scrub: 1 } }
    );
  }

  ScrollTrigger.create({
    trigger: scene,
    start: 'top 42%',
    end: 'bottom 42%',
    onEnter: () => chapter.textContent = scene.dataset.chapter || '',
    onEnterBack: () => chapter.textContent = scene.dataset.chapter || ''
  });
});

gsap.to(traveler, {
  y: -8,
  rotation: 0.7,
  duration: 1.25,
  ease: 'sine.inOut',
  repeat: -1,
  yoyo: true
});

gsap.to('.gold-tree', {
  filter: 'drop-shadow(0 0 58px rgba(226,184,87,.52))',
  scale: 1.035,
  transformOrigin: '50% 100%',
  duration: 2.6,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

gsap.to('.spires', {
  xPercent: -3,
  scrollTrigger: { trigger: '#academy', start: 'top bottom', end: 'bottom top', scrub: 1.3 }
});

gsap.to('.stars', {
  yPercent: -10,
  scrollTrigger: { trigger: '#underground', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
});

gsap.to('.loop-ring', {
  rotation: 180,
  scale: 1.5,
  opacity: 0,
  scrollTrigger: { trigger: '#loop', start: 'top 75%', end: 'bottom bottom', scrub: 1.2 }
});

ScrollTrigger.create({
  start: 0,
  end: 'max',
  onUpdate: self => gsap.set(progress, { scaleX: self.progress, transformOrigin: '0 50%' })
});

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (reduceMotion.matches) {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
}
