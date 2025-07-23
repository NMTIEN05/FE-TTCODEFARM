import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistService } from '../services/wishlist.service';
import { IWishlistRequest } from '../types/Wishlist';

export const useWishlist = () => {
  const queryClient = useQueryClient();

  const addToWishlistMutation = useMutation({
    mutationFn: (data: IWishlistRequest) => wishlistService.addToWishlist(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: ({ book_id, user_id }: { book_id: string; user_id: string }) =>
      wishlistService.removeFromWishlist(book_id, user_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  return {
    addToWishlist: addToWishlistMutation.mutate,
    removeFromWishlist: removeFromWishlistMutation.mutate,
    isAddingToWishlist: addToWishlistMutation.isPending,
    isRemovingFromWishlist: removeFromWishlistMutation.isPending,
  };
};