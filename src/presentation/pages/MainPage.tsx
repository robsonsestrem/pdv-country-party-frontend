import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Button,
  Box,
  TextField,
  Stack,
  IconButton,
  useTheme,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Product } from '@/domain/Product';
import { LastOrder } from '@/domain/LastOrder';

const products: Product[] = [
  { id_product: 1, name: 'ÁGUA', unit_price: 2, status: 'A', insertion_date: '' },
  { id_product: 2, name: 'PIPOCA', unit_price: 3, status: 'A', insertion_date: '' },
  { id_product: 3, name: 'DOCINHO', unit_price: 2, status: 'A', insertion_date: '' },
  { id_product: 4, name: 'CUPCAKE', unit_price: 4, status: 'A', insertion_date: '' },
  { id_product: 5, name: 'QUENTÃO', unit_price: 4, status: 'A', insertion_date: '' },
  { id_product: 6, name: 'PESCARIA', unit_price: 5, status: 'A', insertion_date: '' },
  { id_product: 7, name: 'REFRIGERANTE', unit_price: 3, status: 'A', insertion_date: '' },
  { id_product: 8, name: 'LANCHE', unit_price: 5, status: 'A', insertion_date: '' },
  { id_product: 9, name: 'PINHÃO', unit_price: 10, status: 'A', insertion_date: '' },
  { id_product: 10, name: 'SUCO', unit_price: 4, status: 'A', insertion_date: '' },
  { id_product: 11, name: 'TIRO AO ALVO', unit_price: 6, status: 'A', insertion_date: '' },
];

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const MainPage: React.FC = () => {
  const theme = useTheme();
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [paidValue, setPaidValue] = useState<number>(0);
  const [lastOrders, setLastOrders] = useState<LastOrder[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id_product === product.id_product);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id_product === product.id_product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id_product === product.id_product);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((item) =>
          item.product.id_product === product.id_product
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prev.filter((item) => item.product.id_product !== product.id_product);
      }
    });
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.unit_price * item.quantity,
      0
    );
    return total - discountValue;
  };

  const calculateTroco = () => {
    const troco = paidValue - calculateTotal();
    return troco >= 0 ? troco : 0;
  };

  const handleFinalizeOrder = () => {
    const orderTotal = calculateTotal();
    const troco = calculateTroco();

    const newOrder: LastOrder = {
      customerName: customerName || 'Anônimo',
      total: orderTotal,
      itemsCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      troco,
    };

    setLastOrders((prev) => [newOrder, ...prev.slice(0, 2)]); // mantém 3 últimos

    setCartItems([]);
    setCustomerName('');
    setDiscountValue(0);
    setPaidValue(0);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      bgcolor: theme.palette.background.default,
    }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: theme.palette.secondary.main }}>
        <Toolbar>
          <Typography variant="h6">PDV - Country Party 🎉 🎉 🎉</Typography>
        </Toolbar>
      </AppBar>

      {/* Corpo principal */}
      <Box sx={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        p: 2,
        gap: 2
      }}>
        {/* Seção de Produtos */}
        <Box sx={{
          flex: '0 0 60%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
           Últimos Pedidos
          </Typography>
          <Box sx={{
            display: 'flex',
            gap: 2,
            mb: 2,
            overflowX: 'auto'
          }}>
            {lastOrders.map((order, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  p: 2,
                  minWidth: 220,
                  bgcolor: theme.palette.background.paper
                }}
              >
                <Typography variant="subtitle1" gutterBottom>Cliente: {order.customerName}</Typography>
                <Typography variant="body2">Total: {currencyFormatter.format(order.total)}</Typography>
                <Typography variant="body2">Troco: {currencyFormatter.format(order.troco)}</Typography>
                <Typography variant="body2">Itens: {order.itemsCount}</Typography>
              </Paper>
            ))}
          </Box>

          <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            Produtos
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 2,
            overflowY: 'auto',
            flex: 1,
            pr: 1
          }}>
            {products.map((product) => (
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center', bgcolor: theme.palette.background.paper }} key={product.id_product}>
                <Typography variant="subtitle1">{product.name}</Typography>
                <Typography variant="h6">{currencyFormatter.format(product.unit_price)}</Typography>
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    <AddCircleIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    <RemoveCircleIcon fontSize="large" />
                  </IconButton>
                </Stack>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Seção do Carrinho */}
        <Box sx={{
          flex: '0 0 40%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          bgcolor: theme.palette.primary.contrastText
        }}>
          <Typography variant="h5" gutterBottom sx={{ mt: 1, px: 1, color: theme.palette.text.primary }}>
            Carrinho
          </Typography>
          <Box sx={{
            overflowY: 'auto',
            flex: 1,
            mb: 2,
            pr: 1,
            px: 1
          }}>
            {cartItems.map((item) => (
              <Paper
                key={item.product.id_product}
                elevation={2}
                sx={{ p: 1, mb: 1, display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography>
                  {item.product.name} x {item.quantity}
                </Typography>
                <Typography>
                  {currencyFormatter.format(item.product.unit_price * item.quantity)}
                </Typography>
              </Paper>
            ))}
          </Box>

          {/* Área de pagamento */}
          <Box sx={{ mt: 'auto', px: 1 }}>
            <TextField
              fullWidth
              label="Identificação do Cliente (opcional)"
              variant="outlined"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Desconto (R$)"
              type="number"
              variant="outlined"
              value={discountValue}
              onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Valor Pago (R$)"
              type="number"
              variant="outlined"
              value={paidValue}
              onChange={(e) => setPaidValue(parseFloat(e.target.value) || 0)}
              sx={{ mb: 2 }}
            />
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
            Total: {currencyFormatter.format(calculateTotal())}
          </Typography>
            {calculateTroco() > 0 && (
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: 'green',
                  animation: 'blinker 1s linear infinite',
                  '@keyframes blinker': {
                    '50%': { opacity: 0.5 }
                  }
                }}
              >
                Troco: {currencyFormatter.format(calculateTroco())}
              </Typography>
            )}
            <Button
              variant="contained"
              sx={{ bgcolor: theme.palette.text.secondary, py: 1.5 }}
              fullWidth
              onClick={handleFinalizeOrder}
              disabled={calculateTotal() < 0}
            >
              Finalizar Pedido
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{
        p: 1,
        textAlign: 'center',
        bgcolor: theme.palette.warning.main
      }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>Versão 1.0 — {new Date().toLocaleDateString()}</Typography>
      </Box>
    </Box>
  );
};

export default MainPage;
