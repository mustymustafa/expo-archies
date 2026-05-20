// Lightweight cart store — React Context + reducer. No external deps.
// Items are keyed by a stable line-id so the same dish with different
// "without"/"extras" choices stack as separate lines rather than collapsing.
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import type { FoodKey } from '@/lib/foodImages';

export type CartLine = {
  id: string;
  slug: string;
  name: string;
  image: FoodKey;
  unitPrice: number;
  qty: number;
  removed?: string[];
  extras?: { id: string; label: string; deltaGBP: number }[];
};

type State = { lines: CartLine[] };

type Action =
  | { type: 'add'; line: CartLine }
  | { type: 'remove'; id: string }
  | { type: 'inc'; id: string }
  | { type: 'dec'; id: string }
  | { type: 'clear' };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'add': {
      const existing = s.lines.find((l) => l.id === a.line.id);
      if (existing) {
        return {
          lines: s.lines.map((l) =>
            l.id === a.line.id ? { ...l, qty: l.qty + a.line.qty } : l,
          ),
        };
      }
      return { lines: [...s.lines, a.line] };
    }
    case 'remove':
      return { lines: s.lines.filter((l) => l.id !== a.id) };
    case 'inc':
      return {
        lines: s.lines.map((l) => (l.id === a.id ? { ...l, qty: l.qty + 1 } : l)),
      };
    case 'dec':
      return {
        lines: s.lines
          .map((l) => (l.id === a.id ? { ...l, qty: l.qty - 1 } : l))
          .filter((l) => l.qty > 0),
      };
    case 'clear':
      return { lines: [] };
  }
}

type Ctx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (line: Omit<CartLine, 'id'> & { id?: string }) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });

  const add: Ctx['add'] = useCallback((partial) => {
    const id = partial.id ?? makeLineId(partial);
    dispatch({ type: 'add', line: { ...partial, id } });
  }, []);
  const remove = useCallback((id: string) => dispatch({ type: 'remove', id }), []);
  const inc = useCallback((id: string) => dispatch({ type: 'inc', id }), []);
  const dec = useCallback((id: string) => dispatch({ type: 'dec', id }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo<Ctx>(() => {
    const count = state.lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = state.lines.reduce((n, l) => n + l.unitPrice * l.qty, 0);
    return { lines: state.lines, count, subtotal, add, remove, inc, dec, clear };
  }, [state.lines, add, remove, inc, dec, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): Ctx {
  const v = useContext(CartContext);
  if (!v) throw new Error('useCart used outside CartProvider');
  return v;
}

function makeLineId(line: Pick<CartLine, 'slug' | 'removed' | 'extras'>): string {
  const rem = (line.removed ?? []).slice().sort().join(',');
  const ext = (line.extras ?? [])
    .map((e) => e.id)
    .slice()
    .sort()
    .join(',');
  return `${line.slug}|r:${rem}|e:${ext}`;
}
