/*
# Create Authorized Users Table
This migration creates a table to manage authorized email addresses for access control.

## Query Description: 
This operation creates a new table to store authorized user emails for application access control. This is a safe operation that creates new database structures without affecting existing data. No backup is required as this only adds new functionality.

## Metadata:
- Schema-Category: "Safe"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: authorized_users
- Columns: id (UUID), email (text), created_at (timestamp)
- Constraints: Primary key on id, unique constraint on email
- Indexes: Unique index on email for fast lookups

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes - read-only access for authenticated users
- Auth Requirements: Users must be authenticated to read authorized emails

## Performance Impact:
- Indexes: Added unique index on email column
- Triggers: None
- Estimated Impact: Minimal - single table with unique index for fast email lookups
*/

-- Create authorized_users table
CREATE TABLE IF NOT EXISTS public.authorized_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create unique index on email for fast lookups
CREATE UNIQUE INDEX IF NOT EXISTS idx_authorized_users_email ON public.authorized_users (email);

-- Enable Row Level Security
ALTER TABLE public.authorized_users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read authorized emails
CREATE POLICY "Authenticated users can read authorized emails" ON public.authorized_users
    FOR SELECT USING (auth.role() = 'authenticated');

-- Insert the initial authorized users
INSERT INTO public.authorized_users (email) VALUES 
    ('shubhsoch@gmail.com'),
    ('rohan@dualite.dev')
ON CONFLICT (email) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER handle_authorized_users_updated_at
    BEFORE UPDATE ON public.authorized_users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
