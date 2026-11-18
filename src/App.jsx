import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams, Routes, Route } from 'react-router-dom';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react';
import products from './data/products.json';
import collections from './data/collections.json';
import config from './data/store.config.json';
const DeskScene = lazy(() => import('./DeskScene.jsx'));
const money = (n) => `$${n.toFixed(2)}`,
  photo = (p) => p?.image || config.heroImage;
function SceneExperience({ onProduct }) {
  const ref = useRef(null),
    [visible, setVisible] = useState(false),
    [webgl, setWebgl] = useState(true);
  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      setWebgl(!!(c.getContext('webgl2') || c.getContext('webgl')));
    } catch {
      setWebgl(false);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div className='scene-canvas' ref={ref}>
      {visible && webgl ? (
        <Suspense
          fallback={
            <img src={config.heroImage} alt='Workspace scene fallback' />
          }>
          <DeskScene onProduct={onProduct} />
        </Suspense>
      ) : (
        <img src={config.heroImage} alt='Static workspace scene' />
      )}
      <span className='scene-tip'>
        <span className='pulse' />{' '}
        {visible && webgl ? 'DRAG TO EXPLORE' : 'A STILLFORM WORKSPACE'}
      </span>
    </div>
  );
}
function Header({ count }) {
  const [open, setOpen] = useState(false),
    loc = useLocation();
  return (
    <header className='header'>
      <Link className='brand' to='/' aria-label='Stillform home'>
        <span className='brand-mark'>s.</span>
        <span>stillform</span>
      </Link>
      <nav className={open ? 'nav open' : 'nav'}>
        <Link onClick={() => setOpen(false)} to='/shop'>
          Shop
        </Link>
        <Link onClick={() => setOpen(false)} to='/collection/considered'>
          Collections
        </Link>
        <Link onClick={() => setOpen(false)} to='/finder'>
          Find your setup
        </Link>
        <Link onClick={() => setOpen(false)} to='/about'>
          Our thinking
        </Link>
      </nav>
      <div className='header-actions'>
        <Link to='/shop' className='icon-btn' aria-label='Search products'>
          <Search size={18} />
        </Link>
        <Link to='/cart' className='bag-link'>
          <ShoppingBag size={17} />
          <span>
            Bag <b>{count}</b>
          </span>
        </Link>
        <button
          className='mobile-menu icon-btn'
          onClick={() => setOpen(!open)}
          aria-label='Toggle menu'>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-top'>
        <div>
          <Link className='brand footer-brand' to='/'>
            {' '}
            <span className='brand-mark'>s.</span>
            <span>stillform</span>
          </Link>
          <p>Objects for more intentional workspaces.</p>
        </div>
        <div className='footer-links'>
          <Link to='/about'>About</Link>
          <Link to='/shipping'>Shipping & returns</Link>
          <Link to='/faq'>FAQs</Link>
          <Link to='/builder'>Build a setup</Link>
        </div>
        <div className='footer-note'>
          A demonstration storefront.
          <br />
          No real orders or payments.
        </div>
      </div>
      <div className='footer-bottom'>
        <span>© 2025 STILLFORM STUDIO</span>
        <span>Designed for a little more focus.</span>
        <span>US · USD</span>
      </div>
    </footer>
  );
}
function ProductTile({ p, add, onCompare, compare = [] }) {
  return (
    <article className='product-tile'>
      <Link to={`/product/${p.id}`} className='product-image'>
        <img src={photo(p)} alt={p.alt} />
        <span className='image-index'>{p.category}</span>
        <span className='tile-arrow'>
          <ArrowUpRight size={17} />
        </span>
      </Link>
      <div className='tile-meta'>
        <Link to={`/product/${p.id}`}>
          <h3>{p.name}</h3>
          <p>{p.subtitle}</p>
        </Link>
        <div className='price-add'>
          <span>{money(p.price)}</span>
          <button onClick={() => add(p.id)} aria-label={`Add ${p.name} to bag`}>
            <Plus size={17} />
          </button>
        </div>
      </div>
      {onCompare && (
        <button className='compare-toggle' onClick={() => onCompare(p.id)}>
          {compare.includes(p.id) ? '✓ Added to compare' : '+ Compare'}
        </button>
      )}
    </article>
  );
}
function Home({ add }) {
  const [hot, setHot] = useState('');
  return (
    <>
      <section className='hero'>
        <div className='hero-copy'>
          <div className='eyebrow'>
            <span className='dot' /> A quieter kind of workspace
          </div>
          <h1>
            Make space
            <br />
            for <em>your best</em>
            <br />
            thinking.
          </h1>
          <p>
            Thoughtful objects for the hours you spend at your desk. Built
            around a simple idea: when your space feels right, so does the work.
          </p>
          <div className='hero-actions'>
            <Link className='button button-dark' to='/shop'>
              Explore the collection <ArrowRight size={16} />
            </Link>
            <Link className='text-link' to='/finder'>
              Find your setup <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className='hero-caption'>
            <span>01 / 04</span>
            <span>Objects for the everyday</span>
          </div>
        </div>
        <div className='hero-visual'>
          <img
            src={config.heroImage}
            alt='Thoughtful, minimal home workspace'
          />
          <div className='hero-stamp'>
            A PLACE
            <br />
            TO BEGIN <ArrowDown size={16} />
          </div>
          <div className='hero-side-label'>STILLFORM · WORKSPACE STUDY 01</div>
        </div>
      </section>
      <div className='ticker'>
        <span>DESIGNED FOR DAILY RITUALS</span>
        <i>✳</i>
        <span>LESS CLUTTER, MORE CLARITY</span>
        <i>✳</i>
        <span>SPACE TO THINK</span>
        <i>✳</i>
        <span>DESIGNED FOR DAILY RITUALS</span>
      </div>
      <section className='section scene-section'>
        <div className='section-head'>
          <div>
            <div className='eyebrow'>A workspace, in perspective</div>
            <h2>Look closer.</h2>
          </div>
          <p>
            Move around the scene. Select an object
            <br />
            to find out more about what makes it.
          </p>
        </div>
        <div className='scene-card'>
          <SceneExperience onProduct={(id) => setHot(id)} />
          <div className='scene-products'>
            {products.slice(0, 4).map((p, i) => (
              <button
                onMouseEnter={() => setHot(p.id)}
                onFocus={() => setHot(p.id)}
                onClick={() => setHot(p.id)}
                className={`scene-product ${hot === p.id ? 'active' : ''}`}
                key={p.id}>
                <span>0{i + 1}</span>
                <span>{p.name}</span>
                <span>{money(p.price)}</span>
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
        </div>
        {hot && (
          <div className='hotspot-pop'>
            <img src={photo(products.find((p) => p.id === hot))} alt='' />
            <div>
              <b>{products.find((p) => p.id === hot)?.name}</b>
              <span>{money(products.find((p) => p.id === hot)?.price)}</span>
            </div>
            <Link to={`/product/${hot}`}>
              Discover <ArrowRight size={14} />
            </Link>
            <button
              aria-label='Close product preview'
              onClick={() => setHot('')}>
              <X size={15} />
            </button>
          </div>
        )}
      </section>
      <section className='section needs-section'>
        <div className='section-head'>
          <div>
            <div className='eyebrow'>Start with how you want to feel</div>
            <h2>
              What needs a little
              <br />
              <em>more room?</em>
            </h2>
          </div>
          <p>
            Small shifts can change how a whole day feels.
            <br />
            Find a better place to begin.
          </p>
        </div>
        <div className='needs-grid'>
          {[
            {
              no: '01',
              title: 'Clear the surface',
              desc: 'Make room for what matters.',
              tag: 'clean desk',
              img: products[2].image,
            },
            {
              no: '02',
              title: 'Find your focus',
              desc: 'Settle into the work in front of you.',
              tag: 'productivity',
              img: products[3].image,
            },
            {
              no: '03',
              title: 'Build a calmer setup',
              desc: 'Bring the everyday into balance.',
              tag: 'minimal',
              img: products[0].image,
            },
          ].map((x) => (
            <Link
              className='need'
              key={x.no}
              to={`/shop?tag=${encodeURIComponent(x.tag)}`}>
              <img src={x.img} alt='' />
              <div className='need-over'>
                <span>{x.no} / A BETTER WORKDAY</span>
                <h3>{x.title}</h3>
                <p>{x.desc}</p>
                <span className='circle-arrow'>
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className='featured-section'>
        <div className='section-head'>
          <div>
            <div className='eyebrow'>The pieces we return to</div>
            <h2>Considered essentials.</h2>
          </div>
          <Link className='text-link' to='/shop'>
            View all objects <ArrowRight size={15} />
          </Link>
        </div>
        <div className='product-grid'>
          {products
            .filter((p) => p.featured)
            .slice(0, 3)
            .map((p) => (
              <ProductTile key={p.id} p={p} add={add} />
            ))}
        </div>
      </section>
      <section className='finder-band'>
        <div className='finder-image'>
          <img src={products[1].image} alt='Laptop stand in a workspace' />
          <span>
            YOUR WORKDAY,
            <br />
            RECONSIDERED
          </span>
        </div>
        <div className='finder-content'>
          <div className='eyebrow'>A few good questions</div>
          <h2>
            Your setup,
            <br />
            <em>your way.</em>
          </h2>
          <p>
            Work, study, late-night builds: tell us what matters to you. We’ll
            make a short list of pieces to start with.
          </p>
          <Link className='button button-light' to='/finder'>
            Take the setup finder <ArrowRight size={16} />
          </Link>
          <span className='finder-time'>
            A little inspiration · about 1 minute
          </span>
        </div>
      </section>
      <section className='section collection-section'>
        <div className='section-head'>
          <div>
            <div className='eyebrow'>Thoughtfully put together</div>
            <h2>Spaces with a point of view.</h2>
          </div>
          <Link className='text-link' to='/shop'>
            Shop everything <ArrowRight size={15} />
          </Link>
        </div>
        <div className='collection-grid'>
          {collections.map((c, i) => (
            <Link
              className='collection-card'
              to={`/collection/${c.id}`}
              key={c.id}>
              <div className='collection-img'>
                <img src={products[i === 0 ? 1 : 2].image} alt='' />
                <span>0{i + 1}</span>
              </div>
              <div className='collection-text'>
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <ArrowUpRight size={19} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className='inspiration'>
        <div className='inspiration-img'>
          <img
            src='https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=90'
            alt='Sunlit shared workspace with plants and natural materials'
          />
          <span className='inspiration-tag'>FIELD NOTES · 001</span>
        </div>
        <div className='inspiration-copy'>
          <div className='eyebrow'>A space for your own ideas</div>
          <h2>
            Not just a place
            <br />
            to get things <em>done.</em>
          </h2>
          <p>
            A desk is a small landscape you return to, day after day. We think
            it should feel like yours: useful, considered, and a pleasure to
            come back to.
          </p>
          <Link className='text-link' to='/about'>
            A little more about us <ArrowRight size={15} />
          </Link>
        </div>
      </section>
      <section className='builder-cta'>
        <div className='builder-copy'>
          <div className='eyebrow'>A study in your own style</div>
          <h2>
            Make it
            <br />
            <em>your space.</em>
          </h2>
          <p>
            Choose the pieces you need, keep an eye on your budget, and build a
            workspace that feels like you.
          </p>
          <Link to='/builder' className='button button-dark'>
            Build your setup <ArrowRight size={16} />
          </Link>
        </div>
        <div className='builder-visual'>
          <div className='builder-circle'>
            YOUR
            <br />
            SPACE
            <br />
            <span>✳</span>
          </div>
          <div className='builder-note'>
            START WITH
            <br />
            WHAT YOU NEED
          </div>
        </div>
      </section>
      <section className='newsletter'>
        <div className='eyebrow'>A note from the studio</div>
        <h2>
          Make room for
          <br />
          <em>good things.</em>
        </h2>
        <p>
          Occasional thoughts on better workspaces and what belongs in them.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.currentTarget.reset();
            alert('Thanks — you’re on the studio list (demo).');
          }}>
          <input
            aria-label='Email address'
            type='email'
            placeholder='Your email address'
            required
          />
          <button aria-label='Subscribe'>
            <ArrowRight size={19} />
          </button>
        </form>
        <small>Just a prototype sign-up. We won’t send anything.</small>
      </section>
    </>
  );
}
function Shop({ add, compare, onCompare }) {
  const loc = useLocation(),
    search = new URLSearchParams(loc.search),
    [cat, setCat] = useState('All objects'),
    [sort, setSort] = useState('Featured');
  let list = products.filter(
    (p) =>
      p.available &&
      (cat === 'All objects' || p.category === cat) &&
      (!search.get('tag') || p.tags.includes(search.get('tag')))
  );
  if (sort === 'Price: low to high')
    list = list.slice().sort((a, b) => a.price - b.price);
  if (sort === 'Price: high to low')
    list = list.slice().sort((a, b) => b.price - a.price);
  return (
    <main className='page'>
      <div className='page-title'>
        <div className='eyebrow'>THE STILLFORM EDIT · DEMONSTRATION</div>
        <h1>
          Objects for
          <br />
          <em>better days.</em>
        </h1>
        <p>Considered tools for the hours you spend at your desk.</p>
      </div>
      <div className='shop-toolbar'>
        <div className='filter-pills'>
          {['All objects', ...new Set(products.map((p) => p.category))].map(
            (x) => (
              <button
                onClick={() => setCat(x)}
                className={cat === x ? 'selected' : ''}
                key={x}>
                {x}
              </button>
            )
          )}
        </div>
        <label>
          Sort by{' '}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option>Featured</option>
            <option>Price: low to high</option>
            <option>Price: high to low</option>
          </select>
          <ChevronDown size={14} />
        </label>
      </div>
      <div className='product-grid shop-grid'>
        {list.map((p) => (
          <ProductTile
            key={p.id}
            p={p}
            add={add}
            onCompare={onCompare}
            compare={compare}
          />
        ))}
      </div>
      {compare.length > 0 && (
        <div className='compare-bar'>
          <span>{compare.length} selected to compare</span>
          <Link to='/compare'>
            Compare objects <ArrowRight size={15} />
          </Link>
          <button onClick={() => compare.forEach(onCompare)}>Clear</button>
        </div>
      )}
    </main>
  );
}
function Product({ add }) {
  const { id } = useParams(),
    p = products.find((x) => x.id === id),
    [qty, setQty] = useState(1);
  if (!p)
    return (
      <main className='page'>
        <h1>That object wandered off.</h1>
        <Link to='/shop'>Return to the collection</Link>
      </main>
    );
  return (
    <main className='product-page'>
      <div className='crumb'>
        <Link to='/shop'>Shop</Link>
        <span>/</span>
        {p.category}
        <span>/</span>
        {p.name}
      </div>
      <div className='product-detail'>
        <div className='detail-image'>
          <img src={photo(p)} alt={p.alt} />
          <span>STILLFORM OBJECT · {p.id.toUpperCase()}</span>
        </div>
        <div className='detail-copy'>
          <div className='eyebrow'>
            {p.category} · OBJECT NO. {products.indexOf(p) + 1}
          </div>
          <h1>{p.name}</h1>
          <p className='detail-subtitle'>{p.subtitle}</p>
          <div className='detail-price'>
            {money(p.price)} <small>USD</small>
          </div>
          <p className='detail-description'>{p.details}</p>
          <div className='variant'>
            <span>Finish</span>
            <button className='swatch'>
              <i
                style={{
                  background:
                    p.tone === 'silver'
                      ? '#babcb6'
                      : p.tone === 'oak'
                        ? '#b18b64'
                        : p.tone === 'warm'
                          ? '#d7c7a5'
                          : '#333633',
                }}
              />{' '}
              {p.specs.Finish || p.tone}
            </button>
          </div>
          <div className='buy-row'>
            <div className='qty'>
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label='Decrease quantity'>
                <Minus size={14} />
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                aria-label='Increase quantity'>
                <Plus size={14} />
              </button>
            </div>
            <button
              className='button button-dark add-wide'
              onClick={() => add(p.id, qty)}>
              Add to bag · {money(p.price * qty)} <ArrowRight size={16} />
            </button>
          </div>
          <div className='demo-inline'>
            <Check size={15} /> Demonstration item · no real purchase
          </div>
          <div className='spec-list'>
            <h3>Details, considered.</h3>
            {Object.entries(p.specs).map(([k, v]) => (
              <div key={k}>
                <span>{k}</span>
                <b>{v}</b>
              </div>
            ))}
          </div>
          <details className='ship-detail'>
            <summary>
              Shipping & returns <Plus size={15} />
            </summary>
            <p>
              This prototype doesn’t process orders. In a live store, shipping
              and returns information would appear here.
            </p>
          </details>
        </div>
      </div>
      <section className='related'>
        <div className='section-head'>
          <div>
            <div className='eyebrow'>A natural companion</div>
            <h2>Completes the picture.</h2>
          </div>
        </div>
        <div className='product-grid'>
          {products
            .filter((x) => p.related.includes(x.id))
            .slice(0, 3)
            .map((x) => (
              <ProductTile key={x.id} p={x} add={add} />
            ))}
        </div>
      </section>
    </main>
  );
}
function Collection({ add }) {
  const { id } = useParams(),
    c = collections.find((x) => x.id === id);
  if (!c) return <Shop add={add} />;
  return (
    <main className='page collection-page'>
      <div className='page-title'>
        <div className='eyebrow'>
          COLLECTION 0{collections.indexOf(c) + 1} · STILLFORM STUDIO
        </div>
        <h1>
          {c.name.split(' ').slice(0, -1).join(' ')}
          <br />
          <em>{c.name.split(' ').slice(-1)}</em>
        </h1>
        <p>{c.description}</p>
      </div>
      <div className='product-grid shop-grid'>
        {c.productIds
          .map((id) => products.find((p) => p.id === id))
          .filter(Boolean)
          .map((p) => (
            <ProductTile key={p.id} p={p} add={add} />
          ))}
      </div>
    </main>
  );
}
function Finder({ add }) {
  const [step, setStep] = useState(0),
    [answers, setAnswers] = useState({}),
    [done, setDone] = useState(false);
  const questions = [
    {
      key: 'purpose',
      title: 'What brings you to your desk?',
      choices: ['Work', 'Study', 'Gaming'],
    },
    {
      key: 'budget',
      title: 'What feels comfortable to spend?',
      choices: ['Under $50', 'Under $100', 'Under $250'],
    },
    {
      key: 'style',
      title: 'Which space feels most like yours?',
      choices: ['Dark', 'Minimal', 'Modern'],
    },
  ];
  let results = products.filter(
    (p) =>
      (!answers.purpose || p.tags.includes(answers.purpose.toLowerCase())) &&
      (!answers.style ||
        p.tags.includes(answers.style.toLowerCase()) ||
        answers.style === 'Dark') &&
      (!answers.budget ||
        p.price <=
          (answers.budget === 'Under $50'
            ? 50
            : answers.budget === 'Under $100'
              ? 100
              : 250))
  );
  if (!results.length) results = products.slice(0, 3);
  return (
    <main className='page finder-page'>
      <div className='eyebrow'>THE STILLFORM SETUP FINDER · DEMO LOGIC</div>
      {!done ? (
        <div className='finder-panel'>
          <div className='finder-progress'>
            <span>0{step + 1}</span>
            <div>
              <i
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span>0{questions.length}</span>
          </div>
          <h1>{questions[step].title}</h1>
          <p>
            There’s no wrong answer. Just a few details to help us point you in
            a useful direction.
          </p>
          <div className='choice-grid'>
            {questions[step].choices.map((x) => (
              <button
                key={x}
                className={answers[questions[step].key] === x ? 'chosen' : ''}
                onClick={() =>
                  setAnswers({ ...answers, [questions[step].key]: x })
                }>
                {x}
                {answers[questions[step].key] === x && <Check size={18} />}
              </button>
            ))}
          </div>
          <div className='finder-controls'>
            <Link className='text-link' to='/shop'>
              <ArrowLeft size={15} /> Browse instead
            </Link>
            <button
              disabled={!answers[questions[step].key]}
              className='button button-dark'
              onClick={() => (step < 2 ? setStep(step + 1) : setDone(true))}>
              {step < 2 ? 'Next question' : 'Show my edit'}{' '}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className='page-title'>
            <div className='eyebrow'>A LITTLE EDIT, JUST FOR YOU</div>
            <h1>
              Your space,
              <br />
              <em>taking shape.</em>
            </h1>
            <p>
              Based on your {answers.purpose.toLowerCase()} days,{' '}
              {answers.budget.toLowerCase()} budget and{' '}
              {answers.style.toLowerCase()} style.
            </p>
            <button
              className='text-link'
              onClick={() => {
                setStep(0);
                setDone(false);
              }}>
              <ArrowLeft size={15} /> Start again
            </button>
          </div>
          <div className='product-grid shop-grid'>
            {results.map((p) => (
              <ProductTile key={p.id} p={p} add={add} />
            ))}
          </div>
          <Link className='button button-dark' to='/builder'>
            Keep building your setup <ArrowRight size={16} />
          </Link>
        </>
      )}
    </main>
  );
}
function Builder({ add }) {
  const [selected, setSelected] = useState([]),
    [budget, setBudget] = useState(250);
  const total = selected.reduce(
      (s, id) => s + products.find((p) => p.id === id).price,
      0
    ),
    toggle = (id) =>
      setSelected(
        selected.includes(id)
          ? selected.filter((x) => x !== id)
          : [...selected, id]
      );
  return (
    <main className='page builder-page'>
      <div className='eyebrow'>THE STILLFORM SETUP BUILDER · DEMO</div>
      <div className='builder-heading'>
        <div>
          <h1>
            Make a space
            <br />
            <em>of your own.</em>
          </h1>
          <p>
            Choose a few pieces. Make a working setup that feels like yours.
          </p>
        </div>
        <div className='budget-box'>
          <label htmlFor='budget'>Your budget</label>
          <select
            id='budget'
            value={budget}
            onChange={(e) => setBudget(+e.target.value)}>
            <option value='100'>Under $100</option>
            <option value='250'>Under $250</option>
            <option value='500'>Under $500</option>
          </select>
          <span className={total > budget ? 'over' : ''}>
            {money(Math.max(0, budget - total))} remaining
          </span>
        </div>
      </div>
      <div className='builder-layout'>
        <div className='builder-choices'>
          <div className='eyebrow'>01 — PICK YOUR PIECES</div>
          {products.map((p) => (
            <button
              className={`builder-option ${selected.includes(p.id) ? 'is-picked' : ''}`}
              key={p.id}
              onClick={() => toggle(p.id)}>
              <img src={p.image} alt='' />
              <span>
                <b>{p.name}</b>
                <small>{p.category}</small>
              </span>
              <strong>{money(p.price)}</strong>
              <i>
                {selected.includes(p.id) ? (
                  <Check size={17} />
                ) : (
                  <Plus size={17} />
                )}
              </i>
            </button>
          ))}
        </div>
        <aside className='setup-summary'>
          <div className='eyebrow'>02 — YOUR SETUP</div>
          <h2>
            {selected.length
              ? `${selected.length} pieces, coming together.`
              : 'A little room to begin.'}
          </h2>
          {selected.length === 0 ? (
            <p>Choose the pieces that will make your workday feel better.</p>
          ) : (
            selected.map((id) => {
              let p = products.find((x) => x.id === id);
              return (
                <div className='summary-item' key={id}>
                  <img src={p.image} alt='' />
                  <div>
                    <b>{p.name}</b>
                    <span>{money(p.price)}</span>
                  </div>
                  <button
                    aria-label={`Remove ${p.name}`}
                    onClick={() => toggle(id)}>
                    <X size={15} />
                  </button>
                </div>
              );
            })
          )}
          <div className='summary-total'>
            <span>Estimated total</span>
            <b>{money(total)}</b>
          </div>
          {total > budget && (
            <p className='budget-alert'>
              Over budget by {money(total - budget)}. Remove a piece or raise
              your budget.
            </p>
          )}
          <button
            className='button button-dark summary-add'
            disabled={!selected.length}
            onClick={() => {
              selected.forEach((id) => add(id));
              setSelected([]);
            }}>
            Add setup to bag <ArrowRight size={16} />
          </button>
          <small>Demonstration prices · no checkout</small>
        </aside>
      </div>
    </main>
  );
}
function Cart({ cart, setCart }) {
  const items = Object.entries(cart)
      .map(([id, q]) => ({ p: products.find((x) => x.id === id), q }))
      .filter((x) => x.p),
    total = items.reduce((s, x) => s + x.p.price * x.q, 0);
  return (
    <main className='page cart-page'>
      <div className='eyebrow'>YOUR EDIT</div>
      <h1>
        A little room
        <br />
        <em>for good things.</em>
      </h1>
      {items.length === 0 ? (
        <div className='empty-cart'>
          <ShoppingBag size={30} />
          <h2>Your bag is taking a breather.</h2>
          <p>
            Explore the collection and find something that belongs in your
            space.
          </p>
          <Link className='button button-dark' to='/shop'>
            Explore the collection <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className='cart-layout'>
          <div className='cart-items'>
            {items.map(({ p, q }) => (
              <div className='cart-item' key={p.id}>
                <Link to={`/product/${p.id}`}>
                  <img src={p.image} alt={p.alt} />
                </Link>
                <div>
                  <Link to={`/product/${p.id}`}>
                    <b>{p.name}</b>
                  </Link>
                  <span>{p.category}</span>
                  <div className='qty'>
                    <button
                      onClick={() =>
                        setCart({ ...cart, [p.id]: Math.max(1, q - 1) })
                      }>
                      <Minus size={13} />
                    </button>
                    <span>{q}</span>
                    <button onClick={() => setCart({ ...cart, [p.id]: q + 1 })}>
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
                <strong>{money(p.price * q)}</strong>
                <button
                  className='remove'
                  aria-label={`Remove ${p.name}`}
                  onClick={() => {
                    let n = { ...cart };
                    delete n[p.id];
                    setCart(n);
                  }}>
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <aside className='cart-summary'>
            <div className='eyebrow'>THE DETAILS</div>
            <div>
              <span>Subtotal</span>
              <b>{money(total)}</b>
            </div>
            <div>
              <span>Shipping</span>
              <span>Calculated later</span>
            </div>
            <hr />
            <button
              className='button button-dark'
              onClick={() =>
                alert(
                  'This is a demonstration storefront. No order or payment will be placed.'
                )
              }>
              Continue to demo checkout <ArrowRight size={16} />
            </button>
            <p>No real orders or payments are collected here.</p>
          </aside>
        </div>
      )}
    </main>
  );
}
function Compare({ ids, onCompare }) {
  const selected = products.filter((p) => ids.includes(p.id)),
    specNames = [...new Set(selected.flatMap((p) => Object.keys(p.specs)))];
  return (
    <main className='page compare-page'>
      <div className='eyebrow'>A CLOSER LOOK · DEMONSTRATION</div>
      <h1>
        Choose what
        <br />
        <em>fits your day.</em>
      </h1>
      {selected.length < 2 ? (
        <div className='empty-cart'>
          <p>Select at least two objects to compare the details that matter.</p>
          <Link className='button button-dark' to='/shop'>
            Choose objects <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className='compare-table'>
          <div className='compare-head'>
            <div>Compare details</div>
            {selected.map((p) => (
              <div key={p.id}>
                <img src={p.image} alt={p.alt} />
                <Link to={`/product/${p.id}`}>{p.name}</Link>
                <b>{money(p.price)}</b>
                <button onClick={() => onCompare(p.id)}>Remove</button>
              </div>
            ))}
          </div>
          {['Category', ...specNames].map((label) => (
            <div className='compare-row' key={label}>
              <b>{label}</b>
              {selected.map((p) => (
                <span key={p.id}>
                  {label === 'Category' ? p.category : p.specs[label] || '—'}
                </span>
              ))}
            </div>
          ))}
          <div className='compare-row'>
            <b>Intended for</b>
            {selected.map((p) => (
              <span key={p.id}>
                {p.tags
                  .filter((t) => ['work', 'study', 'gaming'].includes(t))
                  .join(', ') || 'Everyday use'}
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
function Info({ type }) {
  let content = {
    about: [
      'Space to think.',
      'A thoughtful desk can be a small act of care. Stillform is a concept for considered objects that make the everyday workspace feel more useful, more personal, and a little more calm.',
      'We’re a demonstration brand exploring what a more intentional shopping experience could feel like. The products, prices, and policies shown here are illustrative only.',
    ],
    shipping: [
      'Shipping & returns',
      'This prototype is a design demonstration. It does not sell or ship products, collect payments, or place orders.',
      'In a live store, this page would explain delivery regions, processing times, return windows, and how to get help. No supplier or fulfilment service is connected.',
    ],
    faq: [
      'Questions, considered.',
      'Is this a real store?',
      'No. Stillform is a demonstration storefront. Prices and products are illustrative; checkout does not collect payment or create orders.',
    ],
  }[type];
  return (
    <main className='page info-page'>
      <div className='eyebrow'>STILLFORM STUDIO · A DEMONSTRATION</div>
      <h1>
        {content[0].includes(' ') && type === 'about' ? (
          <>
            Space to
            <br />
            <em>think.</em>
          </>
        ) : (
          content[0]
        )}
      </h1>
      <div className='info-copy'>
        <p>{content[1]}</p>
        <p>{content[2]}</p>
        {type === 'faq' &&
          [
            'Can I buy the products?',
            'How does the setup finder work?',
            'Where do product details come from?',
          ].map((q, i) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={16} />
              </summary>
              <p>
                {
                  [
                    'Not at this stage. The bag is local to your browser, and the checkout button only explains the demo limitation.',
                    'It uses simple matching against the product tags and budget fields in the local catalogue. No AI service is connected.',
                    'Product details are illustrative entries maintained in the structured data files.',
                  ][i]
                }
              </p>
            </details>
          ))}
      </div>
      <Link className='text-link' to='/shop'>
        Back to the objects <ArrowRight size={15} />
      </Link>
    </main>
  );
}
export default function App() {
  const [cart, setCart] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem('stillform-cart') || '{}');
      } catch {
        return {};
      }
    }),
    [compare, setCompare] = useState([]);
  React.useEffect(
    () => localStorage.setItem('stillform-cart', JSON.stringify(cart)),
    [cart]
  );
  const add = (id, q = 1) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + q })),
    toggleCompare = (id) =>
      setCompare((ids) =>
        ids.includes(id)
          ? ids.filter((x) => x !== id)
          : ids.length < 3
            ? [...ids, id]
            : ids
      );
  return (
    <>
      <div className='announcement'>
        A DEMONSTRATION STORE · NO REAL ORDERS OR PAYMENTS <span>✳</span>{' '}
        OBJECTS FOR A MORE INTENTIONAL WORKDAY
      </div>
      <Header count={Object.values(cart).reduce((a, b) => a + b, 0)} />
      <Routes>
        <Route path='/' element={<Home add={add} />} />
        <Route
          path='/shop'
          element={
            <Shop add={add} compare={compare} onCompare={toggleCompare} />
          }
        />
        <Route
          path='/compare'
          element={<Compare ids={compare} onCompare={toggleCompare} />}
        />
        <Route path='/product/:id' element={<Product add={add} />} />
        <Route path='/collection/:id' element={<Collection add={add} />} />
        <Route path='/finder' element={<Finder add={add} />} />
        <Route path='/builder' element={<Builder add={add} />} />
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />} />
        <Route path='/about' element={<Info type='about' />} />
        <Route path='/shipping' element={<Info type='shipping' />} />
        <Route path='/faq' element={<Info type='faq' />} />
        <Route
          path='*'
          element={
            <Shop add={add} compare={compare} onCompare={toggleCompare} />
          }
        />
      </Routes>
      <Footer />
      <button
        className='back-top'
        aria-label='Back to top'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <ArrowDown size={16} />
      </button>
    </>
  );
}
