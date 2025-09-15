-- Clear existing sample gifts
DELETE FROM public.gifts;

-- Insert new gifts for Jonathan's birthday
INSERT INTO public.gifts (name, description, price_estimate, image_url, link) VALUES
-- Ride-Ons & Movement
('Tricycle with Push Handle', 'For guided riding until he pedals independently', 150, NULL, 'https://www.jumia.co.ke/tricycles'),
('Small Bicycle with Training Wheels', 'Perfect for later in the year as he grows', 200, NULL, 'https://www.jumia.co.ke/kids-bikes'),
('Ride-on/Trolley Car', 'Push with legs or be pushed by parent', 120, NULL, 'https://toyworld.co.ke'),
('3-Wheel Scooter with LED Lights', 'Adjustable height for balance development', 100, NULL, 'https://www.jumia.co.ke/scooters'),

-- Montessori Learning & Educational
('Shape Sorter Puzzle Set', 'Problem-solving and shape recognition', 40, NULL, 'https://peekaboo.co.ke'),
('Mega Bloks Building Set', 'Large pieces perfect for small hands', 60, NULL, 'https://toyworld.co.ke'),
('Activity Cube', 'Multi-sided with beads, gears, and sliders', 80, NULL, 'https://peekaboo.co.ke'),
('Montessori Busy Board', 'Fine motor skills development', 70, NULL, 'https://instagram.com/wamachua'),
('Wooden Stacking Toys', 'Cups, rings, or wooden stackers', 45, NULL, 'https://ashnahomes.co.ke'),
('Object Permanence Box', 'Classic Montessori learning toy', 55, NULL, 'https://instagram.com/wamachua'),
('Pull-Along Wooden Animals', 'Walking and coordination development', 35, NULL, 'https://peekaboo.co.ke'),

-- Creativity & Sensory
('Chunky Crayons & Drawing Set', 'Non-toxic, washable for safe creativity', 25, NULL, 'https://woolworths.co.ke'),
('Soft Playdough Set', 'Baby-safe sensory play', 20, NULL, 'https://kidsworld.co.ke'),
('Textured Board Books Set', 'Lift-the-flap and touch-and-feel books', 50, NULL, 'https://woolworths.co.ke'),
('Bath Toys Collection', 'Cups, funnels, and floating toys', 30, NULL, 'https://babyshop.co.ke'),
('Manual Moving Train', 'Interactive push-along train', 65, NULL, 'https://toyworld.co.ke'),
('Musical Toys Set', 'Age-appropriate instruments', 45, NULL, 'https://peekaboo.co.ke'),

-- Feeding & Practical
('Silicone Suction Plates Set', 'Divided plates with strong suction', 35, NULL, 'https://babyshop.co.ke'),
('Silicone Bowls with Suction', 'Spill-proof feeding solution', 30, NULL, 'https://babyshop.co.ke'),
('Sippy Cups & Straw Cups Set', 'Transition drinking cups', 40, NULL, 'https://woolworths.co.ke'),
('Silicone Bibs Collection', 'Wipe-clean feeding bibs', 25, NULL, 'https://babyshop.co.ke'),

-- Comfort & Clothing
('Toddler Walking Shoes', 'Light, flexible soles for new walkers', 80, NULL, 'https://woolworths.co.ke'),
('Lightweight Jacket/Sweater', 'Comfortable outerwear', 60, NULL, 'https://woolworths.co.ke'),
('Pajama Sets', 'Comfortable sleepwear', 45, NULL, 'https://woolworths.co.ke'),
('Toddler Pillow & Blanket Set', 'Soft bedding for comfort', 70, NULL, 'https://ashnahomes.co.ke'),

-- Outdoors & Active
('Baby Swing', 'Indoor/outdoor swing', 150, NULL, 'https://jumia.co.ke'),
('Pop-up Play Tent', 'Tunnel or playhouse for active play', 90, NULL, 'https://toyworld.co.ke'),
('Soft Sensory Balls Set', 'Various textures and sizes', 35, NULL, 'https://peekaboo.co.ke'),

-- Development & Safety
('Toddler Helmet', 'Safety gear for tricycle/scooter', 50, NULL, 'https://jumia.co.ke'),
('Baby-Proofing Kit', 'Corner guards, cabinet locks, outlet covers', 60, NULL, 'https://babyshop.co.ke'),

-- Sleeping & Rest
('Night Light Projector', 'Soft ambient lighting for bedtime', 55, NULL, 'https://jumia.co.ke'),
('Lullaby Sound Machine', 'Soothing sounds for better sleep', 65, NULL, 'https://babyshop.co.ke'),
('Bedtime Story Books Collection', 'Lullaby and bedtime stories', 40, NULL, 'https://woolworths.co.ke');