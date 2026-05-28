'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, addDays } from 'date-fns';
import { Loader2, CheckCircle2, AlertCircle, Calendar as CalendarIcon, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase/client';
import { SessionType } from '@/lib/supabase/types';
import { toast } from 'sonner';

const bookingSchema = z.object({
  full_name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  city: z.string().optional(),
  country: z.string().min(2, 'Please select your country'),
  preferred_contact: z.enum(['email', 'phone', 'whatsapp']),
  session_type_id: z.string().min(1, 'Please select a session type'),
  session_mode: z.enum(['online', 'in-person']),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  sessionTypes: SessionType[];
}

const countries = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Singapore', 'UAE', 'Other'
].sort();

const timeSlots = [
  '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
];

const timeZones = [
  { value: 'Asia/Kolkata', label: 'India (IST)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
];

export function BookingForm({ sessionTypes }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionType | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      preferred_contact: 'email',
      session_mode: 'online',
    },
  });

  const watchSessionTypeId = watch('session_type_id');

  // Auto-detect timezone
  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const matchedTz = timeZones.find(tz => tz.value === userTimezone);
    setSelectedTimezone(matchedTz?.value || 'Asia/Kolkata');
  }, []);

  // Update selected session
  useEffect(() => {
    if (watchSessionTypeId) {
      const session = sessionTypes.find(s => s.id === watchSessionTypeId);
      setSelectedSession(session || null);
    }
  }, [watchSessionTypeId, sessionTypes]);

  // Disable past dates and Sundays
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      const bookingData = {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        city: data.city || null,
        country: data.country,
        preferred_contact: data.preferred_contact,
        session_type_id: data.session_type_id,
        session_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null,
        session_time: selectedTime || null,
        timezone: selectedTimezone,
        session_mode: data.session_mode as 'online' | 'in-person',
        message: data.message || null,
        status: 'pending' as const,
      };

      const { error } = await supabase
        .from('bookings')
        .insert([bookingData as never]);

      if (error) throw error;

      // Send notification email via edge function
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/booking-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            full_name: data.full_name,
            email: data.email,
            phone: data.phone,
            city: data.city,
            country: data.country,
            preferred_contact: data.preferred_contact,
            session_type: selectedSession?.name,
            session_mode: data.session_mode,
            session_date: selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : undefined,
            session_time: selectedTime,
            timezone: selectedTimezone,
            message: data.message,
          }),
        });
      } catch (notifyError) {
        console.error('Notification error:', notifyError);
        // Continue even if notification fails
      }

      setIsSuccess(true);
      toast.success('Your booking request has been submitted!');

    } catch (error) {
      console.error('Booking error:', error);
      toast.error('There was an error submitting your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-sage-50 to-lavender-50 border-none">
        <div className="w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-sage-600" />
        </div>
        <h3 className="text-2xl text-navy-900 mb-4">Booking Request Received</h3>
        <p className="text-navy-600 text-lg mb-6 max-w-md mx-auto leading-relaxed">
          Thank you for your interest. We have received your booking request and
          will contact you within 24 hours to confirm your session.
        </p>
        <div className="bg-white rounded-xl p-6 max-w-sm mx-auto text-left space-y-4 mb-8">
          <p className="text-navy-600">
            <span className="font-medium text-navy-900">Date:</span>{' '}
            {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'To be confirmed'}
          </p>
          <p className="text-navy-600">
            <span className="font-medium text-navy-900">Time:</span>{' '}
            {selectedTime || 'To be confirmed'}
          </p>
          <p className="text-navy-600">
            <span className="font-medium text-navy-900">Session:</span>{' '}
            {selectedSession?.name}
          </p>
          <p className="text-navy-600">
            <span className="font-medium text-navy-900">Mode:</span>{' '}
            {watch('session_mode') === 'online' ? 'Online (Video Call)' : 'In-Person'}
          </p>
        </div>
        <p className="text-navy-500 text-base mb-6">
          A confirmation email has been sent with your booking details.
        </p>
        <Button
          className="btn-primary"
          onClick={() => {
            setIsSuccess(false);
            setSelectedDate(undefined);
            setSelectedTime('');
          }}
        >
          Submit Another Request
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto">
      {/* Contact Information */}
      <div className="space-y-6 mb-12">
        <h3 className="text-2xl text-navy-900 border-b border-navy-100 pb-3">
          Your Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-lg text-navy-700">
              Full Name *
            </Label>
            <Input
              id="full_name"
              {...register('full_name')}
              placeholder="Enter your full name"
              className="h-16 text-lg px-5 border-2"
            />
            {errors.full_name && (
              <p className="text-red-500 text-base flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {errors.full_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg text-navy-700">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your@email.com"
              className="h-16 text-lg px-5 border-2"
            />
            {errors.email && (
              <p className="text-red-500 text-base flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-lg text-navy-700">
              Phone Number *
            </Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="+91 63514 33751"
              className="h-16 text-lg px-5 border-2"
            />
            {errors.phone && (
              <p className="text-red-500 text-base flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-lg text-navy-700">
              Country *
            </Label>
            <select
              id="country"
              {...register('country')}
              className="flex h-16 w-full rounded-lg border-2 border-input bg-background px-5 py-3 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select your country</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 text-base flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {errors.country.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-lg text-navy-700">
              City (Optional)
            </Label>
            <Input
              id="city"
              {...register('city')}
              placeholder="Your city"
              className="h-16 text-lg px-5 border-2"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg text-navy-700">
              Preferred Contact Method *
            </Label>
            <RadioGroup
              defaultValue="email"
              onValueChange={(value) => setValue('preferred_contact', value as 'email' | 'phone' | 'whatsapp')}
              className="flex gap-8 pt-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="email" id="contact-email" className="w-5 h-5" />
                <Label htmlFor="contact-email" className="text-lg font-normal">Email</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="phone" id="contact-phone" className="w-5 h-5" />
                <Label htmlFor="contact-phone" className="text-lg font-normal">Phone</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="whatsapp" id="contact-whatsapp" className="w-5 h-5" />
                <Label htmlFor="contact-whatsapp" className="text-lg font-normal">WhatsApp</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Session Selection */}
      <div className="space-y-6 mb-12">
        <h3 className="text-2xl text-navy-900 border-b border-navy-100 pb-3">
          Session Details
        </h3>

        <div className="space-y-2">
          <Label htmlFor="session_type" className="text-lg text-navy-700">
            Select Session Type *
          </Label>
          <select
            id="session_type"
            {...register('session_type_id')}
            className="flex h-16 w-full rounded-lg border-2 border-input bg-background px-5 py-3 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Choose a session type</option>
            {sessionTypes.map(session => (
              <option key={session.id} value={session.id}>
                {session.name} - {session.duration_minutes} min
              </option>
            ))}
          </select>
          {errors.session_type_id && (
            <p className="text-red-500 text-base flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {errors.session_type_id.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-lg text-navy-700">
            Session Mode *
          </Label>
          <RadioGroup
            defaultValue="online"
            onValueChange={(value) => setValue('session_mode', value as 'online' | 'in-person')}
            className="flex gap-8 pt-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="online" id="mode-online" className="w-5 h-5" />
              <Label htmlFor="mode-online" className="text-lg font-normal">Online (Video Call)</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="in-person" id="mode-in-person" className="w-5 h-5" />
              <Label htmlFor="mode-in-person" className="text-lg font-normal">In-Person</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Preferred Date & Time */}
      <div className="space-y-6 mb-12">
        <h3 className="text-2xl text-navy-900 border-b border-navy-100 pb-3">
          Preferred Date & Time (Optional)
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label className="text-lg text-navy-700">
              Preferred Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full h-16 justify-start text-left text-lg font-normal border-2',
                    !selectedDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-3 h-5 w-5" />
                  {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  initialFocus
                  fromDate={new Date()}
                  toDate={addDays(new Date(), 90)}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Zone */}
          <div className="space-y-2">
            <Label className="text-lg text-navy-700 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Your Timezone
            </Label>
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="flex h-16 w-full rounded-lg border-2 border-input bg-background px-5 py-3 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {timeZones.map(tz => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-3">
          <Label className="text-lg text-navy-700 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Preferred Time
          </Label>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-3">
            {timeSlots.map(time => (
              <Button
                key={time}
                type="button"
                variant={selectedTime === time ? 'default' : 'outline'}
                className={cn(
                  'h-14 text-base border-2',
                  selectedTime === time && 'bg-sage-500 hover:bg-sage-600 text-white'
                )}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
          <p className="text-navy-500 text-base">
            Times shown are for your selected timezone. We will confirm availability.
          </p>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-6 mb-12">
        <h3 className="text-2xl text-navy-900 border-b border-navy-100 pb-3">
          Additional Information (Optional)
        </h3>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-lg text-navy-700">
            Is there anything you'd like to share?
          </Label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder="Share any questions, concerns, or information you'd like us to know before your session..."
            className="min-h-[140px] text-lg p-5 border-2"
          />
          <p className="text-navy-500 text-base">
            This information helps us prepare for your session.
          </p>
        </div>
      </div>

      {/* Submit */}
      <div className="bg-gradient-to-r from-sage-50 to-lavender-50 rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <p className="text-lg text-navy-600 mb-2">
            Submit your booking request
          </p>
          <p className="text-navy-500 text-base">
            We will contact you within 24 hours to confirm your session.
          </p>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full btn-primary text-xl py-7 h-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Booking Request'
          )}
        </Button>

        <p className="text-center text-navy-500 text-base">
          By submitting, you agree to our{' '}
          <a href="#footer" className="text-sage-600 hover:underline">Privacy Policy</a>
          {' '}and{' '}
          <a href="#footer" className="text-sage-600 hover:underline">Terms</a>.
        </p>
      </div>
    </form>
  );
}
