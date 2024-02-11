'use client';

import { deleteEvent } from '@/actions';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DeleteEventButton({ slug }) {
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    try {
      setPending(true);
      const response = await deleteEvent(slug);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <Button disabled={pending} onClick={handleDelete} size="sm">
      {pending ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
