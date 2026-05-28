export interface Database {
  public: {
    Tables: {
      session_types: {
        Row: {
          id: string;
          name: string;
          description: string;
          duration_minutes: number;
          features: string[];
          is_online: boolean;
          is_in_person: boolean;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          duration_minutes: number;
          features?: string[];
          is_online?: boolean;
          is_in_person?: boolean;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string;
          duration_minutes?: number;
          features?: string[];
          is_online?: boolean;
          is_in_person?: boolean;
          is_active?: boolean;
          display_order?: number;
        };
      };
      availability: {
        Row: {
          id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          is_available: boolean;
          session_type_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          is_available?: boolean;
          session_type_id?: string | null;
        };
        Update: {
          day_of_week?: number;
          start_time?: string;
          end_time?: string;
          is_available?: boolean;
        };
      };
      bookings: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          city: string | null;
          country: string | null;
          preferred_contact: string;
          session_type_id: string;
          session_date: string | null;
          session_time: string | null;
          timezone: string | null;
          session_mode: 'online' | 'in-person';
          message: string | null;
          status: 'pending' | 'confirmed' | 'completed';
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          city?: string | null;
          country?: string | null;
          preferred_contact?: string;
          session_type_id: string;
          session_date?: string | null;
          session_time?: string | null;
          timezone?: string | null;
          session_mode?: 'online' | 'in-person';
          message?: string | null;
          status?: 'pending' | 'confirmed' | 'completed';
          notes?: string | null;
        };
        Update: {
          full_name?: string;
          email?: string;
          phone?: string;
          city?: string | null;
          country?: string | null;
          preferred_contact?: string;
          session_type_id?: string;
          session_date?: string | null;
          session_time?: string | null;
          timezone?: string | null;
          session_mode?: 'online' | 'in-person';
          message?: string | null;
          status?: 'pending' | 'confirmed' | 'completed';
          notes?: string | null;
        };
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          category?: string;
          display_order?: number;
          is_active?: boolean;
        };
        Update: {
          question?: string;
          answer?: string;
          category?: string;
          display_order?: number;
          is_active?: boolean;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type SessionType = Database['public']['Tables']['session_types']['Row'];
export type FAQ = Database['public']['Tables']['faqs']['Row'];
export type Booking = Database['public']['Tables']['bookings']['Row'];
export type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
export type Availability = Database['public']['Tables']['availability']['Row'];
