-- Add reserved_at column to gifts table if it doesn't exist
ALTER TABLE public.gifts 
ADD COLUMN IF NOT EXISTS reserved_at TIMESTAMP WITH TIME ZONE;

-- Create trigger function for gift reservation handling
CREATE OR REPLACE FUNCTION public.gifts_reservation_guard()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    -- If reserving
    IF (NEW.is_reserved = true) THEN
      IF (OLD.is_reserved = true) THEN
        RAISE EXCEPTION 'Gift is already reserved';
      END IF;
      
      IF (NEW.reserved_by IS NULL) THEN
        RAISE EXCEPTION 'To reserve a gift, reserved_by must be set to a guest id';
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM public.guests g WHERE g.id = NEW.reserved_by) THEN
        RAISE EXCEPTION 'reserved_by references a non-existent guest';
      END IF;
      
      IF (NEW.reserved_at IS NULL) THEN
        NEW.reserved_at := now();
      END IF;
    END IF;
    
    -- If unreserving
    IF (NEW.is_reserved = false AND OLD.is_reserved = true) THEN
      NEW.reserved_by := NULL;
      NEW.reserved_at := NULL;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for gift reservation
DROP TRIGGER IF EXISTS gift_reservation_trigger ON public.gifts;
CREATE TRIGGER gift_reservation_trigger
  BEFORE UPDATE ON public.gifts
  FOR EACH ROW
  EXECUTE FUNCTION public.gifts_reservation_guard();