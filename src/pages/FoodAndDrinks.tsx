import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const categories = [
  { label: 'All' },
  { label: 'Chicken Burgers' },
  { label: 'Beef Burgers' },
  { label: 'Fish Burgers' },
  { label: 'Quick Bites' },
  { label: 'Pops & Boxes' },
  { label: 'Rolls'},
  { label: "Fryin' & Flyin'" },
  { label: 'Sandwich Stacks' },
  { label: 'Premium Shakes' },
  { label: 'Hot Specials' },
  { label: 'Mojito Bar' },
  { label: 'Dessert Zone' },
];

const menuItems: Record<string, { name: string; desc: string; img?: string }[]> = {
  'Chicken Burgers': [
    { name: 'Dash Classic Chicken Supreme', desc: 'Tender juicy chicken with special sauce',          img: '/chickenburger/DashClassicChickenSupreme.jpg' },
    { name: 'Smash Dash Chicken',           desc: 'Smashed chicken patty, crispy & delicious',        img: '/chickenburger/SmashDashChicken.jpg' },
    { name: 'Nashville Fire Dash Chicken',  desc: 'Spicy Nashville-style fried chicken',              img: '/chickenburger/NashvilleFireDashChicken.jpg' },
    { name: 'Korean Kick Dash Chicken',     desc: 'Korean-inspired spicy chicken delight',            img: '/chickenburger/KoreanKickDashChicken.jpg' },
    { name: 'Royal Chicken Tower',          desc: 'Stacked chicken layers with premium toppings',     img: '/chickenburger/RoyalChickenTower.jpg' },
  ],
  'Beef Burgers': [
    { name: 'OG Smash Beef Beast',   desc: 'Original smashed beef patty, juicy & loaded', img: '/beefburgers/OGSmashBeefBeast.jpg'    },
    { name: 'Flame Grill Beef Dash', desc: 'Flame-grilled beef with smoky flavor',         img: '/beefburgers/FlameGrillBeefDash.jpg'  },
    { name: 'Prime Beef Royale',     desc: 'Premium beef with luxurious toppings',          img: '/beefburgers/PrimeBeefRoyale.jpg'     },
    { name: 'Beef Blast Overload',   desc: 'Maximum beef flavor with extra toppings',       img: '/beefburgers/BeefBlastOverload.jpg'   },
  ],
  'Fish Burgers': [
    { name: 'Ocean Catch Dash',  desc: 'Fresh ocean fish patty with tartar sauce', img: '/Fish/fish1.jpg' },
    { name: 'Royal Fish Stack',  desc: 'Premium fish with royal garnish',           img: '/Fish/fish2.jpg' },
  ],
  'Quick Bites': [
    { name: 'Signature Loaded Dash Fries', desc: 'Premium fries with signature toppings', img: '/Quick Bites/friesloaded.jpg' },
    { name: 'Cheesy Melt Dash Fries',      desc: 'Golden fries melted with cheese',        img: '/Quick Bites/cheesfries.jpg'   },
    { name: 'Korean Heat Fries',           desc: 'Spicy Korean-style fries',               img: '/Quick Bites/hotfries.jpg'     },
    { name: 'Nashville Inferno Fries',     desc: 'Spicy Nashville-seasoned fries',         img: '/Quick Bites/infarfries.jpg'   },
  ],
  'Pops & Boxes': [
    { name: 'Crispy Chicken Dash Pops', desc: 'Golden crispy chicken bite-sized pops',   img: '/Pops & Boxes/chickenpops.jpg' },
    { name: 'Fire Blast Chicken Pops',  desc: 'Spicy chicken pops with fire kick',       img: '/Pops & Boxes/firepops.jpg'    },
    { name: 'Seoul Spice Pops',         desc: 'Korean seasoned spicy chicken pops',      img: '/Pops & Boxes/spicepops.jpg'   },
  ],
  'Rolls': [
    { name: 'Turkish Flame Roll',        desc: 'Turkish-style wrap with spicy sensation',      img: '/Rolls/turkroll.jpg'    },
    { name: 'Mediterranean Crunch Roll', desc: 'Fresh Mediterranean ingredients in a wrap',    img: '/Rolls/crunchroll.jpg'  },
    { name: 'Smash Chicken Roll',        desc: 'Smashed chicken with creamy sauce',            img: '/Rolls/chickenroll.jpg' },
    { name: 'Fire Grill Roll',           desc: 'Flame-grilled ingredients in a spicy roll',   img: '/Rolls/grilroll.jpg'    },
  ],
  "Fryin' & Flyin'": [
    { name: 'Original Crispy Dash Chicken', desc: 'Classic crispy fried chicken',    img: '/Fryin&Flyin/crispyfriedchicken.jpg' },
    { name: 'Nashville Hot Fried Chicken',  desc: 'Nashville hot spice fried chicken', img: '/Fryin&Flyin/HotFriedChicken.jpg' },
    { name: 'Golden Fish Fry Dash',         desc: 'Golden crispy fish fry',           img: '/Fryin&Flyin/fishfry.jpg' },
    { name: 'Crispy Shrimp Crunch',         desc: 'Crunchy golden shrimp',            img: '/Fryin&Flyin/CrispyShrimpCrunch.jpg' },
  ],
  'Sandwich Stacks': [
    { name: 'Fresh Garden Veg Stack', desc: 'Fresh vegetables with special dressing',    img: '/Sandwich Stacks/vegsandwich.jpg' },
    { name: 'Veg Club Melt',          desc: 'Layered vegetable club with melted cheese', img: '/Sandwich Stacks/cheessandwich.jpg' },
    { name: 'Cheesy Corn Blast',      desc: 'Corn with melted cheese sensation',         img: '/Sandwich Stacks/cornsandwich.jpg' },
    { name: 'Desi Tikki Deluxe',      desc: 'Traditional spiced tikki sandwich',         img: '/Sandwich Stacks/tikkisandwich.jpg' },
    { name: 'Beef Supreme Stack',     desc: 'Premium beef layered sandwich',             img: '/Sandwich Stacks/beefsandwich.jpg' },
  ],
  'Premium Shakes': [
    { name: 'Nutella Power Dash',   desc: 'Nutella-chocolate shake perfection',  img: '/Premium Shakes/nutella_shake.jpg' },
    { name: 'Double Choco Blast',   desc: 'Double chocolate indulgence',         img: '/Premium Shakes/DoubleChocoBlast.jpg' },
    { name: 'Coconut Cream Royale', desc: 'Creamy tropical coconut shake',       img: '/Premium Shakes/coconutshake.jpg' },
    { name: 'Classic Coffee Kick',  desc: 'Bold coffee flavor kick',             img: '/Premium Shakes/coffeeshake.jpg' },
    { name: 'Milo Madness',    desc: 'Milo-infused creamy shake',           img: '/Premium Shakes/MiloMadness.jpg' },
  ],
  'Hot Specials': [
    { name: 'Hot Milo Comfort', desc: 'Warm comforting Milo drink',          img: '/Hot Specials/HotMiloComfort.jpg' },
    { name: 'Choco Heat',       desc: 'Warm rich chocolate beverage',        img: '/Hot Specials/ChocoHeat.jpg' },
    { name: 'Mocha Dash',       desc: 'Mocha blend of coffee and chocolate', img: '/Hot Specials/coffeeandchocolate.jpg' },
  ],
  'Mojito Bar': [
    { name: 'Blue Lightning Mojito',  desc: 'Blue-colored refreshing mojito', img: '/Mojito Bar/BlueLightningMojito.jpg' },
    { name: 'Pink Paradise Mojito',   desc: 'Pink tropical paradise mojito',  img: '/Mojito Bar/PinkParadiseMojito.jpg' },
    { name: 'Berry Blast Mojito',     desc: 'Mixed berry flavored mojito',    img: '/Mojito Bar/BerryBlastMojito.jpg' },
    { name: 'Melon Chill Mojito',     desc: 'Refreshing melon mojito',        img: '/Mojito Bar/MelonMojito.jpg' },
    { name: 'Raspberry Rush Mojito',  desc: 'Raspberry-infused mojito',       img: '/Mojito Bar/RaspberryRushMojito.jpg' },
  ],
  'Dessert Zone': [
    { name: 'Creamy Milk Punch',   desc: 'Creamy milk-based dessert punch',        img: '/Dessert Zone/Creamymilkbaseddessert.jpg' },
    { name: 'Brownie Bliss Bowl',  desc: 'Decadent brownie dessert bowl',          img: '/Dessert Zone/browniebowls.jpg' },
    { name: 'Dubai Royal Delight', desc: 'Premium royal dessert inspired by Dubai', img: '/Dessert Zone/DubaiRoyalDelight.jpg' },
  ],
};

const allItems = Object.entries(menuItems).flatMap(([cat, items]) =>
  items.map(item => ({ ...item, category: cat }))
);

const FoodAndDrinks = () => {
  const location = useLocation();
  const initialCategory = (location.state as { category?: string })?.category ?? 'All';
  const [active, setActive]     = useState(initialCategory);
  const [search, setSearch]     = useState('');

  const baseItems = useMemo(
    () => (active === 'All' ? allItems : (menuItems[active] ?? []).map(i => ({ ...i, category: active }))),
    [active]
  );

  const items = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return baseItems;
    return baseItems.filter(item =>
      item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    );
  }, [baseItems, search]);

  return (
    <MainLayout>
      <div style={{ backgroundColor: '#faf8f5', minHeight: '100vh' }}>
        <main className="max-w-7xl mx-auto px-6 py-8">

          {/* Page heading */}
          <div className="mb-6">
            <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#1a1a1a', margin: '0 0 4px' }}>
              Our Delicious Menu
            </h1>
            <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>
              Satisfy your cravings with our mouth-watering selection!
            </p>
          </div>


          {/* Horizontal category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => { setActive(cat.label); setSearch(''); }}
                className="text-xs font-semibold px-4 py-1.5 rounded-full border"
                style={
                  active === cat.label
                    ? { backgroundColor: '#fd0802', color: '#fff', borderColor: '#fd0802', cursor: 'pointer', transition: 'all 0.2s' }
                    : { backgroundColor: '#fff', color: '#666', borderColor: '#e8dece', cursor: 'pointer', transition: 'all 0.2s' }
                }
                onMouseEnter={e => { e.currentTarget.style.fontSize = '0.82rem'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.fontSize = ''; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {cat.label}
              </button>
            ))}
          </div>


          {/* Cards grid */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <span style={{ fontSize: '3rem' }}>🍽️</span>
              <p style={{ color: '#aaa', fontWeight: 600 }}>No items found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
              {items.map((item, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      borderRadius: '18px',
                      overflow: 'hidden',
                      backgroundColor: '#1a0f06',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
                      transition: 'transform 0.25s, box-shadow 0.25s',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = 'translateY(-5px)';
                      el.style.boxShadow = '0 16px 48px rgba(233,108,51,0.28)';
                      const img = el.querySelector('img') as HTMLImageElement | null;
                      if (img) img.style.transform = 'scale(1.08)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = 'translateY(0)';
                      el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.22)';
                      const img = el.querySelector('img') as HTMLImageElement | null;
                      if (img) img.style.transform = 'scale(1)';
                    }}
                  >
                    {/* Image area */}
                    <div style={{ height: 'clamp(140px, 30vw, 300px)', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.name}
                          style={{ width: '100%', height: 'clamp(140px, 30vw, 300px)', objectFit: 'cover', objectPosition: '50% 20%', transition: 'transform 0.4s ease', display: 'block' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #2a1800 0%, #3d2408 100%)' }}>
                          <span style={{ fontSize: '72px', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}>
                            
                          </span>
                        </div>
                      )}
                      {/* Bottom gradient fade */}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(transparent, rgba(20,8,0,0.7))', pointerEvents: 'none' }} />
                    </div>

                    {/* Info */}
                    <div style={{ padding: 'clamp(10px, 3vw, 16px) clamp(10px, 3vw, 18px)', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {/* Accent line */}
                      <div style={{ width: '28px', height: '2px', background: 'linear-gradient(90deg, #fd0802, #f5a623)', borderRadius: '2px', marginBottom: '2px' }} />
                      <h3
                        style={{ fontWeight: 800, fontSize: 'clamp(0.78rem, 2.5vw, 1rem)', color: '#fff', margin: 0, lineHeight: 1.3, transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#f5a623')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                      >
                        {item.name}
                      </h3>
                      <p style={{ fontSize: 'clamp(0.65rem, 2vw, 0.78rem)', color: '#9a8070', lineHeight: 1.5, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  );
};

export default FoodAndDrinks;
