import { Role } from './Role';

export interface User {
  id?: number;
  name?: string;
  lastname?: string | null;
  email?: string;
  phone?: string | null;
  image?: string | null;
  profile_image?: string | null;
  notification_token?: string | null;
  is_active?: boolean;
  roles?: Role[];
  created_at?: string;
  updated_at?: string;
}

// named export only
