import create from 'zustand';

interface PaymentState {
  status: 'idle' | 'processing' | 'success' | 'failed';
  setStatus: (status: PaymentState['status']) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  status: 'idle',
  setStatus: (status) => set({ status }),
}));
