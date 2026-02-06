-- 1) Create a separate table for sensitive profile data
CREATE TABLE IF NOT EXISTS public.profile_private (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  phone TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profile_private ENABLE ROW LEVEL SECURITY;

-- 2) Migrate existing sensitive fields from profiles into profile_private
INSERT INTO public.profile_private (
  user_id,
  phone,
  address_line1,
  address_line2,
  city,
  state,
  postal_code,
  country
)
SELECT
  user_id,
  phone,
  address_line1,
  address_line2,
  city,
  state,
  postal_code,
  country
FROM public.profiles
ON CONFLICT (user_id) DO UPDATE SET
  phone = EXCLUDED.phone,
  address_line1 = EXCLUDED.address_line1,
  address_line2 = EXCLUDED.address_line2,
  city = EXCLUDED.city,
  state = EXCLUDED.state,
  postal_code = EXCLUDED.postal_code,
  country = EXCLUDED.country;

-- 3) Drop sensitive columns from profiles (leave only non-sensitive identity fields)
ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS phone,
  DROP COLUMN IF EXISTS address_line1,
  DROP COLUMN IF EXISTS address_line2,
  DROP COLUMN IF EXISTS city,
  DROP COLUMN IF EXISTS state,
  DROP COLUMN IF EXISTS postal_code,
  DROP COLUMN IF EXISTS country,
  DROP COLUMN IF EXISTS email;

-- 4) Policies for profile_private (explicitly require authentication)
DROP POLICY IF EXISTS "Users can view own private profile" ON public.profile_private;
DROP POLICY IF EXISTS "Users can update own private profile" ON public.profile_private;
DROP POLICY IF EXISTS "Users can insert own private profile" ON public.profile_private;

CREATE POLICY "Users can view own private profile"
ON public.profile_private
FOR SELECT
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can update own private profile"
ON public.profile_private
FOR UPDATE
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can insert own private profile"
ON public.profile_private
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- 5) updated_at trigger for profile_private
DROP TRIGGER IF EXISTS update_profile_private_updated_at ON public.profile_private;
CREATE TRIGGER update_profile_private_updated_at
BEFORE UPDATE ON public.profile_private
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 6) Ensure signup trigger populates both tables
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Non-sensitive
  INSERT INTO public.profiles (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  -- Sensitive (kept separate)
  INSERT INTO public.profile_private (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  -- Default role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;