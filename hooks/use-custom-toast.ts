import { useRouter } from 'next/router';
import { useToast } from '@/hooks/use-toast';

const useCustomToast = () => {
  const { isReady } = useRouter();
  const toast = useToast();

  if (!isReady) {
    return null;
  }

  return toast;
};

export default useCustomToast;