-- Drop existing select policy and replace with a more secure one
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Create new policy that explicitly requires authentication
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);