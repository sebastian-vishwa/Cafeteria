import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronDown, 
  Star, 
  ShoppingBag, 
  AlertCircle, 
  Flame, 
  Sparkles, 
  Coffee, 
  Zap, 
  PackageCheck,
  Check
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, SINGLE_ORIGIN_SPECIAL } from '../data/products';
import { useCart } from '../context/CartContext';

export const ProductsPage = () => {
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Dietary filters
  const [filterVegan, setFilterVegan] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);
  const [filterNoNuts, setFilterNoNuts] = useState(false);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (filterVegan && !item.isVegan) return false;
      if (filterGlutenFree && !item.isGlutenFree) return false;
      if (filterNoNuts && item.containsNuts) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTag = item.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, filterVegan, filterGlutenFree, filterNoNuts, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const selectedCategoryName = CATEGORIES.find(c => c.id === selectedCategory)?.name || 'All Items';

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '70px' }}>
      {/* Page Title & Status Banner */}
      <section style={{
        padding: '36px 0 28px 0',
        backgroundColor: '#FFFBF7',
        borderBottom: '1px solid #F1E5D8',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}>
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--amber-secondary)',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <Coffee size={14} />
                Craft Roastery &amp; Artisanal Bakehouse
              </div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: 'var(--text-dark)',
                marginBottom: '4px',
              }}>
                Our Daily Provisions
              </h1>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
                Small-batch espresso, heirloom teas, and lamination pastries baked fresh at 6:00 AM and 1:00 PM every day.
              </p>
            </div>

            {/* Status pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFF2E6',
                border: '1px solid #FBD7BD',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#9C430B',
              }}>
                <span style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#EA580C',
                  display: 'inline-block',
                }} />
                <span>Oven Fresh: Batch #4 Ready</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FAF0E6',
                border: '1px solid #EEDCCE',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '700',
                color: 'var(--text-dark)',
              }}>
                <Zap size={13} color="var(--amber-secondary)" fill="var(--amber-secondary)" />
                <span>Pickup in 10–15m</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section style={{ padding: '36px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '270px 1fr',
            gap: '32px',
            alignItems: 'start',
          }}>
            {/* LEFT SIDEBAR */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Menu Categories */}
              <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #EEDCCE',
                borderRadius: '18px',
                padding: '20px',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px',
                }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    Menu Categories
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>
                    6 groups
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {CATEGORIES.map(cat => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setCurrentPage(1);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: isActive ? '700' : '600',
                          backgroundColor: isActive ? 'var(--amber-banner)' : 'transparent',
                          color: isActive ? '#FFFFFF' : 'var(--text-dark)',
                          textAlign: 'left',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) e.currentTarget.style.backgroundColor = '#FAF0E6';
                        }}
                        onMouseLeave={e => {
                          if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <span>{cat.name}</span>
                        <span style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#F5ECE3',
                          color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                        }}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dietary Filters */}
              <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #EEDCCE',
                borderRadius: '18px',
                padding: '20px',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <h3 style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '16px',
                }}>
                  Dietary Filters
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { label: 'Vegan Options', checked: filterVegan, set: setFilterVegan },
                    { label: 'Gluten-Free', checked: filterGlutenFree, set: setFilterGlutenFree },
                    { label: 'Contains Nuts', checked: filterNoNuts, set: setFilterNoNuts, note: 'Exclude nuts' },
                  ].map((filter, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: 'var(--text-dark)',
                        cursor: 'pointer',
                      }}
                      onClick={() => filter.set(!filter.checked)}
                    >
                      <span>{filter.label}</span>
                      {/* Custom Switch Toggle */}
                      <div style={{
                        width: '38px',
                        height: '22px',
                        borderRadius: '9999px',
                        backgroundColor: filter.checked ? 'var(--amber-banner)' : '#E8DDD2',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: filter.checked ? 'flex-end' : 'flex-start',
                        transition: 'all 0.2s ease',
                      }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kitchen Allergen Notice Card */}
              <div style={{
                backgroundColor: '#FFF9F3',
                border: '1px solid #F2DFD0',
                borderRadius: '18px',
                padding: '18px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: 'var(--amber-primary)',
                  marginBottom: '8px',
                }}>
                  <AlertCircle size={15} />
                  <span>Kitchen Allergen Notice</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-body)', lineHeight: 1.55, marginBottom: '14px' }}>
                  All our pastries are rolled on marble surfaces with French cultured butter and stone-ground organic wheat. Cross-contact with almond and pistachio meal may occur.
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11.5px',
                  fontWeight: '600',
                  color: 'var(--amber-secondary)',
                  backgroundColor: '#FFFFFF',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #F1E2D4',
                }}>
                  <PackageCheck size={14} />
                  <span>Thermal packaging retains steam-crisp for 30m</span>
                </div>
              </div>

              {/* Roaster Heat Live Widget */}
              <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #EEDCCE',
                borderRadius: '18px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}>
                    Roaster Heat
                  </div>
                  <div style={{
                    fontSize: '22px',
                    fontWeight: '800',
                    color: 'var(--text-dark)',
                    fontFamily: 'var(--font-heading)',
                  }}>
                    204°C
                  </div>
                </div>

                {/* Animated SVG Sparkline */}
                <svg width="68" height="28" viewBox="0 0 68 28" fill="none">
                  <path
                    d="M2 24 C14 24, 20 18, 30 14 C40 10, 48 18, 56 6 L66 4"
                    stroke="#C25E00"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="66" cy="4" r="3" fill="#C25E00" />
                </svg>
              </div>
            </aside>

            {/* MAIN PRODUCTS GRID & CONTROLS */}
            <main>
              {/* Top Controls: Search & Sort */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}>
                {/* Search Bar */}
                <div style={{
                  position: 'relative',
                  flex: 1,
                  minWidth: '240px',
                }}>
                  <Search
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search pastries, coffee, bites..."
                    style={{
                      width: '100%',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #EEDCCE',
                      borderRadius: '12px',
                      padding: '11px 16px 11px 42px',
                      fontSize: '13.5px',
                      color: 'var(--text-dark)',
                    }}
                  />
                </div>

                {/* Sort Dropdown */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EEDCCE',
                  borderRadius: '12px',
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--text-dark)',
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>Sort:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'none',
                      fontWeight: '700',
                      color: 'var(--text-dark)',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Status Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                fontSize: '13px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    {selectedCategoryName}
                  </h2>
                  <span style={{
                    backgroundColor: '#FAF0E6',
                    color: 'var(--amber-banner)',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                  }}>
                    Showing {currentProducts.length} picks
                  </span>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  Updated today at 6:45 AM
                </div>
              </div>

              {/* 3-Column Products Grid */}
              {currentProducts.length === 0 ? (
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #EEDCCE',
                  padding: '60px 24px',
                  textAlign: 'center',
                }}>
                  <Coffee size={40} color="var(--amber-secondary)" style={{ margin: '0 auto 12px auto' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>No matches found</h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '18px' }}>
                    Try clearing some of your search terms or dietary filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setFilterVegan(false);
                      setFilterGlutenFree(false);
                      setFilterNoNuts(false);
                    }}
                    className="btn-secondary"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '22px',
                  marginBottom: '36px',
                }}>
                  {currentProducts.map(product => (
                    <div
                      key={product.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #EEDCCE',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'all 0.22s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                      }}
                    >
                      {/* Image container */}
                      <div style={{ position: 'relative', width: '100%', height: '160px', overflow: 'hidden' }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease',
                          }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        />

                        {/* Top Badge */}
                        <span style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          backgroundColor: '#9C430B',
                          color: '#FFFFFF',
                          fontSize: '10.5px',
                          fontWeight: '700',
                          padding: '3px 9px',
                          borderRadius: '9999px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        }}>
                          {product.badge}
                        </span>

                        {/* Bottom Right Tag */}
                        <span style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(255, 255, 255, 0.92)',
                          backdropFilter: 'blur(4px)',
                          color: 'var(--text-dark)',
                          fontSize: '10px',
                          fontWeight: '800',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          letterSpacing: '0.04em',
                        }}>
                          {product.tag}
                        </span>
                      </div>

                      {/* Content */}
                      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        {/* Rating row */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          color: 'var(--amber-secondary)',
                          marginBottom: '6px',
                        }}>
                          <Star size={13} fill="var(--amber-secondary)" color="var(--amber-secondary)" />
                          <span>{product.rating}</span>
                          <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>
                            ({product.reviewsCount})
                          </span>
                        </div>

                        {/* Title */}
                        <h3 style={{
                          fontSize: '15.5px',
                          fontWeight: '800',
                          color: 'var(--text-dark)',
                          marginBottom: '4px',
                          lineHeight: 1.3,
                        }}>
                          {product.name}
                        </h3>

                        {/* Description */}
                        <p style={{
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                          lineHeight: 1.5,
                          marginBottom: '14px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          {product.description}
                        </p>

                        {/* Bottom Row */}
                        <div style={{
                          marginTop: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '8px',
                        }}>
                          <div>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Price</span>
                            <span style={{
                              fontSize: '17px',
                              fontWeight: '800',
                              color: 'var(--text-dark)',
                              fontFamily: 'var(--font-heading)',
                            }}>
                              ${product.price.toFixed(2)}
                            </span>
                          </div>

                          <button
                            onClick={() => addToCart(product)}
                            style={{
                              backgroundColor: 'var(--amber-banner)',
                              color: '#FFFFFF',
                              fontSize: '12.5px',
                              fontWeight: '700',
                              padding: '8px 14px',
                              borderRadius: '9999px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              boxShadow: '0 2px 6px rgba(153, 59, 0, 0.25)',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.backgroundColor = 'var(--amber-banner-dark)';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.backgroundColor = 'var(--amber-banner)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            <ShoppingBag size={13} />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Special Fresh Crop Single Origin Banner Card (Matches Screenshot!) */}
                  {selectedCategory === 'all' && (
                    <div style={{
                      backgroundColor: '#9A4106',
                      borderRadius: '20px',
                      padding: '24px',
                      color: '#FFFFFF',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 8px 24px rgba(154, 65, 6, 0.3)',
                    }}>
                      <div>
                        <div style={{
                          fontSize: '10.5px',
                          fontWeight: '800',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#FCD34D',
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}>
                          <Sparkles size={13} />
                          {SINGLE_ORIGIN_SPECIAL.subtitle}
                        </div>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: '800',
                          color: '#FFFFFF',
                          marginBottom: '10px',
                        }}>
                          {SINGLE_ORIGIN_SPECIAL.name}
                        </h3>
                        <p style={{
                          fontSize: '12.5px',
                          color: '#FDEEE0',
                          lineHeight: 1.55,
                          marginBottom: '18px',
                        }}>
                          {SINGLE_ORIGIN_SPECIAL.notes}
                        </p>
                      </div>

                      <div>
                        <div style={{
                          fontSize: '22px',
                          fontWeight: '800',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-heading)',
                          marginBottom: '14px',
                        }}>
                          ${SINGLE_ORIGIN_SPECIAL.price.toFixed(2)}{' '}
                          <span style={{ fontSize: '12px', fontWeight: '500', color: '#FCD34D' }}>
                            / {SINGLE_ORIGIN_SPECIAL.weight}
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart({
                            id: SINGLE_ORIGIN_SPECIAL.id,
                            name: SINGLE_ORIGIN_SPECIAL.name,
                            price: SINGLE_ORIGIN_SPECIAL.price,
                            image: SINGLE_ORIGIN_SPECIAL.image,
                            customizationNote: '300g Whole Bean, Nitro Sealed',
                          })}
                          style={{
                            width: '100%',
                            backgroundColor: '#FFFFFF',
                            color: 'var(--amber-banner)',
                            fontWeight: '700',
                            fontSize: '13px',
                            padding: '11px',
                            borderRadius: '9999px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          }}
                        >
                          <ShoppingBag size={14} />
                          <span>Order Roaster Bag</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Pagination Bar */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '20px',
                borderTop: '1px solid #EEDCCE',
                fontSize: '13px',
                color: 'var(--text-muted)',
                gap: '16px',
              }}>
                <div>
                  Showing {currentProducts.length} of {filteredProducts.length} seasonal hand-crafted items
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: '600',
                      color: currentPage === 1 ? '#D3C2B4' : 'var(--text-dark)',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Previous
                  </button>

                  {[1, 2, 3].slice(0, totalPages || 1).map(page => {
                    const isCurrent = currentPage === page;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '700',
                          backgroundColor: isCurrent ? 'var(--amber-banner)' : '#FAF0E6',
                          color: isCurrent ? '#FFFFFF' : 'var(--text-dark)',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: '600',
                      color: currentPage === totalPages ? '#D3C2B4' : 'var(--text-dark)',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};
