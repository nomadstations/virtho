
import React, { useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { initializeCheckout } from '@/api/EcommerceApi';
import { useToast } from '@/hooks/use-toast';

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { toast } = useToast();
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

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setIsCartOpen(false)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50 }}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="glossy-dropdown fixed right-0 top-0 h-full w-full max-w-md shadow-2xl flex flex-col z-50 rounded-l-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'fixed', top: 0, right: 0, height: '100vh', zIndex: 50 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
              <Button 
                onClick={() => setIsCartOpen(false)} 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10 transition-colors"
                aria-label="Close shopping cart"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-300 h-full flex flex-col items-center justify-center">
                  <ShoppingCartIcon className="w-12 h-12 mb-4 text-white/60" />
                  <p className="text-base font-medium text-white">Your cart is empty.</p>
                  <p className="text-sm mt-2 text-gray-400">Add some products to get started!</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.variant.id} className="glossy-dropdown-item flex gap-4 p-3 rounded-lg">
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
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center text-white">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-2xl font-bold">{getCartTotal()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="glossy-dropdown-button w-full py-3 rounded-lg font-semibold text-base"
                >
                  Proceed to Checkout
                </button>
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
