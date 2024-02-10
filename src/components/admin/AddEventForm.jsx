'use client';

import { addEvent } from '@/actions';
import { useEdgeStore } from '@/lib/edgestore';
import { createSlug } from '@/lib/utils';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import InputWithLabel from './InputWithLabel';

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
    <div className="ml-6 mt-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputWithLabel
          label="Event Name"
          fieldName="name"
          value={eventInfo.name}
          onChange={handleInputChange}
        />
        <InputWithLabel
          label="Organizer's Name"
          fieldName="organizerName"
          value={eventInfo.organizerName}
          onChange={handleInputChange}
        />
        <InputWithLabel
          label="City"
          fieldName="city"
          value={eventInfo.city}
          onChange={handleInputChange}
        />
        <InputWithLabel
          label="Location"
          fieldName="location"
          value={eventInfo.location}
          onChange={handleInputChange}
        />
        <InputWithLabel
          label="Total Tickets"
          fieldName="availableTickets"
          type="number"
          value={eventInfo.availableTickets}
          onChange={handleInputChange}
        />
        <div className="flex flex-col gap-1">
          <label className="text-lg" htmlFor="eventCover">
            Event Cover Photo
          </label>
          <input
            required
            ref={imgInputRef}
            type="file"
            accept="image/*"
            id="eventCover"
            name="eventCover"
            onChange={(e) => {
              setImgFile(e.target.files?.[0]);
            }}
            className="w-2/3 rounded-md border bg-transparent py-1 pl-2 text-lg"
          />
        </div>
        <InputWithLabel
          label="Date"
          fieldName="date"
          type="date"
          value={eventInfo.date}
          onChange={handleInputChange}
        />
        <div className="flex flex-col gap-1">
          <label className="text-lg" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="8"
            value={eventInfo.description}
            onChange={handleInputChange}
            className="w-2/3 rounded-md border bg-transparent py-1 pl-2 text-lg"
          ></textarea>
        </div>

        <Button disabled={pending} type="submit">
          {pending ? 'Adding...' : 'Add Event'}
        </Button>
      </form>
    </div>
  );
}
