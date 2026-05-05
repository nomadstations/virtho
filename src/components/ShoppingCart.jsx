
import React, { useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { initializeCheckout } from '@/api/EcommerceApi';
import { useToast } from '@/hooks/use-toast';
import styles from '@/styles/HeaderPopups.module.css';

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const totalItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Your cart is empty',
        description: 'Add some products to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const items = cartItems.map(item => ({
        variant_id: item.variant.id,
        quantity: item.quantity,
      }));

      const successUrl = `${window.location.origin}/success`;
      const cancelUrl = window.location.href;

      const { url } = await initializeCheckout({ items, successUrl, cancelUrl });

      clearCart();
      window.location.href = url;
    } catch (error) {
      toast({
        title: 'Checkout Error',
        description: 'There was a problem initializing checkout. Please try again.',
        variant: 'destructive',
      });
    }
  }, [cartItems, clearCart, toast]);

  const handleNavigateToMarketplace = useCallback(() => {
    setIsCartOpen(false);
    navigate('/marketplace');
  }, [navigate, setIsCartOpen]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.popupOverlay}
            onClick={() => setIsCartOpen(false)}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={styles.headerPopup}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.popupHeader}>
              <h2>Shopping Cart</h2>
              <Button 
                onClick={() => setIsCartOpen(false)} 
                variant="ghost" 
                size="icon" 
                aria-label="Close shopping cart"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className={styles.popupContent}>
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                  <ShoppingCartIcon className="w-14 h-14 text-white mb-6 stroke-[1.5]" style={{ color: 'white', fill: 'none' }} />
                  <p className="text-white text-lg font-light mb-3 tracking-tight">Your cart is empty</p>
                  <button
                    onClick={handleNavigateToMarketplace}
                    className="text-white text-base font-light cursor-pointer transition-all duration-300 hover:underline hover:shadow-[0_0_8px_rgba(255,255,255,0.4)] tracking-wide"
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNavigateToMarketplace();
                      }
                    }}
                  >
                    Add some products to get started
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.variant.id} className={`${styles.popupItem} flex gap-4`}>
                      <img 
                        src={item.product.image} 
                        alt={item.product.title} 
                        className="w-20 h-20 object-cover rounded-md flex-shrink-0" 
                      />
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-white text-sm truncate">{item.product.title}</h3>
                        <p className="text-xs text-gray-300 truncate">{item.variant.title}</p>
                        <p className="text-sm text-purple-300 font-bold mt-1">
                          {item.variant.sale_price_formatted}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <div className="flex items-center border border-white/20 rounded-md overflow-hidden bg-white/5">
                          <button 
                            onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))} 
                            className="p-1.5 text-white hover:bg-white/10 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-white text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.variant.id, item.quantity + 1)} 
                            className="p-1.5 text-white hover:bg-white/10 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.variant.id)} 
                          className="flex items-center gap-1 text-red-400 hover:text-red-300 text-xs transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className={styles.popupFooter}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-white">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-2xl font-bold">{getCartTotal()}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 rounded-lg font-semibold text-base bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transition-all shadow-lg hover:shadow-xl"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ShoppingCart;
