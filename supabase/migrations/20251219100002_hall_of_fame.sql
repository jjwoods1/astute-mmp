-- Hall of Fame table and seed data
-- This migration creates the hall_of_fame table and populates it with existing image data

-- Create hall_of_fame table
CREATE TABLE IF NOT EXISTS hall_of_fame (
  id SERIAL PRIMARY KEY,
  year INTEGER NOT NULL,
  month TEXT NOT NULL,
  placement TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(year, month, placement)
);

-- Enable Row Level Security
ALTER TABLE hall_of_fame ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since auth is disabled for now)
DO $$
BEGIN
  DROP POLICY IF EXISTS "Allow all operations on hall_of_fame" ON hall_of_fame;
END $$;

CREATE POLICY "Allow all operations on hall_of_fame" ON hall_of_fame FOR ALL USING (true) WITH CHECK (true);

-- Seed data from existing images
-- Format: /images/hall-of-fame/{year}/{placement}/{month}.png

-- 2000
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2000, 'january', '1st', '/images/hall-of-fame/2000/1st/january.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2001
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2001, 'april', '1st', '/images/hall-of-fame/2001/1st/april.png'),
(2001, 'august', '1st', '/images/hall-of-fame/2001/1st/august.png'),
(2001, 'december', '1st', '/images/hall-of-fame/2001/1st/december.png'),
(2001, 'february', '1st', '/images/hall-of-fame/2001/1st/february.png'),
(2001, 'january', '1st', '/images/hall-of-fame/2001/1st/january.png'),
(2001, 'july', '1st', '/images/hall-of-fame/2001/1st/july.png'),
(2001, 'june', '1st', '/images/hall-of-fame/2001/1st/june.png'),
(2001, 'march', '1st', '/images/hall-of-fame/2001/1st/march.png'),
(2001, 'may', '1st', '/images/hall-of-fame/2001/1st/may.png'),
(2001, 'november', '1st', '/images/hall-of-fame/2001/1st/november.png'),
(2001, 'october', '1st', '/images/hall-of-fame/2001/1st/october.png'),
(2001, 'september', '1st', '/images/hall-of-fame/2001/1st/september.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2002
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2002, 'april', '1st', '/images/hall-of-fame/2002/1st/april.png'),
(2002, 'august', '1st', '/images/hall-of-fame/2002/1st/august.png'),
(2002, 'december', '1st', '/images/hall-of-fame/2002/1st/december.png'),
(2002, 'february', '1st', '/images/hall-of-fame/2002/1st/february.png'),
(2002, 'january', '1st', '/images/hall-of-fame/2002/1st/january.png'),
(2002, 'july', '1st', '/images/hall-of-fame/2002/1st/july.png'),
(2002, 'june', '1st', '/images/hall-of-fame/2002/1st/june.png'),
(2002, 'march', '1st', '/images/hall-of-fame/2002/1st/march.png'),
(2002, 'may', '1st', '/images/hall-of-fame/2002/1st/may.png'),
(2002, 'november', '1st', '/images/hall-of-fame/2002/1st/november.png'),
(2002, 'october', '1st', '/images/hall-of-fame/2002/1st/october.png'),
(2002, 'september', '1st', '/images/hall-of-fame/2002/1st/september.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2003
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2003, 'january', '1st', '/images/hall-of-fame/2003/1st/january.png'),
(2003, 'april', '1st', '/images/hall-of-fame/2003/1st/april.png'),
(2003, 'august', '1st', '/images/hall-of-fame/2003/1st/august.png'),
(2003, 'december', '1st', '/images/hall-of-fame/2003/1st/december.png'),
(2003, 'february', '1st', '/images/hall-of-fame/2003/1st/february.png'),
(2003, 'july', '1st', '/images/hall-of-fame/2003/1st/july.png'),
(2003, 'june', '1st', '/images/hall-of-fame/2003/1st/june.png'),
(2003, 'march', '1st', '/images/hall-of-fame/2003/1st/march.png'),
(2003, 'may', '1st', '/images/hall-of-fame/2003/1st/may.png'),
(2003, 'november', '1st', '/images/hall-of-fame/2003/1st/november.png'),
(2003, 'october', '1st', '/images/hall-of-fame/2003/1st/october.png'),
(2003, 'september', '1st', '/images/hall-of-fame/2003/1st/september.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2004 - 1st place
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2004, 'may', '1st', '/images/hall-of-fame/2004/1st/may.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2005
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2005, 'june', '1st', '/images/hall-of-fame/2005/1st/june.png'),
(2005, 'october', '1st', '/images/hall-of-fame/2005/1st/october.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2006
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2006, 'february', '2nd', '/images/hall-of-fame/2006/2nd/february.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2007
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2007, 'october', '2nd', '/images/hall-of-fame/2007/2nd/october.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2008
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2008, 'august', '1st', '/images/hall-of-fame/2008/1st/august.png'),
(2008, 'january', '1st', '/images/hall-of-fame/2008/1st/january.png'),
(2008, 'june', '1st', '/images/hall-of-fame/2008/1st/june.png'),
(2008, 'may', '1st', '/images/hall-of-fame/2008/1st/may.png'),
(2008, 'november', '1st', '/images/hall-of-fame/2008/1st/november.png'),
(2008, 'october', '1st', '/images/hall-of-fame/2008/1st/october.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2009
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2009, 'september', '1st', '/images/hall-of-fame/2009/1st/september.png'),
(2009, 'december', '2nd', '/images/hall-of-fame/2009/2nd/december.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2010
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2010, 'june', '1st', '/images/hall-of-fame/2010/1st/june.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2011
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2011, 'july', '3rd', '/images/hall-of-fame/2011/3rd/july.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2012
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2012, 'march', '2nd', '/images/hall-of-fame/2012/2nd/march.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2013 - 1st place (all months)
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2013, 'january', '1st', '/images/hall-of-fame/2013/1st/january.png'),
(2013, 'february', '1st', '/images/hall-of-fame/2013/1st/february.png'),
(2013, 'march', '1st', '/images/hall-of-fame/2013/1st/march.png'),
(2013, 'april', '1st', '/images/hall-of-fame/2013/1st/april.png'),
(2013, 'may', '1st', '/images/hall-of-fame/2013/1st/may.png'),
(2013, 'june', '1st', '/images/hall-of-fame/2013/1st/june.png'),
(2013, 'july', '1st', '/images/hall-of-fame/2013/1st/july.png'),
(2013, 'august', '1st', '/images/hall-of-fame/2013/1st/august.png'),
(2013, 'september', '1st', '/images/hall-of-fame/2013/1st/september.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2013 - 2nd place (all months)
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2013, 'january', '2nd', '/images/hall-of-fame/2013/2nd/january.png'),
(2013, 'february', '2nd', '/images/hall-of-fame/2013/2nd/february.png'),
(2013, 'march', '2nd', '/images/hall-of-fame/2013/2nd/march.png'),
(2013, 'april', '2nd', '/images/hall-of-fame/2013/2nd/april.png'),
(2013, 'may', '2nd', '/images/hall-of-fame/2013/2nd/may.png'),
(2013, 'june', '2nd', '/images/hall-of-fame/2013/2nd/june.png'),
(2013, 'july', '2nd', '/images/hall-of-fame/2013/2nd/july.png'),
(2013, 'august', '2nd', '/images/hall-of-fame/2013/2nd/august.png'),
(2013, 'september', '2nd', '/images/hall-of-fame/2013/2nd/september.png'),
(2013, 'october', '2nd', '/images/hall-of-fame/2013/2nd/october.png'),
(2013, 'november', '2nd', '/images/hall-of-fame/2013/2nd/november.png'),
(2013, 'december', '2nd', '/images/hall-of-fame/2013/2nd/december.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2013 - 3rd place (all months)
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2013, 'january', '3rd', '/images/hall-of-fame/2013/3rd/january.png'),
(2013, 'february', '3rd', '/images/hall-of-fame/2013/3rd/february.png'),
(2013, 'march', '3rd', '/images/hall-of-fame/2013/3rd/march.png'),
(2013, 'april', '3rd', '/images/hall-of-fame/2013/3rd/april.png'),
(2013, 'may', '3rd', '/images/hall-of-fame/2013/3rd/may.png'),
(2013, 'june', '3rd', '/images/hall-of-fame/2013/3rd/june.png'),
(2013, 'july', '3rd', '/images/hall-of-fame/2013/3rd/july.png'),
(2013, 'august', '3rd', '/images/hall-of-fame/2013/3rd/august.png'),
(2013, 'september', '3rd', '/images/hall-of-fame/2013/3rd/september.png'),
(2013, 'october', '3rd', '/images/hall-of-fame/2013/3rd/october.png'),
(2013, 'november', '3rd', '/images/hall-of-fame/2013/3rd/november.png'),
(2013, 'december', '3rd', '/images/hall-of-fame/2013/3rd/december.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2014 - 2nd place
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2014, 'june', '2nd', '/images/hall-of-fame/2014/2nd/june.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2014 - 3rd place
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2014, 'may', '3rd', '/images/hall-of-fame/2014/3rd/may.png'),
(2014, 'july', '3rd', '/images/hall-of-fame/2014/3rd/july.png'),
(2014, 'august', '3rd', '/images/hall-of-fame/2014/3rd/august.png'),
(2014, 'december', '3rd', '/images/hall-of-fame/2014/3rd/december.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2015 - 1st place (all months)
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2015, 'april', '1st', '/images/hall-of-fame/2015/1st/april.png'),
(2015, 'august', '1st', '/images/hall-of-fame/2015/1st/august.png'),
(2015, 'december', '1st', '/images/hall-of-fame/2015/1st/december.png'),
(2015, 'february', '1st', '/images/hall-of-fame/2015/1st/february.png'),
(2015, 'january', '1st', '/images/hall-of-fame/2015/1st/january.png'),
(2015, 'july', '1st', '/images/hall-of-fame/2015/1st/july.png'),
(2015, 'june', '1st', '/images/hall-of-fame/2015/1st/june.png'),
(2015, 'march', '1st', '/images/hall-of-fame/2015/1st/march.png'),
(2015, 'may', '1st', '/images/hall-of-fame/2015/1st/may.png'),
(2015, 'november', '1st', '/images/hall-of-fame/2015/1st/november.png'),
(2015, 'october', '1st', '/images/hall-of-fame/2015/1st/october.png'),
(2015, 'september', '1st', '/images/hall-of-fame/2015/1st/september.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2016 - 2nd place
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2016, 'may', '2nd', '/images/hall-of-fame/2016/2nd/may.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2017 - 1st place
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2017, 'april', '1st', '/images/hall-of-fame/2017/1st/april.png'),
(2017, 'december', '1st', '/images/hall-of-fame/2017/1st/december.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2018 - 1st place (all months)
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2018, 'april', '1st', '/images/hall-of-fame/2018/1st/april.png'),
(2018, 'august', '1st', '/images/hall-of-fame/2018/1st/august.png'),
(2018, 'december', '1st', '/images/hall-of-fame/2018/1st/december.png'),
(2018, 'february', '1st', '/images/hall-of-fame/2018/1st/february.png'),
(2018, 'january', '1st', '/images/hall-of-fame/2018/1st/january.png'),
(2018, 'july', '1st', '/images/hall-of-fame/2018/1st/july.png'),
(2018, 'june', '1st', '/images/hall-of-fame/2018/1st/june.png'),
(2018, 'march', '1st', '/images/hall-of-fame/2018/1st/march.png'),
(2018, 'may', '1st', '/images/hall-of-fame/2018/1st/may.png'),
(2018, 'november', '1st', '/images/hall-of-fame/2018/1st/november.png'),
(2018, 'october', '1st', '/images/hall-of-fame/2018/1st/october.png'),
(2018, 'september', '1st', '/images/hall-of-fame/2018/1st/september.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2019 - 1st place (all months)
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2019, 'april', '1st', '/images/hall-of-fame/2019/1st/april.png'),
(2019, 'august', '1st', '/images/hall-of-fame/2019/1st/august.png'),
(2019, 'december', '1st', '/images/hall-of-fame/2019/1st/december.png'),
(2019, 'february', '1st', '/images/hall-of-fame/2019/1st/february.png'),
(2019, 'january', '1st', '/images/hall-of-fame/2019/1st/january.png'),
(2019, 'july', '1st', '/images/hall-of-fame/2019/1st/july.png'),
(2019, 'june', '1st', '/images/hall-of-fame/2019/1st/june.png'),
(2019, 'march', '1st', '/images/hall-of-fame/2019/1st/march.png'),
(2019, 'may', '1st', '/images/hall-of-fame/2019/1st/may.png'),
(2019, 'november', '1st', '/images/hall-of-fame/2019/1st/november.png'),
(2019, 'october', '1st', '/images/hall-of-fame/2019/1st/october.png'),
(2019, 'september', '1st', '/images/hall-of-fame/2019/1st/september.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2020 - 1st place (all months)
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2020, 'april', '1st', '/images/hall-of-fame/2020/1st/april.png'),
(2020, 'august', '1st', '/images/hall-of-fame/2020/1st/august.png'),
(2020, 'december', '1st', '/images/hall-of-fame/2020/1st/december.png'),
(2020, 'february', '1st', '/images/hall-of-fame/2020/1st/february.png'),
(2020, 'january', '1st', '/images/hall-of-fame/2020/1st/january.png'),
(2020, 'july', '1st', '/images/hall-of-fame/2020/1st/july.png'),
(2020, 'june', '1st', '/images/hall-of-fame/2020/1st/june.png'),
(2020, 'march', '1st', '/images/hall-of-fame/2020/1st/march.png'),
(2020, 'may', '1st', '/images/hall-of-fame/2020/1st/may.png'),
(2020, 'november', '1st', '/images/hall-of-fame/2020/1st/november.png'),
(2020, 'october', '1st', '/images/hall-of-fame/2020/1st/october.png'),
(2020, 'september', '1st', '/images/hall-of-fame/2020/1st/september.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2021 - 1st place (all months)
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2021, 'april', '1st', '/images/hall-of-fame/2021/1st/april.png'),
(2021, 'august', '1st', '/images/hall-of-fame/2021/1st/august.png'),
(2021, 'december', '1st', '/images/hall-of-fame/2021/1st/december.png'),
(2021, 'february', '1st', '/images/hall-of-fame/2021/1st/february.png'),
(2021, 'january', '1st', '/images/hall-of-fame/2021/1st/january.png'),
(2021, 'july', '1st', '/images/hall-of-fame/2021/1st/july.png'),
(2021, 'june', '1st', '/images/hall-of-fame/2021/1st/june.png'),
(2021, 'march', '1st', '/images/hall-of-fame/2021/1st/march.png'),
(2021, 'may', '1st', '/images/hall-of-fame/2021/1st/may.png'),
(2021, 'november', '1st', '/images/hall-of-fame/2021/1st/november.png'),
(2021, 'october', '1st', '/images/hall-of-fame/2021/1st/october.png'),
(2021, 'september', '1st', '/images/hall-of-fame/2021/1st/september.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2022 - 1st place (all months)
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2022, 'april', '1st', '/images/hall-of-fame/2022/1st/april.png'),
(2022, 'august', '1st', '/images/hall-of-fame/2022/1st/august.png'),
(2022, 'december', '1st', '/images/hall-of-fame/2022/1st/december.png'),
(2022, 'february', '1st', '/images/hall-of-fame/2022/1st/february.png'),
(2022, 'january', '1st', '/images/hall-of-fame/2022/1st/january.png'),
(2022, 'july', '1st', '/images/hall-of-fame/2022/1st/july.png'),
(2022, 'june', '1st', '/images/hall-of-fame/2022/1st/june.png'),
(2022, 'march', '1st', '/images/hall-of-fame/2022/1st/march.png'),
(2022, 'may', '1st', '/images/hall-of-fame/2022/1st/may.png'),
(2022, 'november', '1st', '/images/hall-of-fame/2022/1st/november.png'),
(2022, 'october', '1st', '/images/hall-of-fame/2022/1st/october.png'),
(2022, 'september', '1st', '/images/hall-of-fame/2022/1st/september.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2023 - 1st place
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2023, 'february', '1st', '/images/hall-of-fame/2023/1st/february.png'),
(2023, 'may', '1st', '/images/hall-of-fame/2023/1st/may.png'),
(2023, 'december', '1st', '/images/hall-of-fame/2023/1st/december.png'),
(2023, 'october', '1st', '/images/hall-of-fame/2023/1st/october.png'),
(2023, 'september', '1st', '/images/hall-of-fame/2023/1st/september.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2024 - 1st place
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2024, 'january', '1st', '/images/hall-of-fame/2024/1st/january.png'),
(2024, 'february', '1st', '/images/hall-of-fame/2024/1st/february.png'),
(2024, 'april', '1st', '/images/hall-of-fame/2024/1st/april.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- 2025
INSERT INTO hall_of_fame (year, month, placement, image_url) VALUES
(2025, 'january', '1st', '/images/hall-of-fame/2025/1st/january.png'),
(2025, 'february', '1st', '/images/hall-of-fame/2025/1st/february.png'),
(2025, 'january', '2nd', '/images/hall-of-fame/2025/2nd/january.png')
ON CONFLICT (year, month, placement) DO UPDATE SET image_url = EXCLUDED.image_url;

-- Create index for faster queries by year
CREATE INDEX IF NOT EXISTS idx_hall_of_fame_year ON hall_of_fame(year);
CREATE INDEX IF NOT EXISTS idx_hall_of_fame_year_placement ON hall_of_fame(year, placement);
