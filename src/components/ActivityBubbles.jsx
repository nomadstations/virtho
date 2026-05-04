
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Building2, Sparkles, Folder, BookOpen, Calendar } from 'lucide-react';
import '@/styles/ActivityBubbles.css';

/**
 * ActivityBubbles Component
 * 
 * Displays animated activity notifications that appear one at a time across the map
 * - Shows 6 types of activities with country names
 * - Only 1 bubble visible at a time for smooth experience
 * - Timing: 400ms fade in + 2500ms display + 400ms fade out + 500ms interval = 3800ms cycle
 * - Icons sized at 10-12px (proportional to 13-14px text)
 * - Positions bubbles on country borders using lat/lng to pixel conversion
 * - Random distribution across all continents
 * - Smooth animations with no overlapping
 * - Text overflow handling with max-width constraints
 * - Map boundary constraint logic with 20-30px margins
 * 
 * @param {Object} props
 * @param {string} props.selectedCountry - Currently selected country for highlighting
 * @param {Function} props.onCountrySelect - Callback when a country is clicked on the map
 */

// Comprehensive countries data with accurate center coordinates (195+ countries)
const COUNTRIES = [
  // Asia (48 countries)
  { name: 'Afghanistan', lat: 33.9391, lng: 67.7100 },
  { name: 'Armenia', lat: 40.0691, lng: 45.0382 },
  { name: 'Azerbaijan', lat: 40.1431, lng: 47.5769 },
  { name: 'Bahrain', lat: 26.0667, lng: 50.5577 },
  { name: 'Bangladesh', lat: 23.6850, lng: 90.3563 },
  { name: 'Bhutan', lat: 27.5142, lng: 90.4336 },
  { name: 'Brunei', lat: 4.5353, lng: 114.7277 },
  { name: 'Cambodia', lat: 12.5657, lng: 104.9910 },
  { name: 'China', lat: 35.8617, lng: 104.1954 },
  { name: 'Cyprus', lat: 35.1264, lng: 33.4299 },
  { name: 'Georgia', lat: 42.3154, lng: 43.3569 },
  { name: 'India', lat: 20.5937, lng: 78.9629 },
  { name: 'Indonesia', lat: -0.7893, lng: 113.9213 },
  { name: 'Iran', lat: 32.4279, lng: 53.6880 },
  { name: 'Iraq', lat: 33.2232, lng: 43.6793 },
  { name: 'Israel', lat: 31.0461, lng: 34.8516 },
  { name: 'Japan', lat: 36.2048, lng: 138.2529 },
  { name: 'Jordan', lat: 30.5852, lng: 36.2384 },
  { name: 'Kazakhstan', lat: 48.0196, lng: 66.9237 },
  { name: 'Kuwait', lat: 29.3117, lng: 47.4818 },
  { name: 'Kyrgyzstan', lat: 41.2044, lng: 74.7661 },
  { name: 'Laos', lat: 19.8563, lng: 102.4955 },
  { name: 'Lebanon', lat: 33.8547, lng: 35.8623 },
  { name: 'Malaysia', lat: 4.2105, lng: 101.9758 },
  { name: 'Maldives', lat: 3.2028, lng: 73.2207 },
  { name: 'Mongolia', lat: 46.8625, lng: 103.8467 },
  { name: 'Myanmar', lat: 21.9162, lng: 95.9560 },
  { name: 'Nepal', lat: 28.3949, lng: 84.1240 },
  { name: 'North Korea', lat: 40.3399, lng: 127.5101 },
  { name: 'Oman', lat: 21.4735, lng: 55.9754 },
  { name: 'Pakistan', lat: 30.3753, lng: 69.3451 },
  { name: 'Palestine', lat: 31.9522, lng: 35.2332 },
  { name: 'Philippines', lat: 12.8797, lng: 121.7740 },
  { name: 'Qatar', lat: 25.3548, lng: 51.1839 },
  { name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'South Korea', lat: 35.9078, lng: 127.7669 },
  { name: 'Sri Lanka', lat: 7.8731, lng: 80.7718 },
  { name: 'Syria', lat: 34.8021, lng: 38.9968 },
  { name: 'Taiwan', lat: 23.6978, lng: 120.9605 },
  { name: 'Tajikistan', lat: 38.8610, lng: 71.2761 },
  { name: 'Thailand', lat: 15.8700, lng: 100.9925 },
  { name: 'Timor-Leste', lat: -8.8742, lng: 125.7275 },
  { name: 'Turkey', lat: 38.9637, lng: 35.2433 },
  { name: 'Turkmenistan', lat: 38.9697, lng: 59.5563 },
  { name: 'United Arab Emirates', lat: 23.4241, lng: 53.8478 },
  { name: 'Uzbekistan', lat: 41.3775, lng: 64.5853 },
  { name: 'Vietnam', lat: 14.0583, lng: 108.2772 },
  { name: 'Yemen', lat: 15.5527, lng: 48.5164 },

  // Europe (44 countries)
  { name: 'Albania', lat: 41.1533, lng: 20.1683 },
  { name: 'Andorra', lat: 42.5063, lng: 1.5218 },
  { name: 'Austria', lat: 47.5162, lng: 14.5501 },
  { name: 'Belarus', lat: 53.7098, lng: 27.9534 },
  { name: 'Belgium', lat: 50.5039, lng: 4.4699 },
  { name: 'Bosnia and Herzegovina', lat: 43.9159, lng: 17.6791 },
  { name: 'Bulgaria', lat: 42.7339, lng: 25.4858 },
  { name: 'Croatia', lat: 45.1000, lng: 15.2000 },
  { name: 'Czech Republic', lat: 49.8175, lng: 15.4730 },
  { name: 'Denmark', lat: 56.2639, lng: 9.5018 },
  { name: 'Estonia', lat: 58.5953, lng: 25.0136 },
  { name: 'Finland', lat: 61.9241, lng: 25.7482 },
  { name: 'France', lat: 46.2276, lng: 2.2137 },
  { name: 'Germany', lat: 51.1657, lng: 10.4515 },
  { name: 'Greece', lat: 39.0742, lng: 21.8243 },
  { name: 'Hungary', lat: 47.1625, lng: 19.5033 },
  { name: 'Iceland', lat: 64.9631, lng: -19.0208 },
  { name: 'Ireland', lat: 53.4129, lng: -8.2439 },
  { name: 'Italy', lat: 41.8719, lng: 12.5674 },
  { name: 'Kosovo', lat: 42.6026, lng: 20.9030 },
  { name: 'Latvia', lat: 56.8796, lng: 24.6032 },
  { name: 'Liechtenstein', lat: 47.1660, lng: 9.5554 },
  { name: 'Lithuania', lat: 55.1694, lng: 23.8813 },
  { name: 'Luxembourg', lat: 49.8153, lng: 6.1296 },
  { name: 'Malta', lat: 35.9375, lng: 14.3754 },
  { name: 'Moldova', lat: 47.4116, lng: 28.3699 },
  { name: 'Monaco', lat: 43.7384, lng: 7.4246 },
  { name: 'Montenegro', lat: 42.7087, lng: 19.3744 },
  { name: 'Netherlands', lat: 52.1326, lng: 5.2913 },
  { name: 'North Macedonia', lat: 41.6086, lng: 21.7453 },
  { name: 'Norway', lat: 60.4720, lng: 8.4689 },
  { name: 'Poland', lat: 51.9194, lng: 19.1451 },
  { name: 'Portugal', lat: 39.3999, lng: -8.2245 },
  { name: 'Romania', lat: 45.9432, lng: 24.9668 },
  { name: 'Russia', lat: 61.5240, lng: 105.3188 },
  { name: 'San Marino', lat: 43.9424, lng: 12.4578 },
  { name: 'Serbia', lat: 44.0165, lng: 21.0059 },
  { name: 'Slovakia', lat: 48.6690, lng: 19.6990 },
  { name: 'Slovenia', lat: 46.1512, lng: 14.9955 },
  { name: 'Spain', lat: 40.4637, lng: -3.7492 },
  { name: 'Sweden', lat: 60.1282, lng: 18.6435 },
  { name: 'Switzerland', lat: 46.8182, lng: 8.2275 },
  { name: 'Ukraine', lat: 48.3794, lng: 31.1656 },
  { name: 'United Kingdom', lat: 55.3781, lng: -3.4360 },
  { name: 'Vatican City', lat: 41.9029, lng: 12.4534 },

  // Africa (54 countries)
  { name: 'Algeria', lat: 28.0339, lng: 1.6596 },
  { name: 'Angola', lat: -11.2027, lng: 17.8739 },
  { name: 'Benin', lat: 9.3077, lng: 2.3158 },
  { name: 'Botswana', lat: -22.3285, lng: 24.6849 },
  { name: 'Burkina Faso', lat: 12.2383, lng: -1.5616 },
  { name: 'Burundi', lat: -3.3731, lng: 29.9189 },
  { name: 'Cameroon', lat: 7.3697, lng: 12.3547 },
  { name: 'Cape Verde', lat: 16.5388, lng: -23.0418 },
  { name: 'Central African Republic', lat: 6.6111, lng: 20.9394 },
  { name: 'Chad', lat: 15.4542, lng: 18.7322 },
  { name: 'Comoros', lat: -11.6455, lng: 43.3333 },
  { name: 'Congo', lat: -0.2280, lng: 15.8277 },
  { name: 'Democratic Republic of the Congo', lat: -4.0383, lng: 21.7587 },
  { name: 'Djibouti', lat: 11.8251, lng: 42.5903 },
  { name: 'Egypt', lat: 26.8206, lng: 30.8025 },
  { name: 'Equatorial Guinea', lat: 1.6508, lng: 10.2679 },
  { name: 'Eritrea', lat: 15.1794, lng: 39.7823 },
  { name: 'Eswatini', lat: -26.5225, lng: 31.4659 },
  { name: 'Ethiopia', lat: 9.1450, lng: 40.4897 },
  { name: 'Gabon', lat: -0.8037, lng: 11.6094 },
  { name: 'Gambia', lat: 13.4432, lng: -15.3101 },
  { name: 'Ghana', lat: 7.9465, lng: -1.0232 },
  { name: 'Guinea', lat: 9.9456, lng: -9.6966 },
  { name: 'Guinea-Bissau', lat: 11.8037, lng: -15.1804 },
  { name: 'Ivory Coast', lat: 7.5400, lng: -5.5471 },
  { name: 'Kenya', lat: -0.0236, lng: 37.9062 },
  { name: 'Lesotho', lat: -29.6100, lng: 28.2336 },
  { name: 'Liberia', lat: 6.4281, lng: -9.4295 },
  { name: 'Libya', lat: 26.3351, lng: 17.2283 },
  { name: 'Madagascar', lat: -18.7669, lng: 46.8691 },
  { name: 'Malawi', lat: -13.2543, lng: 34.3015 },
  { name: 'Mali', lat: 17.5707, lng: -3.9962 },
  { name: 'Mauritania', lat: 21.0079, lng: -10.9408 },
  { name: 'Mauritius', lat: -20.3484, lng: 57.5522 },
  { name: 'Morocco', lat: 31.7917, lng: -7.0926 },
  { name: 'Mozambique', lat: -18.6657, lng: 35.5296 },
  { name: 'Namibia', lat: -22.9576, lng: 18.4904 },
  { name: 'Niger', lat: 17.6078, lng: 8.0817 },
  { name: 'Nigeria', lat: 9.0820, lng: 8.6753 },
  { name: 'Rwanda', lat: -1.9403, lng: 29.8739 },
  { name: 'São Tomé and Príncipe', lat: 0.1864, lng: 6.6131 },
  { name: 'Senegal', lat: 14.4974, lng: -14.4524 },
  { name: 'Seychelles', lat: -4.6796, lng: 55.4920 },
  { name: 'Sierra Leone', lat: 8.4606, lng: -11.7799 },
  { name: 'Somalia', lat: 5.1521, lng: 46.1996 },
  { name: 'South Africa', lat: -30.5595, lng: 22.9375 },
  { name: 'South Sudan', lat: 6.8770, lng: 31.3070 },
  { name: 'Sudan', lat: 12.8628, lng: 30.2176 },
  { name: 'Tanzania', lat: -6.3690, lng: 34.8888 },
  { name: 'Togo', lat: 8.6195, lng: 0.8248 },
  { name: 'Tunisia', lat: 33.8869, lng: 9.5375 },
  { name: 'Uganda', lat: 1.3733, lng: 32.2903 },
  { name: 'Zambia', lat: -13.1339, lng: 27.8493 },
  { name: 'Zimbabwe', lat: -19.0154, lng: 29.1549 },

  // North America (23 countries)
  { name: 'Antigua and Barbuda', lat: 17.0608, lng: -61.7964 },
  { name: 'Bahamas', lat: 25.0343, lng: -77.3963 },
  { name: 'Barbados', lat: 13.1939, lng: -59.5432 },
  { name: 'Belize', lat: 17.1899, lng: -88.4976 },
  { name: 'Canada', lat: 56.1304, lng: -106.3468 },
  { name: 'Costa Rica', lat: 9.7489, lng: -83.7534 },
  { name: 'Cuba', lat: 21.5218, lng: -77.7812 },
  { name: 'Dominica', lat: 15.4150, lng: -61.3710 },
  { name: 'Dominican Republic', lat: 18.7357, lng: -70.1627 },
  { name: 'El Salvador', lat: 13.7942, lng: -88.8965 },
  { name: 'Grenada', lat: 12.1165, lng: -61.6790 },
  { name: 'Guatemala', lat: 15.7835, lng: -90.2308 },
  { name: 'Haiti', lat: 18.9712, lng: -72.2852 },
  { name: 'Honduras', lat: 15.2000, lng: -86.2419 },
  { name: 'Jamaica', lat: 18.1096, lng: -77.2975 },
  { name: 'Mexico', lat: 23.6345, lng: -102.5528 },
  { name: 'Nicaragua', lat: 12.8654, lng: -85.2072 },
  { name: 'Panama', lat: 8.5380, lng: -80.7821 },
  { name: 'Saint Kitts and Nevis', lat: 17.3578, lng: -62.7830 },
  { name: 'Saint Lucia', lat: 13.9094, lng: -60.9789 },
  { name: 'Saint Vincent and the Grenadines', lat: 12.9843, lng: -61.2872 },
  { name: 'Trinidad and Tobago', lat: 10.6918, lng: -61.2225 },
  { name: 'United States', lat: 37.0902, lng: -95.7129 },

  // South America (12 countries)
  { name: 'Argentina', lat: -38.4161, lng: -63.6167 },
  { name: 'Bolivia', lat: -16.2902, lng: -63.5887 },
  { name: 'Brazil', lat: -14.2350, lng: -51.9253 },
  { name: 'Chile', lat: -35.6751, lng: -71.5430 },
  { name: 'Colombia', lat: 4.5709, lng: -74.2973 },
  { name: 'Ecuador', lat: -1.8312, lng: -78.1834 },
  { name: 'Guyana', lat: 4.8604, lng: -58.9302 },
  { name: 'Paraguay', lat: -23.4425, lng: -58.4438 },
  { name: 'Peru', lat: -9.1900, lng: -75.0152 },
  { name: 'Suriname', lat: 3.9193, lng: -56.0278 },
  { name: 'Uruguay', lat: -32.5228, lng: -55.7658 },
  { name: 'Venezuela', lat: 6.4238, lng: -66.5897 },

  // Oceania (14 countries)
  { name: 'Australia', lat: -25.2744, lng: 133.7751 },
  { name: 'Fiji', lat: -17.7134, lng: 178.0650 },
  { name: 'Kiribati', lat: -3.3704, lng: -168.7340 },
  { name: 'Marshall Islands', lat: 7.1315, lng: 171.1845 },
  { name: 'Micronesia', lat: 7.4256, lng: 150.5508 },
  { name: 'Nauru', lat: -0.5228, lng: 166.9315 },
  { name: 'New Zealand', lat: -40.9006, lng: 174.8860 },
  { name: 'Palau', lat: 7.5150, lng: 134.5825 },
  { name: 'Papua New Guinea', lat: -6.3150, lng: 143.9555 },
  { name: 'Samoa', lat: -13.7590, lng: -172.1046 },
  { name: 'Solomon Islands', lat: -9.6457, lng: 160.1562 },
  { name: 'Tonga', lat: -21.1789, lng: -175.1982 },
  { name: 'Tuvalu', lat: -7.1095, lng: 177.6493 },
  { name: 'Vanuatu', lat: -15.3767, lng: 166.9592 },
];

const ACTIVITY_TYPES = [
  {
    id: 'group',
    message: 'A new Group was just Created',
    icon: Users,
    color: '#4B5563'
  },
  {
    id: 'organization',
    message: 'A new Organization was just Created',
    icon: Building2,
    color: '#4B5563'
  },
  {
    id: 'joined',
    message: 'Somebody just joined',
    icon: Sparkles,
    color: '#4B5563'
  },
  {
    id: 'project',
    message: 'A new Project was just Created',
    icon: Folder,
    color: '#4B5563'
  },
  {
    id: 'course',
    message: 'A new Course just started',
    icon: BookOpen,
    color: '#4B5563'
  },
  {
    id: 'event',
    message: 'A new event started',
    icon: Calendar,
    color: '#4B5563'
  }
];

// OPTIMIZED TIMING CONFIGURATION FOR SMOOTH SINGLE-BUBBLE EXPERIENCE
const FADE_IN_DURATION = 400;        // 400ms fade in
const DISPLAY_DURATION = 2500;       // 2500ms visible display
const FADE_OUT_DURATION = 400;       // 400ms fade out
const INTERVAL_BETWEEN_BUBBLES = 500; // 500ms wait before next bubble

// Total cycle: 400 + 2500 + 400 + 500 = 3800ms
const TOTAL_CYCLE_TIME = FADE_IN_DURATION + DISPLAY_DURATION + FADE_OUT_DURATION + INTERVAL_BETWEEN_BUBBLES;

// RESPONSIVE BUBBLE DIMENSIONS
const getBubbleDimensions = () => {
  const width = window.innerWidth;
  
  if (width <= 375) {
    return { width: 200, height: 70 };
  } else if (width <= 480) {
    return { width: 220, height: 70 };
  } else if (width <= 768) {
    return { width: 220, height: 70 };
  } else if (width <= 1024) {
    return { width: 250, height: 70 };
  } else {
    return { width: 280, height: 70 };
  }
};

// BOUNDARY MARGIN (responsive)
const getBoundaryMargin = () => {
  const width = window.innerWidth;
  
  if (width < 768) {
    return 20; // 20px margin for mobile
  } else if (width < 1024) {
    return 25; // 25px margin for tablet
  } else {
    return 30; // 30px margin for desktop
  }
};

function ActivityBubbles({ selectedCountry, onCountrySelect }) {
  const [currentBubble, setCurrentBubble] = useState(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const bubbleIdCounter = useRef(0);

  // Update container dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setContainerDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  /**
   * Apply boundary constraints to ensure bubbles stay within map with margins
   * Checks all four boundaries (left, right, top, bottom)
   */
  const applyBoundaryConstraints = (x, y, mapWidth, mapHeight) => {
    const bubbleDimensions = getBubbleDimensions();
    const margin = getBoundaryMargin();

    let constrainedX = x;
    let constrainedY = y;

    // Left boundary
    if (constrainedX < margin) {
      constrainedX = margin;
    }

    // Right boundary
    if (constrainedX + bubbleDimensions.width > mapWidth - margin) {
      constrainedX = mapWidth - bubbleDimensions.width - margin;
    }

    // Top boundary
    if (constrainedY < margin) {
      constrainedY = margin;
    }

    // Bottom boundary
    if (constrainedY + bubbleDimensions.height > mapHeight - margin) {
      constrainedY = mapHeight - bubbleDimensions.height - margin;
    }

    return { x: constrainedX, y: constrainedY };
  };

  /**
   * Convert latitude/longitude to pixel coordinates using Mercator projection
   * with boundary constraints
   */
  const latLngToPixel = (lat, lng, mapWidth, mapHeight) => {
    // Mercator projection formula
    const rawX = (lng + 180) / 360 * mapWidth;
    const rawY = (90 - lat) / 180 * mapHeight;

    // Add random offset for variation (±30px)
    const randomOffsetX = (Math.random() - 0.5) * 60;
    const randomOffsetY = (Math.random() - 0.5) * 60;

    const x = rawX + randomOffsetX;
    const y = rawY + randomOffsetY;

    // Apply boundary constraints
    return applyBoundaryConstraints(x, y, mapWidth, mapHeight);
  };

  // Generate random position using country coordinates
  const generateRandomPosition = () => {
    if (!containerDimensions.width || !containerDimensions.height) {
      return { x: 50, y: 50, country: 'Unknown' };
    }

    // Truly random country selection
    const randomCountry = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];

    // Convert lat/lng to pixel coordinates with boundary constraints
    const position = latLngToPixel(
      randomCountry.lat,
      randomCountry.lng,
      containerDimensions.width,
      containerDimensions.height
    );

    return {
      ...position,
      country: randomCountry.name
    };
  };

  /**
   * Create and manage bubble lifecycle
   * Timeline:
   * 0ms: Bubble created, fade-in starts
   * 0-400ms: Fade in animation
   * 400ms: Bubble fully visible
   * 400-2900ms: Display (2500ms)
   * 2900ms: Fade out starts
   * 2900-3300ms: Fade out animation (400ms)
   * 3300ms: Bubble removed from DOM
   * 3300-3800ms: Wait interval (500ms)
   * 3800ms: Next bubble created
   */
  const createBubbleCycle = () => {
    const activityType = ACTIVITY_TYPES[Math.floor(Math.random() * ACTIVITY_TYPES.length)];
    const position = generateRandomPosition();
    const id = bubbleIdCounter.current++;
    const timestamp = Date.now();

    const newBubble = {
      id,
      ...activityType,
      position,
      country: position.country,
      createdAt: timestamp
    };

    console.log(`[${new Date(timestamp).toISOString()}] 🟢 Bubble created: ${position.country} - ${activityType.message} at (${Math.round(position.x)}, ${Math.round(position.y)})`);

    // Set the current bubble (only one at a time)
    setCurrentBubble(newBubble);

    // Log fade-in completion
    setTimeout(() => {
      console.log(`[${new Date().toISOString()}] ✨ Fade-in complete: ${position.country}`);
    }, FADE_IN_DURATION);

    // Log fade-out start
    setTimeout(() => {
      console.log(`[${new Date().toISOString()}] 🔄 Fade-out starting: ${position.country}`);
    }, FADE_IN_DURATION + DISPLAY_DURATION);

    // Remove bubble after display + fade-out
    setTimeout(() => {
      const removeTimestamp = Date.now();
      console.log(`[${new Date(removeTimestamp).toISOString()}] 🔴 Bubble removed: ${position.country} (total lifetime: ${removeTimestamp - timestamp}ms)`);
      setCurrentBubble(null);
    }, FADE_IN_DURATION + DISPLAY_DURATION + FADE_OUT_DURATION);

    // Schedule next bubble creation after complete cycle
    cycleTimeoutRef.current = setTimeout(() => {
      console.log(`[${new Date().toISOString()}] ⏭️  Creating next bubble...`);
      createBubbleCycle();
    }, TOTAL_CYCLE_TIME);
  };

  // Start bubble cycle when dimensions are available
  useEffect(() => {
    if (containerDimensions.width && containerDimensions.height) {
      console.log('🚀 Starting activity bubbles with optimized timing and boundary constraints...');
      console.log(`📊 Timing: ${FADE_IN_DURATION}ms fade-in + ${DISPLAY_DURATION}ms display + ${FADE_OUT_DURATION}ms fade-out + ${INTERVAL_BETWEEN_BUBBLES}ms interval = ${TOTAL_CYCLE_TIME}ms total cycle`);
      console.log(`📐 Map dimensions: ${containerDimensions.width}x${containerDimensions.height}px`);
      console.log(`📏 Bubble dimensions: ${getBubbleDimensions().width}x${getBubbleDimensions().height}px with ${getBoundaryMargin()}px margin`);
      
      // Start first bubble immediately
      createBubbleCycle();
    }

    return () => {
      // Cleanup: clear cycle timeout
      if (cycleTimeoutRef.current) {
        clearTimeout(cycleTimeoutRef.current);
      }
    };
  }, [containerDimensions]);

  // Animation variants with optimized timing
  const bubbleVariants = {
    initial: {
      opacity: 0,
      scale: 0.85,
      y: 15
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: FADE_IN_DURATION / 1000, // Convert to seconds
        ease: [0.4, 0, 0.2, 1] // Smooth easing
      }
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      y: -15,
      transition: {
        duration: FADE_OUT_DURATION / 1000, // Convert to seconds
        ease: [0.4, 0, 0.2, 1] // Smooth easing
      }
    }
  };

  /**
   * Handle bubble click to select country
   * Clicking a bubble will set that country as the selected filter
   */
  const handleBubbleClick = (country) => {
    if (onCountrySelect) {
      // Toggle: if clicking the same country, deselect it
      if (selectedCountry === country) {
        onCountrySelect(null);
        console.log(`🔵 Country deselected: ${country}`);
      } else {
        onCountrySelect(country);
        console.log(`🔵 Country selected: ${country}`);
      }
    }
  };

  return (
    <div ref={containerRef} className="activity-bubbles-container">
      <AnimatePresence mode="wait">
        {currentBubble && (
          <motion.div
            key={currentBubble.id}
            className={`activity-bubble ${selectedCountry === currentBubble.country ? 'activity-bubble-selected' : ''}`}
            style={{
              left: `${currentBubble.position.x}px`,
              top: `${currentBubble.position.y}px`,
              cursor: 'pointer',
              pointerEvents: 'auto'
            }}
            variants={bubbleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => handleBubbleClick(currentBubble.country)}
            role="button"
            tabIndex={0}
            aria-label={`Filter by ${currentBubble.country}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleBubbleClick(currentBubble.country);
              }
            }}
          >
            <div className="activity-bubble-content">
              {React.createElement(currentBubble.icon, {
                size: 10,
                className: "activity-bubble-icon",
                style: { color: currentBubble.color },
                'aria-hidden': true
              })}
              <span className="activity-bubble-text">
                In {currentBubble.country}: {currentBubble.message}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ActivityBubbles;
