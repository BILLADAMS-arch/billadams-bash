-- Fix function search path for is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $function$
declare
  col_exists int;
  email_claim text;
begin
  -- check if user_id column exists
  select count(*) into col_exists
  from information_schema.columns
  where table_schema='public' and table_name='admins' and column_name='user_id';

  if col_exists > 0 then
    if auth.uid() is null then
      return false;
    end if;
    return exists (select 1 from public.admins where user_id = auth.uid());
  else
    -- fallback: check by email claim
    email_claim := current_setting('jwt.claims.email', true);
    if email_claim is null then
      return false;
    end if;
    return exists (select 1 from public.admins where email = email_claim);
  end if;
end;
$function$;

-- Fix function search path for gifts_reservation_guard function
CREATE OR REPLACE FUNCTION public.gifts_reservation_guard()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
begin
  if tg_op = 'UPDATE' then
    -- If reserving
    if (NEW.is_reserved = true) then
      if (OLD.is_reserved = true) then
        raise exception 'Gift is already reserved';
      end if;

      if (NEW.reserved_by is null) then
        raise exception 'To reserve a gift, reserved_by must be set to a guest id';
      end if;

      if not exists (select 1 from public.guests g where g.id = NEW.reserved_by) then
        raise exception 'reserved_by references a non-existent guest';
      end if;

      if (NEW.reserved_at is null) then
        NEW.reserved_at := now();
      end if;
    end if;

    -- If unreserving
    if (NEW.is_reserved = false and OLD.is_reserved = true) then
      NEW.reserved_by := NULL;
      NEW.reserved_at := NULL;
    end if;
  end if;

  return NEW;
end;
$function$;