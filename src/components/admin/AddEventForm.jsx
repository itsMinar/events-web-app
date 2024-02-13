'use client';

import { addEvent } from '@/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEdgeStore } from '@/lib/edgestore';
import { createSlug } from '@/lib/utils';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

const initialData = {
  name: '',
  availableTickets: 0,
  city: '',
  date: '',
  description: '',
  location: '',
  organizerName: '',
};

export default function AddEventForm() {
  const [eventInfo, setEventInfo] = useState(initialData);
  const [imgFile, setImgFile] = useState(null);
  const [pending, setPending] = useState(false);
  const { edgestore } = useEdgeStore();
  const imgInputRef = useRef();

  const handleInputChange = (e) => {
    setEventInfo((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const uploadImageToEdgeStore = async (file) => {
    try {
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
        });

        return res;
      }
    } catch (error) {
      return error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setPending(true);
      const imgUploadRes = await uploadImageToEdgeStore(imgFile);

      const fullInfo = {
        ...eventInfo,
        imageUrl: imgUploadRes.url,
        slug: createSlug(eventInfo.name, eventInfo.city),
      };

      const response = await addEvent(fullInfo);

      if (response.success) {
        imgInputRef.current.value = '';
        setEventInfo(initialData);
        setImgFile(null);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(response.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                name="name"
                value={eventInfo.name}
                onChange={handleInputChange}
                placeholder="Music Festival"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organizerName">Organizer Name</Label>
              <Input
                id="organizerName"
                name="organizerName"
                value={eventInfo.organizerName}
                onChange={handleInputChange}
                placeholder="Music World Inc"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={eventInfo.city}
                onChange={handleInputChange}
                placeholder="Dhaka"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={eventInfo.location}
                onChange={handleInputChange}
                placeholder="Army Stadium"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availableTickets">Available Tickets</Label>
              <Input
                id="availableTickets"
                name="availableTickets"
                value={eventInfo.availableTickets}
                onChange={handleInputChange}
                placeholder="100"
                required
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                value={eventInfo.date}
                onChange={handleInputChange}
                required
                type="date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventCover">Cover Photo</Label>
              <Input
                ref={imgInputRef}
                id="eventCover"
                name="eventCover"
                onChange={(e) => {
                  setImgFile(e.target.files?.[0]);
                }}
                required
                type="file"
                accept="image/*"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={eventInfo.description}
                onChange={handleInputChange}
                placeholder="Enter a brief description of the event."
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit" disabled={pending} className="w-2/12">
              {pending ? 'Adding...' : 'Add Event'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
