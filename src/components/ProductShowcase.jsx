import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { homeData } from '../data/homeData.jsx';

const ProductShowcase = () => {
  const { t } = useLanguage();
  const { showcase } = homeData;
  const { header, settings, items } = showcase;
  const x = useMotionValue(0);

  return (
    <section className="product-showcase-section" style={{
      padding: '220px 0 160px 0',
      backgroundColor: '#000',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', marginBottom: '80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '4px',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '20px',
            textTransform: 'uppercase'
          }}>
            {t(header.badgeKey)}
          </div>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            letterSpacing: '-2px',
            margin: 0,
            color: '#fff',
            textTransform: 'uppercase'
          }}>
            {t(header.titleKey)}
          </h2>
        </motion.div>
      </div>

      <div style={{ position: 'relative' }}>
        <motion.div
          style={{
            display: 'flex',
            gap: '40px',
            paddingLeft: 'max(20px, calc((100% - 1200px) / 2))',
            paddingRight: 'max(20px, calc((100% - 1200px) / 2))',
            cursor: 'grab',
            x
          }}
          drag="x"
          dragConstraints={{ left: settings.dragRange, right: 0 }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {items.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index} 
              dragX={x} 
              settings={settings}
            />
          ))}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .product-showcase-section {
          background: radial-gradient(circle at 50% -20%, rgba(138, 43, 226, 0.15) 0%, transparent 50%);
        }
      `}} />
    </section>
  );
};

const ProductCard = ({ product, index, dragX, settings }) => {
  const { t } = useLanguage();
  
  // Parallax effect for image
  const imgX = useTransform(dragX, [settings.dragRange, 0], settings.parallaxRange);

  // Variants for organized animations
  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { delay: index * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }
    },
    hover: {
      borderColor: 'rgba(138, 43, 226, 0.5)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
      transition: { duration: 0.4 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      style={{
        minWidth: settings.cardWidth,
        height: settings.cardHeight,
        backgroundColor: '#0a0a0a',
        borderRadius: settings.borderRadius,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        cursor: 'pointer',
        pointerEvents: 'auto'
      }}
    >
      {/* Background Image with Parallax */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <motion.img
          src={product.image}
          alt={t(product.titleKey)}
          style={{
            position: 'absolute',
            top: 0,
            left: '-20%',
            width: '140%',
            minWidth: '140%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.5,
            x: imgX
          }}
          variants={{
            hover: { scale: 1.05, opacity: 0.7 }
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        {/* Dark Overlay Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.9) 80%)',
          zIndex: 1
        }} />
      </div>
      
      {/* Powered by Aevum Branding */}
      <div style={{
        position: 'absolute',
        top: '32px',
        right: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        zIndex: 10,
        opacity: 0.8
      }}>
        <span style={{
          fontSize: '0.6rem',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Powered By
        </span>
        <div style={{
          width: '1px',
          height: '12px',
          backgroundColor: 'rgba(255,255,255,0.2)'
        }} />
        <span style={{
          fontSize: '0.85rem',
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '4px',
          textTransform: 'uppercase'
        }}>
          Aevum
        </span>
      </div>

      {/* Content Overlay */}
      <motion.div 
        variants={contentVariants}
        style={{ 
          padding: '40px', 
          position: 'relative', 
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%'
        }}
      >
        <div>
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '6px',
            fontSize: '0.65rem',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '12px',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {product.tag}
          </div>
          <h3 style={{
            fontSize: '2.2rem',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-1.5px',
            margin: 0,
            lineHeight: 1
          }}>
            {t(product.titleKey)}
          </h3>
        </div>

        <p style={{
          fontSize: '1rem',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.6)',
          fontWeight: 400,
          margin: 0,
          maxWidth: '90%'
        }}>
          {t(product.descKey)}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#fff',
          fontSize: '0.8rem',
          fontWeight: 700,
          cursor: 'pointer',
          marginTop: '10px'
        }}>
          <span style={{ 
            paddingBottom: '2px', 
            borderBottom: '2px solid rgba(138, 43, 226, 1)' 
          }}>
            EXPLORE DEMO
          </span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductShowcase;
