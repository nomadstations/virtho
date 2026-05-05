import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, BookOpen, ShoppingBag, Users } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import SearchBar from '@/components/SearchBar';
import ActivityBubbles from '@/components/ActivityBubbles';
import { Card } from '@/components/SharedUI';
import { ROUTES } from '@/constants';
import { mockCourses } from '@/data/mockCourses';
import { useTheme } from '@/contexts/ThemeContext';
import '@/pages/HomePage.css';

// GeoJSON URL for world map topology (natural earth data)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Comprehensive city lights data - 325+ cities worldwide with 5 intensity tiers
const cityLights = [
// NORTH AMERICA - 52 cities
{
  name: 'New York',
  coords: [-74.0060, 40.7128],
  intensity: 'mega'
}, {
  name: 'Los Angeles',
  coords: [-118.2437, 34.0522],
  intensity: 'mega'
}, {
  name: 'Chicago',
  coords: [-87.6298, 41.8781],
  intensity: 'mega'
}, {
  name: 'Mexico City',
  coords: [-99.1332, 19.4326],
  intensity: 'mega'
}, {
  name: 'Toronto',
  coords: [-79.3832, 43.6532],
  intensity: 'mega'
}, {
  name: 'Boston',
  coords: [-71.0589, 42.3601],
  intensity: 'large'
}, {
  name: 'Philadelphia',
  coords: [-75.1652, 39.9526],
  intensity: 'large'
}, {
  name: 'San Francisco',
  coords: [-122.4194, 37.7749],
  intensity: 'large'
}, {
  name: 'Dallas',
  coords: [-96.7970, 32.7767],
  intensity: 'large'
}, {
  name: 'Houston',
  coords: [-95.3698, 29.7604],
  intensity: 'large'
}, {
  name: 'Washington DC',
  coords: [-77.0369, 38.9072],
  intensity: 'large'
}, {
  name: 'Miami',
  coords: [-80.1918, 25.7617],
  intensity: 'large'
}, {
  name: 'Atlanta',
  coords: [-84.3880, 33.7490],
  intensity: 'large'
}, {
  name: 'Montreal',
  coords: [-73.5673, 45.5017],
  intensity: 'large'
}, {
  name: 'Vancouver',
  coords: [-123.1207, 49.2827],
  intensity: 'large'
}, {
  name: 'Seattle',
  coords: [-122.3321, 47.6062],
  intensity: 'medium'
}, {
  name: 'Phoenix',
  coords: [-112.0740, 33.4484],
  intensity: 'medium'
}, {
  name: 'San Diego',
  coords: [-117.1611, 32.7157],
  intensity: 'medium'
}, {
  name: 'Baltimore',
  coords: [-76.6122, 39.2904],
  intensity: 'medium'
}, {
  name: 'Tampa',
  coords: [-82.4572, 27.9506],
  intensity: 'medium'
}, {
  name: 'Orlando',
  coords: [-81.3792, 28.5383],
  intensity: 'medium'
}, {
  name: 'Denver',
  coords: [-104.9903, 39.7392],
  intensity: 'medium'
}, {
  name: 'Portland',
  coords: [-122.6765, 45.5152],
  intensity: 'medium'
}, {
  name: 'Las Vegas',
  coords: [-115.1398, 36.1699],
  intensity: 'medium'
}, {
  name: 'Detroit',
  coords: [-83.0458, 42.3314],
  intensity: 'medium'
}, {
  name: 'Minneapolis',
  coords: [-93.2650, 44.9778],
  intensity: 'medium'
}, {
  name: 'Charlotte',
  coords: [-80.8431, 35.2271],
  intensity: 'small'
}, {
  name: 'San Antonio',
  coords: [-98.4936, 29.4241],
  intensity: 'small'
}, {
  name: 'Austin',
  coords: [-97.7431, 30.2672],
  intensity: 'small'
}, {
  name: 'Jacksonville',
  coords: [-81.6557, 30.3322],
  intensity: 'small'
}, {
  name: 'Indianapolis',
  coords: [-86.1581, 39.7684],
  intensity: 'small'
}, {
  name: 'Columbus',
  coords: [-82.9988, 39.9612],
  intensity: 'small'
}, {
  name: 'Milwaukee',
  coords: [-87.9065, 43.0389],
  intensity: 'small'
}, {
  name: 'Nashville',
  coords: [-86.7816, 36.1627],
  intensity: 'small'
}, {
  name: 'Kansas City',
  coords: [-94.5786, 39.0997],
  intensity: 'small'
}, {
  name: 'St. Louis',
  coords: [-90.1994, 38.6270],
  intensity: 'small'
}, {
  name: 'Calgary',
  coords: [-114.0719, 51.0447],
  intensity: 'small'
}, {
  name: 'Edmonton',
  coords: [-113.4909, 53.5461],
  intensity: 'small'
}, {
  name: 'Ottawa',
  coords: [-75.6972, 45.4215],
  intensity: 'small'
}, {
  name: 'Guadalajara',
  coords: [-103.3494, 20.6597],
  intensity: 'small'
}, {
  name: 'Monterrey',
  coords: [-100.3161, 25.6866],
  intensity: 'small'
}, {
  name: 'Richmond',
  coords: [-77.4360, 37.5407],
  intensity: 'town'
}, {
  name: 'Cleveland',
  coords: [-81.6944, 41.4993],
  intensity: 'town'
}, {
  name: 'Pittsburgh',
  coords: [-79.9959, 40.4406],
  intensity: 'town'
}, {
  name: 'Cincinnati',
  coords: [-84.5120, 39.1031],
  intensity: 'town'
}, {
  name: 'Memphis',
  coords: [-90.0490, 35.1495],
  intensity: 'town'
}, {
  name: 'Louisville',
  coords: [-85.7585, 38.2527],
  intensity: 'town'
}, {
  name: 'Birmingham',
  coords: [-86.8025, 33.5207],
  intensity: 'town'
}, {
  name: 'New Orleans',
  coords: [-90.0715, 29.9511],
  intensity: 'town'
}, {
  name: 'Salt Lake City',
  coords: [-111.8910, 40.7608],
  intensity: 'town'
}, {
  name: 'Puebla',
  coords: [-98.2063, 19.0414],
  intensity: 'town'
}, {
  name: 'Cancún',
  coords: [-86.8515, 21.1619],
  intensity: 'town'
},
// SOUTH AMERICA - 38 cities
{
  name: 'São Paulo',
  coords: [-46.6333, -23.5505],
  intensity: 'mega'
}, {
  name: 'Buenos Aires',
  coords: [-58.3816, -34.6037],
  intensity: 'mega'
}, {
  name: 'Rio de Janeiro',
  coords: [-43.1729, -22.9068],
  intensity: 'mega'
}, {
  name: 'Lima',
  coords: [-77.0428, -12.0464],
  intensity: 'large'
}, {
  name: 'Bogotá',
  coords: [-74.0721, 4.7110],
  intensity: 'large'
}, {
  name: 'Santiago',
  coords: [-70.6693, -33.4489],
  intensity: 'large'
}, {
  name: 'Caracas',
  coords: [-66.9036, 10.4806],
  intensity: 'large'
}, {
  name: 'Brasília',
  coords: [-47.8822, -15.7942],
  intensity: 'large'
}, {
  name: 'Salvador',
  coords: [-38.5014, -12.9714],
  intensity: 'medium'
}, {
  name: 'Recife',
  coords: [-34.8770, -8.0476],
  intensity: 'medium'
}, {
  name: 'Fortaleza',
  coords: [-38.5434, -3.7172],
  intensity: 'medium'
}, {
  name: 'Belo Horizonte',
  coords: [-43.9378, -19.9167],
  intensity: 'medium'
}, {
  name: 'Medellín',
  coords: [-75.5812, 6.2442],
  intensity: 'medium'
}, {
  name: 'Cali',
  coords: [-76.5225, 3.4516],
  intensity: 'medium'
}, {
  name: 'Córdoba',
  coords: [-64.1811, -31.4135],
  intensity: 'medium'
}, {
  name: 'Rosario',
  coords: [-60.6393, -32.9442],
  intensity: 'medium'
}, {
  name: 'Porto Alegre',
  coords: [-51.2177, -30.0346],
  intensity: 'small'
}, {
  name: 'Curitiba',
  coords: [-49.2643, -25.4284],
  intensity: 'small'
}, {
  name: 'Manaus',
  coords: [-60.0217, -3.1190],
  intensity: 'small'
}, {
  name: 'Belém',
  coords: [-48.5044, -1.4558],
  intensity: 'small'
}, {
  name: 'Goiânia',
  coords: [-49.2539, -16.6869],
  intensity: 'small'
}, {
  name: 'Barranquilla',
  coords: [-74.7813, 10.9685],
  intensity: 'small'
}, {
  name: 'Quito',
  coords: [-78.4678, -0.1807],
  intensity: 'small'
}, {
  name: 'Guayaquil',
  coords: [-79.8862, -2.1894],
  intensity: 'small'
}, {
  name: 'Montevideo',
  coords: [-56.1645, -34.9011],
  intensity: 'small'
}, {
  name: 'La Paz',
  coords: [-68.1193, -16.4897],
  intensity: 'small'
}, {
  name: 'Santa Cruz',
  coords: [-63.1812, -17.8146],
  intensity: 'small'
}, {
  name: 'Asunción',
  coords: [-57.5759, -25.2637],
  intensity: 'small'
}, {
  name: 'Valparaíso',
  coords: [-71.6187, -33.0472],
  intensity: 'town'
}, {
  name: 'Concepción',
  coords: [-73.0497, -36.8270],
  intensity: 'town'
}, {
  name: 'Antofagasta',
  coords: [-70.4000, -23.6500],
  intensity: 'town'
}, {
  name: 'Mendoza',
  coords: [-68.8272, -32.8895],
  intensity: 'town'
}, {
  name: 'La Plata',
  coords: [-57.9545, -34.9205],
  intensity: 'town'
}, {
  name: 'Valencia',
  coords: [-68.0076, 10.1621],
  intensity: 'town'
}, {
  name: 'Maracaibo',
  coords: [-71.6124, 10.6666],
  intensity: 'town'
}, {
  name: 'Arequipa',
  coords: [-71.5350, -16.4090],
  intensity: 'town'
}, {
  name: 'Cusco',
  coords: [-71.9675, -13.5320],
  intensity: 'town'
}, {
  name: 'Paramaribo',
  coords: [-55.2038, 5.8520],
  intensity: 'town'
},
// EUROPE - 53 cities
{
  name: 'London',
  coords: [-0.1278, 51.5074],
  intensity: 'mega'
}, {
  name: 'Paris',
  coords: [2.3522, 48.8566],
  intensity: 'mega'
}, {
  name: 'Moscow',
  coords: [37.6173, 55.7558],
  intensity: 'mega'
}, {
  name: 'Istanbul',
  coords: [28.9784, 41.0082],
  intensity: 'mega'
}, {
  name: 'Madrid',
  coords: [-3.7038, 40.4168],
  intensity: 'mega'
}, {
  name: 'Berlin',
  coords: [13.4050, 52.5200],
  intensity: 'large'
}, {
  name: 'Rome',
  coords: [12.4964, 41.9028],
  intensity: 'large'
}, {
  name: 'Barcelona',
  coords: [2.1734, 41.3851],
  intensity: 'large'
}, {
  name: 'Saint Petersburg',
  coords: [30.3609, 59.9311],
  intensity: 'large'
}, {
  name: 'Milan',
  coords: [9.1900, 45.4642],
  intensity: 'large'
}, {
  name: 'Munich',
  coords: [11.5820, 48.1351],
  intensity: 'large'
}, {
  name: 'Athens',
  coords: [23.7275, 37.9838],
  intensity: 'large'
}, {
  name: 'Amsterdam',
  coords: [4.9041, 52.3676],
  intensity: 'large'
}, {
  name: 'Brussels',
  coords: [4.3517, 50.8503],
  intensity: 'large'
}, {
  name: 'Vienna',
  coords: [16.3738, 48.2082],
  intensity: 'large'
}, {
  name: 'Hamburg',
  coords: [9.9937, 53.5511],
  intensity: 'medium'
}, {
  name: 'Warsaw',
  coords: [21.0122, 52.2297],
  intensity: 'medium'
}, {
  name: 'Budapest',
  coords: [19.0402, 47.4979],
  intensity: 'medium'
}, {
  name: 'Bucharest',
  coords: [26.1025, 44.4268],
  intensity: 'medium'
}, {
  name: 'Prague',
  coords: [14.4378, 50.0755],
  intensity: 'medium'
}, {
  name: 'Copenhagen',
  coords: [12.5683, 55.6761],
  intensity: 'medium'
}, {
  name: 'Stockholm',
  coords: [18.0686, 59.3293],
  intensity: 'medium'
}, {
  name: 'Dublin',
  coords: [-6.2603, 53.3498],
  intensity: 'medium'
}, {
  name: 'Lisbon',
  coords: [-9.1393, 38.7223],
  intensity: 'medium'
}, {
  name: 'Lyon',
  coords: [4.8357, 45.7640],
  intensity: 'small'
}, {
  name: 'Marseille',
  coords: [5.3698, 43.2965],
  intensity: 'small'
}, {
  name: 'Toulouse',
  coords: [1.4442, 43.6047],
  intensity: 'small'
}, {
  name: 'Frankfurt',
  coords: [8.6821, 50.1109],
  intensity: 'small'
}, {
  name: 'Cologne',
  coords: [6.9603, 50.9375],
  intensity: 'small'
}, {
  name: 'Stuttgart',
  coords: [9.1829, 48.7758],
  intensity: 'small'
}, {
  name: 'Naples',
  coords: [14.2681, 40.8518],
  intensity: 'small'
}, {
  name: 'Turin',
  coords: [7.6869, 45.0703],
  intensity: 'small'
}, {
  name: 'Valencia',
  coords: [-0.3763, 39.4699],
  intensity: 'small'
}, {
  name: 'Seville',
  coords: [-5.9845, 37.3891],
  intensity: 'small'
}, {
  name: 'Rotterdam',
  coords: [4.4777, 51.9225],
  intensity: 'small'
}, {
  name: 'Antwerp',
  coords: [4.4025, 51.2194],
  intensity: 'small'
}, {
  name: 'Kraków',
  coords: [19.9450, 50.0647],
  intensity: 'small'
}, {
  name: 'Oslo',
  coords: [10.7522, 59.9139],
  intensity: 'small'
}, {
  name: 'Helsinki',
  coords: [24.9384, 60.1699],
  intensity: 'small'
}, {
  name: 'Belgrade',
  coords: [20.4489, 44.7866],
  intensity: 'small'
}, {
  name: 'Sofia',
  coords: [23.3219, 42.6977],
  intensity: 'small'
}, {
  name: 'Manchester',
  coords: [-2.2426, 53.4808],
  intensity: 'town'
}, {
  name: 'Birmingham',
  coords: [-1.8904, 52.4862],
  intensity: 'town'
}, {
  name: 'Leeds',
  coords: [-1.5491, 53.8008],
  intensity: 'town'
}, {
  name: 'Glasgow',
  coords: [-4.2518, 55.8642],
  intensity: 'town'
}, {
  name: 'Liverpool',
  coords: [-2.9916, 53.4084],
  intensity: 'town'
}, {
  name: 'Edinburgh',
  coords: [-3.1883, 55.9533],
  intensity: 'town'
}, {
  name: 'Düsseldorf',
  coords: [6.7735, 51.2277],
  intensity: 'town'
}, {
  name: 'Leipzig',
  coords: [12.3731, 51.3397],
  intensity: 'town'
}, {
  name: 'Dresden',
  coords: [13.7373, 51.0504],
  intensity: 'town'
}, {
  name: 'Porto',
  coords: [-8.6291, 41.1579],
  intensity: 'town'
}, {
  name: 'Zurich',
  coords: [8.5417, 47.3769],
  intensity: 'town'
}, {
  name: 'Geneva',
  coords: [6.1432, 46.2044],
  intensity: 'town'
},
// AFRICA - 42 cities
{
  name: 'Cairo',
  coords: [31.2357, 30.0444],
  intensity: 'mega'
}, {
  name: 'Lagos',
  coords: [3.3792, 6.5244],
  intensity: 'mega'
}, {
  name: 'Kinshasa',
  coords: [15.3136, -4.3276],
  intensity: 'mega'
}, {
  name: 'Johannesburg',
  coords: [28.0436, -26.2023],
  intensity: 'large'
}, {
  name: 'Khartoum',
  coords: [32.5599, 15.5007],
  intensity: 'large'
}, {
  name: 'Nairobi',
  coords: [36.8219, -1.2921],
  intensity: 'large'
}, {
  name: 'Dar es Salaam',
  coords: [39.2083, -6.7924],
  intensity: 'large'
}, {
  name: 'Abidjan',
  coords: [-4.0283, 5.3600],
  intensity: 'large'
}, {
  name: 'Luanda',
  coords: [13.2343, -8.8383],
  intensity: 'large'
}, {
  name: 'Alexandria',
  coords: [29.9187, 31.2001],
  intensity: 'medium'
}, {
  name: 'Casablanca',
  coords: [-7.5898, 33.5731],
  intensity: 'medium'
}, {
  name: 'Algiers',
  coords: [3.0588, 36.7538],
  intensity: 'medium'
}, {
  name: 'Addis Ababa',
  coords: [38.7469, 9.0320],
  intensity: 'medium'
}, {
  name: 'Cape Town',
  coords: [18.4241, -33.9249],
  intensity: 'medium'
}, {
  name: 'Accra',
  coords: [-0.1870, 5.6037],
  intensity: 'medium'
}, {
  name: 'Dakar',
  coords: [-17.4677, 14.7167],
  intensity: 'medium'
}, {
  name: 'Abuja',
  coords: [7.4951, 9.0579],
  intensity: 'medium'
}, {
  name: 'Kano',
  coords: [8.5167, 12.0000],
  intensity: 'medium'
}, {
  name: 'Kampala',
  coords: [32.5825, 0.3476],
  intensity: 'medium'
}, {
  name: 'Douala',
  coords: [9.7043, 4.0511],
  intensity: 'small'
}, {
  name: 'Yaoundé',
  coords: [11.5167, 3.8667],
  intensity: 'small'
}, {
  name: 'Giza',
  coords: [31.2089, 30.0131],
  intensity: 'small'
}, {
  name: 'Ibadan',
  coords: [3.8964, 7.3775],
  intensity: 'small'
}, {
  name: 'Durban',
  coords: [31.0218, -29.8587],
  intensity: 'small'
}, {
  name: 'Pretoria',
  coords: [28.1881, -25.7479],
  intensity: 'small'
}, {
  name: 'Mombasa',
  coords: [39.6682, -4.0435],
  intensity: 'small'
}, {
  name: 'Rabat',
  coords: [-6.8326, 33.9716],
  intensity: 'small'
}, {
  name: 'Tunis',
  coords: [10.1815, 36.8065],
  intensity: 'small'
}, {
  name: 'Lusaka',
  coords: [28.2871, -15.3875],
  intensity: 'small'
}, {
  name: 'Harare',
  coords: [31.0539, -17.8252],
  intensity: 'small'
}, {
  name: 'Fez',
  coords: [-5.0003, 34.0181],
  intensity: 'town'
}, {
  name: 'Marrakech',
  coords: [-7.9811, 31.6295],
  intensity: 'town'
}, {
  name: 'Tangier',
  coords: [-5.8133, 35.7595],
  intensity: 'town'
}, {
  name: 'Oran',
  coords: [-0.6337, 35.6969],
  intensity: 'town'
}, {
  name: 'Constantine',
  coords: [6.6147, 36.3650],
  intensity: 'town'
}, {
  name: 'Kumasi',
  coords: [-1.6163, 6.6885],
  intensity: 'town'
}, {
  name: 'Bamako',
  coords: [-7.9889, 12.6392],
  intensity: 'town'
}, {
  name: 'Ouagadougou',
  coords: [-1.5247, 12.3714],
  intensity: 'town'
}, {
  name: 'Windhoek',
  coords: [17.0658, -22.5597],
  intensity: 'town'
}, {
  name: 'Gaborone',
  coords: [25.9086, -24.6282],
  intensity: 'town'
}, {
  name: 'Port Elizabeth',
  coords: [25.6022, -33.9608],
  intensity: 'town'
}, {
  name: 'Bloemfontein',
  coords: [26.2041, -29.0852],
  intensity: 'town'
},
// MIDDLE EAST - 38 cities
{
  name: 'Tehran',
  coords: [51.3890, 35.6892],
  intensity: 'mega'
}, {
  name: 'Baghdad',
  coords: [44.3615, 33.3128],
  intensity: 'mega'
}, {
  name: 'Riyadh',
  coords: [46.6753, 24.7136],
  intensity: 'large'
}, {
  name: 'Dubai',
  coords: [55.2708, 25.2048],
  intensity: 'large'
}, {
  name: 'Ankara',
  coords: [32.8597, 39.9334],
  intensity: 'large'
}, {
  name: 'Izmir',
  coords: [27.1428, 38.4237],
  intensity: 'large'
}, {
  name: 'Jeddah',
  coords: [39.1727, 21.5433],
  intensity: 'large'
}, {
  name: 'Tel Aviv',
  coords: [34.7818, 32.0853],
  intensity: 'large'
}, {
  name: 'Amman',
  coords: [35.9239, 31.9539],
  intensity: 'large'
}, {
  name: 'Kuwait City',
  coords: [47.9774, 29.3759],
  intensity: 'medium'
}, {
  name: 'Damascus',
  coords: [36.2765, 33.5138],
  intensity: 'medium'
}, {
  name: 'Beirut',
  coords: [35.4953, 33.8886],
  intensity: 'medium'
}, {
  name: 'Doha',
  coords: [51.5310, 25.2854],
  intensity: 'medium'
}, {
  name: 'Abu Dhabi',
  coords: [54.3773, 24.4539],
  intensity: 'medium'
}, {
  name: 'Mashhad',
  coords: [59.5680, 36.2972],
  intensity: 'medium'
}, {
  name: 'Isfahan',
  coords: [51.6746, 32.6546],
  intensity: 'medium'
}, {
  name: 'Basra',
  coords: [47.7831, 30.5085],
  intensity: 'medium'
}, {
  name: 'Jerusalem',
  coords: [35.2137, 31.7683],
  intensity: 'medium'
}, {
  name: 'Sharjah',
  coords: [55.3781, 25.3463],
  intensity: 'small'
}, {
  name: 'Muscat',
  coords: [58.4059, 23.5880],
  intensity: 'small'
}, {
  name: 'Manama',
  coords: [50.5577, 26.2285],
  intensity: 'small'
}, {
  name: 'Aleppo',
  coords: [37.1602, 36.2021],
  intensity: 'small'
}, {
  name: 'Shiraz',
  coords: [52.5836, 29.5918],
  intensity: 'small'
}, {
  name: 'Tabriz',
  coords: [46.2919, 38.0800],
  intensity: 'small'
}, {
  name: 'Qom',
  coords: [50.8764, 34.6416],
  intensity: 'small'
}, {
  name: 'Ahvaz',
  coords: [48.6693, 31.3183],
  intensity: 'small'
}, {
  name: 'Mosul',
  coords: [43.1189, 36.3350],
  intensity: 'small'
}, {
  name: 'Haifa',
  coords: [34.9896, 32.7940],
  intensity: 'small'
}, {
  name: 'Beersheba',
  coords: [34.7913, 31.2518],
  intensity: 'small'
}, {
  name: 'Medina',
  coords: [39.8262, 24.5247],
  intensity: 'small'
}, {
  name: 'Mecca',
  coords: [39.8579, 21.3891],
  intensity: 'small'
}, {
  name: 'Dammam',
  coords: [50.0970, 26.3927],
  intensity: 'small'
}, {
  name: 'Zarqa',
  coords: [36.0880, 32.0667],
  intensity: 'town'
}, {
  name: 'Irbid',
  coords: [35.8500, 32.5556],
  intensity: 'town'
}, {
  name: 'Tripoli',
  coords: [35.8494, 34.4367],
  intensity: 'town'
}, {
  name: 'Homs',
  coords: [36.7167, 34.7333],
  intensity: 'town'
}, {
  name: 'Sana\'a',
  coords: [44.2075, 15.3694],
  intensity: 'town'
}, {
  name: 'Aden',
  coords: [45.0187, 12.7855],
  intensity: 'town'
},
// ASIA - 107 cities
{
  name: 'Tokyo',
  coords: [139.6503, 35.6762],
  intensity: 'mega'
}, {
  name: 'Delhi',
  coords: [77.1025, 28.7041],
  intensity: 'mega'
}, {
  name: 'Shanghai',
  coords: [121.4737, 31.2304],
  intensity: 'mega'
}, {
  name: 'Beijing',
  coords: [116.4074, 39.9042],
  intensity: 'mega'
}, {
  name: 'Mumbai',
  coords: [72.8777, 19.0760],
  intensity: 'mega'
}, {
  name: 'Dhaka',
  coords: [90.4125, 23.8103],
  intensity: 'mega'
}, {
  name: 'Karachi',
  coords: [67.0011, 24.8607],
  intensity: 'mega'
}, {
  name: 'Osaka',
  coords: [135.5023, 34.6937],
  intensity: 'mega'
}, {
  name: 'Chongqing',
  coords: [106.9123, 29.4316],
  intensity: 'mega'
}, {
  name: 'Kolkata',
  coords: [88.3639, 22.5726],
  intensity: 'mega'
}, {
  name: 'Manila',
  coords: [120.9842, 14.5995],
  intensity: 'mega'
}, {
  name: 'Tianjin',
  coords: [117.2008, 39.0842],
  intensity: 'mega'
}, {
  name: 'Guangzhou',
  coords: [113.2644, 23.1291],
  intensity: 'mega'
}, {
  name: 'Shenzhen',
  coords: [114.0579, 22.5431],
  intensity: 'mega'
}, {
  name: 'Lahore',
  coords: [74.3587, 31.5204],
  intensity: 'large'
}, {
  name: 'Bangalore',
  coords: [77.5946, 12.9716],
  intensity: 'large'
}, {
  name: 'Jakarta',
  coords: [106.8456, -6.2088],
  intensity: 'large'
}, {
  name: 'Chennai',
  coords: [80.2707, 13.0827],
  intensity: 'large'
}, {
  name: 'Bangkok',
  coords: [100.5018, 13.7563],
  intensity: 'large'
}, {
  name: 'Seoul',
  coords: [126.9780, 37.5665],
  intensity: 'large'
}, {
  name: 'Nagoya',
  coords: [136.9066, 35.1815],
  intensity: 'large'
}, {
  name: 'Hyderabad',
  coords: [78.4867, 17.3850],
  intensity: 'large'
}, {
  name: 'Chengdu',
  coords: [104.0668, 30.5728],
  intensity: 'large'
}, {
  name: 'Nanjing',
  coords: [118.7969, 32.0603],
  intensity: 'large'
}, {
  name: 'Wuhan',
  coords: [114.3055, 30.5928],
  intensity: 'large'
}, {
  name: 'Ho Chi Minh City',
  coords: [106.7009, 10.7769],
  intensity: 'large'
}, {
  name: 'Ahmedabad',
  coords: [72.5714, 23.0225],
  intensity: 'large'
}, {
  name: 'Kuala Lumpur',
  coords: [101.6869, 3.1390],
  intensity: 'large'
}, {
  name: 'Xi\'an',
  coords: [108.9398, 34.3416],
  intensity: 'large'
}, {
  name: 'Hong Kong',
  coords: [114.1694, 22.3193],
  intensity: 'large'
}, {
  name: 'Dongguan',
  coords: [113.7518, 23.0209],
  intensity: 'medium'
}, {
  name: 'Hangzhou',
  coords: [120.1551, 30.2741],
  intensity: 'medium'
}, {
  name: 'Foshan',
  coords: [113.1220, 23.0218],
  intensity: 'medium'
}, {
  name: 'Shenyang',
  coords: [123.4328, 41.8045],
  intensity: 'medium'
}, {
  name: 'Suzhou',
  coords: [120.5954, 31.2989],
  intensity: 'medium'
}, {
  name: 'Pune',
  coords: [73.8567, 18.5204],
  intensity: 'medium'
}, {
  name: 'Harbin',
  coords: [126.6433, 45.7566],
  intensity: 'medium'
}, {
  name: 'Surat',
  coords: [72.8311, 21.1702],
  intensity: 'medium'
}, {
  name: 'Zhengzhou',
  coords: [113.6254, 34.7466],
  intensity: 'medium'
}, {
  name: 'Shantou',
  coords: [116.6819, 23.3540],
  intensity: 'medium'
}, {
  name: 'Jinan',
  coords: [117.0008, 36.6751],
  intensity: 'medium'
}, {
  name: 'Changsha',
  coords: [112.9388, 28.2282],
  intensity: 'medium'
}, {
  name: 'Taiyuan',
  coords: [112.5489, 37.8706],
  intensity: 'medium'
}, {
  name: 'Shijiazhuang',
  coords: [114.4995, 38.0455],
  intensity: 'medium'
}, {
  name: 'Kunming',
  coords: [102.8329, 24.8801],
  intensity: 'medium'
}, {
  name: 'Changchun',
  coords: [125.3235, 43.8171],
  intensity: 'medium'
}, {
  name: 'Hefei',
  coords: [117.2272, 31.8206],
  intensity: 'medium'
}, {
  name: 'Busan',
  coords: [129.0756, 35.1796],
  intensity: 'medium'
}, {
  name: 'Faisalabad',
  coords: [73.0849, 31.4180],
  intensity: 'medium'
}, {
  name: 'Fukuoka',
  coords: [130.4017, 33.5904],
  intensity: 'medium'
}, {
  name: 'Yokohama',
  coords: [139.6380, 35.4437],
  intensity: 'medium'
}, {
  name: 'Hanoi',
  coords: [105.8542, 21.0285],
  intensity: 'medium'
}, {
  name: 'Rawalpindi',
  coords: [73.0479, 33.5651],
  intensity: 'medium'
}, {
  name: 'Daegu',
  coords: [128.6014, 35.8714],
  intensity: 'medium'
}, {
  name: 'Surabaya',
  coords: [112.7521, -7.2575],
  intensity: 'medium'
}, {
  name: 'Bandung',
  coords: [107.6191, -6.9175],
  intensity: 'medium'
}, {
  name: 'Singapore',
  coords: [103.8198, 1.3521],
  intensity: 'small'
}, {
  name: 'Qingdao',
  coords: [120.3826, 36.0671],
  intensity: 'small'
}, {
  name: 'Dalian',
  coords: [121.6147, 38.9140],
  intensity: 'small'
}, {
  name: 'Ürümqi',
  coords: [87.6177, 43.8256],
  intensity: 'small'
}, {
  name: 'Yangon',
  coords: [96.1951, 16.8661],
  intensity: 'small'
}, {
  name: 'Baku',
  coords: [49.8671, 40.4093],
  intensity: 'small'
}, {
  name: 'Kabul',
  coords: [69.2075, 34.5553],
  intensity: 'small'
}, {
  name: 'Kyoto',
  coords: [135.7681, 35.0116],
  intensity: 'small'
}, {
  name: 'Sapporo',
  coords: [141.3545, 43.0642],
  intensity: 'small'
}, {
  name: 'Kobe',
  coords: [135.1955, 34.6901],
  intensity: 'small'
}, {
  name: 'Kawasaki',
  coords: [139.7172, 35.5308],
  intensity: 'small'
}, {
  name: 'Saitama',
  coords: [139.6489, 35.8617],
  intensity: 'small'
}, {
  name: 'Hiroshima',
  coords: [132.4596, 34.3853],
  intensity: 'small'
}, {
  name: 'Sendai',
  coords: [140.8719, 38.2682],
  intensity: 'small'
}, {
  name: 'Kitakyushu',
  coords: [130.8748, 33.8834],
  intensity: 'small'
}, {
  name: 'Incheon',
  coords: [126.7313, 37.4563],
  intensity: 'small'
}, {
  name: 'Daejeon',
  coords: [127.3845, 36.3504],
  intensity: 'small'
}, {
  name: 'Gwangju',
  coords: [126.8526, 35.1595],
  intensity: 'small'
}, {
  name: 'Suwon',
  coords: [127.0286, 37.2636],
  intensity: 'small'
}, {
  name: 'Ulsan',
  coords: [129.3114, 35.5384],
  intensity: 'small'
}, {
  name: 'Jaipur',
  coords: [75.7873, 26.9124],
  intensity: 'small'
}, {
  name: 'Lucknow',
  coords: [80.9462, 26.8467],
  intensity: 'small'
}, {
  name: 'Kanpur',
  coords: [80.3319, 26.4499],
  intensity: 'small'
}, {
  name: 'Nagpur',
  coords: [79.0882, 21.1458],
  intensity: 'small'
}, {
  name: 'Indore',
  coords: [75.8577, 22.7196],
  intensity: 'small'
}, {
  name: 'Patna',
  coords: [85.1376, 25.5941],
  intensity: 'small'
}, {
  name: 'Bhopal',
  coords: [77.4126, 23.2599],
  intensity: 'small'
}, {
  name: 'Ludhiana',
  coords: [75.8573, 30.9010],
  intensity: 'small'
}, {
  name: 'Islamabad',
  coords: [73.0479, 33.6844],
  intensity: 'small'
}, {
  name: 'Multan',
  coords: [71.5249, 30.1575],
  intensity: 'small'
}, {
  name: 'Peshawar',
  coords: [71.5785, 34.0151],
  intensity: 'small'
}, {
  name: 'Quetta',
  coords: [67.0104, 30.1798],
  intensity: 'small'
}, {
  name: 'Chittagong',
  coords: [91.8123, 22.3569],
  intensity: 'small'
}, {
  name: 'Chiang Mai',
  coords: [98.9817, 18.7883],
  intensity: 'town'
}, {
  name: 'Phuket',
  coords: [98.3381, 7.8804],
  intensity: 'town'
}, {
  name: 'Pattaya',
  coords: [100.8824, 12.9236],
  intensity: 'town'
}, {
  name: 'Da Nang',
  coords: [108.2208, 16.0544],
  intensity: 'town'
}, {
  name: 'Cebu',
  coords: [123.8854, 10.3157],
  intensity: 'town'
}, {
  name: 'Davao',
  coords: [125.6128, 7.1907],
  intensity: 'town'
}, {
  name: 'Medan',
  coords: [98.6722, 3.5952],
  intensity: 'town'
}, {
  name: 'Semarang',
  coords: [110.4203, -6.9932],
  intensity: 'town'
}, {
  name: 'Makassar',
  coords: [119.4327, -5.1477],
  intensity: 'town'
}, {
  name: 'George Town',
  coords: [100.3354, 5.4141],
  intensity: 'town'
}, {
  name: 'Johor Bahru',
  coords: [103.7578, 1.4927],
  intensity: 'town'
}, {
  name: 'Ipoh',
  coords: [101.0901, 4.5975],
  intensity: 'town'
}, {
  name: 'Mandalay',
  coords: [96.0836, 21.9588],
  intensity: 'town'
}, {
  name: 'Phnom Penh',
  coords: [104.9160, 11.5564],
  intensity: 'town'
}, {
  name: 'Kathmandu',
  coords: [85.3240, 27.7172],
  intensity: 'town'
}, {
  name: 'Colombo',
  coords: [79.8612, 6.9271],
  intensity: 'town'
},
// OCEANIA - 27 cities
{
  name: 'Sydney',
  coords: [151.2093, -33.8688],
  intensity: 'mega'
}, {
  name: 'Melbourne',
  coords: [144.9631, -37.8136],
  intensity: 'mega'
}, {
  name: 'Brisbane',
  coords: [153.0251, -27.4698],
  intensity: 'large'
}, {
  name: 'Perth',
  coords: [115.8613, -31.9505],
  intensity: 'large'
}, {
  name: 'Auckland',
  coords: [174.7633, -36.8485],
  intensity: 'large'
}, {
  name: 'Adelaide',
  coords: [138.6007, -34.9285],
  intensity: 'medium'
}, {
  name: 'Gold Coast',
  coords: [153.4000, -28.0167],
  intensity: 'medium'
}, {
  name: 'Newcastle',
  coords: [151.7817, -32.9283],
  intensity: 'medium'
}, {
  name: 'Canberra',
  coords: [149.1300, -35.2809],
  intensity: 'medium'
}, {
  name: 'Wellington',
  coords: [174.7762, -41.2865],
  intensity: 'medium'
}, {
  name: 'Christchurch',
  coords: [172.6362, -43.5321],
  intensity: 'medium'
}, {
  name: 'Wollongong',
  coords: [150.8931, -34.4242],
  intensity: 'small'
}, {
  name: 'Hobart',
  coords: [147.3272, -42.8821],
  intensity: 'small'
}, {
  name: 'Darwin',
  coords: [130.8456, -12.4634],
  intensity: 'small'
}, {
  name: 'Cairns',
  coords: [145.7781, -16.9186],
  intensity: 'small'
}, {
  name: 'Townsville',
  coords: [146.8169, -19.2590],
  intensity: 'small'
}, {
  name: 'Geelong',
  coords: [144.3614, -38.1499],
  intensity: 'small'
}, {
  name: 'Logan City',
  coords: [153.1094, -27.6394],
  intensity: 'small'
}, {
  name: 'Toowoomba',
  coords: [151.9507, -27.5598],
  intensity: 'small'
}, {
  name: 'Hamilton',
  coords: [175.2528, -37.7870],
  intensity: 'small'
}, {
  name: 'Tauranga',
  coords: [176.1651, -37.6878],
  intensity: 'small'
}, {
  name: 'Albury',
  coords: [146.9167, -36.0737],
  intensity: 'town'
}, {
  name: 'Bendigo',
  coords: [144.2794, -36.7570],
  intensity: 'town'
}, {
  name: 'Ballarat',
  coords: [143.8503, -37.5622],
  intensity: 'town'
}, {
  name: 'Launceston',
  coords: [147.1386, -41.4332],
  intensity: 'town'
}, {
  name: 'Dunedin',
  coords: [170.5028, -45.8788],
  intensity: 'town'
}, {
  name: 'Palmerston North',
  coords: [175.6082, -40.3523],
  intensity: 'town'
}];

// Helper function to get circle radius based on intensity
const getCircleRadius = intensity => {
  switch (intensity) {
    case 'mega':
      return 4.5;
    case 'large':
      return 3.25;
    case 'medium':
      return 2.5;
    case 'small':
      return 1.8;
    case 'town':
      return 1;
    default:
      return 2;
  }
};

// Helper function to get class name based on intensity
const getLightClass = intensity => {
  return `night-light night-light-${intensity}`;
};
function HomePage() {
  const healthScrollRef = useRef(null);
  const knowledgeScrollRef = useRef(null);
  const economyScrollRef = useRef(null);
  const socialScrollRef = useRef(null);
  const {
    isDarkMode
  } = useTheme();

  // Country filter state
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Handle search submission with country filter
  const handleSearch = (query, country) => {
    console.log('Search query:', query);
    console.log('Selected country:', country);

    // TODO: Implement search functionality with Elasticsearch
    // When Elasticsearch is integrated, this will filter results by both query and country
    // Example:
    // const results = await searchWithElasticsearch({
    //   query: query,
    //   filters: {
    //     country: country
    //   }
    // });
  };

  // Handle country selection from map/bubbles
  const handleCountrySelect = country => {
    setSelectedCountry(country);
    console.log('Country filter updated:', country);
  };

  // Handle clear country filter
  const handleClearCountryFilter = () => {
    setSelectedCountry(null);
    console.log('Country filter cleared');
  };

  // Handle country click from map geography
  const handleMapCountryClick = geo => {
    const countryName = geo.properties.name;
    if (selectedCountry === countryName) {
      // Toggle: deselect if clicking the same country
      setSelectedCountry(null);
      console.log(`Map country deselected: ${countryName}`);
    } else {
      setSelectedCountry(countryName);
      console.log(`Map country selected: ${countryName}`);
    }
  };

  // Mock data for Health section
  const healthItems = [{
    id: 1,
    title: 'Mental Wellness Program',
    description: 'Comprehensive mental health support and mindfulness training for better well-being.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    category: 'Wellness'
  }, {
    id: 2,
    title: 'Nutrition & Fitness',
    description: 'Personalized nutrition plans and fitness routines tailored to your health goals.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
    category: 'Health'
  }, {
    id: 3,
    title: 'Sleep Optimization',
    description: 'Evidence-based strategies to improve sleep quality and establish healthy sleep patterns.',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop',
    category: 'Wellness'
  }, {
    id: 4,
    title: 'Preventive Care',
    description: 'Regular health screenings and preventive measures to maintain optimal health.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    category: 'Health'
  }];

  // Mock data for Knowledge section (using existing mockCourses)
  const knowledgeItems = mockCourses.slice(0, 4);

  // Mock data for Economy section
  const economyItems = [{
    id: 1,
    name: 'Modern Workspace Desk',
    price: 29900,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=600&fit=crop',
    category: 'Furniture',
    rating: 4.8
  }, {
    id: 2,
    name: 'Ergonomic Office Chair',
    price: 34900,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=600&fit=crop',
    category: 'Furniture',
    rating: 4.9
  }, {
    id: 3,
    name: 'Professional Camera Kit',
    price: 89900,
    image: 'https://images.unsplash.com/photo-1606810480552-b6d895ff0ed3?w=800&h=600&fit=crop',
    category: 'Electronics',
    rating: 4.7
  }, {
    id: 4,
    name: 'Wireless Headphones',
    price: 24900,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
    category: 'Electronics',
    rating: 4.6
  }];

  // Mock data for Social section
  const socialItems = [{
    id: 1,
    name: 'Environmental Warriors',
    description: 'Join our community dedicated to environmental conservation and sustainable living.',
    members: 1247,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
    category: 'Environment'
  }, {
    id: 2,
    name: 'Tech Innovators Hub',
    description: 'Connect with tech enthusiasts and innovators building the future of technology.',
    members: 2156,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
    category: 'Technology'
  }, {
    id: 3,
    name: 'Creative Arts Collective',
    description: 'A vibrant community of artists, designers, and creative minds sharing inspiration.',
    members: 987,
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop',
    category: 'Arts'
  }, {
    id: 4,
    name: 'Global Entrepreneurs',
    description: 'Network with entrepreneurs worldwide, share ideas, and grow your business together.',
    members: 3421,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
    category: 'Business'
  }];
  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      ref.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return <>
      <Helmet>
        <title>Virtho - Human Development Hub</title>
        <meta name="description" content="Explore our global impact and discover opportunities in health, knowledge, economy, and social development. Join Virtho Foundation today." />
      </Helmet>

      {/* Search Bar Section - NOW POSITIONED ABOVE MAP */}
      <section className="home-search-section">
        <div className="home-search-container">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <SearchBar placeholder="Search everywhere" onSearch={handleSearch} selectedCountry={selectedCountry} onClearCountry={handleClearCountryFilter} />
          </motion.div>
        </div>
      </section>

      {/* World Map Section - NOW POSITIONED BELOW SEARCH */}
      <section className="home-map-section">
        <div className="home-map-container">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="home-map-title">
            Click on any country for local results
          </motion.h2>
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className={`home-map-wrapper ${isDarkMode ? 'dark-mode-map' : ''}`}>
            <ComposableMap projection="geoMercator" projectionConfig={{
            scale: 140,
            center: [0, 20]
          }} style={{
            width: '100%',
            height: '100%'
          }}>
              {/* SVG Filter Definitions for Glow Effects */}
              <defs>
                {/* Continent gradient for blue/purple tones */}
                <linearGradient id="continentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2a4365" />
                  <stop offset="50%" stopColor="#2d3748" />
                  <stop offset="100%" stopColor="#1a365d" />
                </linearGradient>

                {/* Glow filters for different city intensities */}
                <filter id="nightLightGlowMega" x="-300%" y="-300%" width="600%" height="600%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="nightLightGlowLarge" x="-250%" y="-250%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="nightLightGlowMedium" x="-200%" y="-200%" width="400%" height="400%">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="nightLightGlowSmall" x="-150%" y="-150%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="nightLightGlowTown" x="-100%" y="-100%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Map Geography with Click Handler */}
              <Geographies geography={geoUrl}>
                {({
                geographies
              }) => geographies.map(geo => {
                const countryName = geo.properties.name;
                const isSelected = selectedCountry === countryName;
                return <Geography key={geo.rsmKey} geography={geo} fill={isSelected ? isDarkMode ? '#F59E0B' : 'hsl(var(--lavender-primary))' : isDarkMode ? "url(#continentGradient)" : "hsl(var(--lavender-light))"} stroke={isSelected ? isDarkMode ? '#FBBF24' : 'hsl(var(--lavender-dark))' : 'none'} strokeWidth={isSelected ? 1.5 : 0} onClick={() => handleMapCountryClick(geo)} style={{
                  default: {
                    outline: 'none',
                    transition: 'fill 0.3s ease, stroke 0.3s ease',
                    cursor: 'pointer'
                  },
                  hover: {
                    fill: isDarkMode ? '#D97706' : 'hsl(var(--lavender-primary))',
                    outline: 'none',
                    cursor: 'pointer'
                  },
                  pressed: {
                    fill: isDarkMode ? '#CC6600' : 'hsl(var(--lavender-dark))',
                    outline: 'none'
                  }
                }} />;
              })}
              </Geographies>
              
              {/* Night Lights Layer (only in dark mode) */}
              {isDarkMode && cityLights.map((city, index) => <Marker key={`light-${city.name}-${index}`} coordinates={city.coords}>
                  <circle r={getCircleRadius(city.intensity)} className={getLightClass(city.intensity)} style={{
                opacity: 0.95
              }} />
                </Marker>)}
            </ComposableMap>

            {/* Activity Bubbles Layer with Country Selection */}
            <ActivityBubbles selectedCountry={selectedCountry} onCountrySelect={handleCountrySelect} />
          </motion.div>
        </div>
      </section>

      {/* Health Carousel Section */}
      <section className="home-carousel-section">
        <div className="home-carousel-container">
          <div className="home-carousel-header">
            <div>
              <h2 className="home-carousel-title">
                <Heart className="inline-block w-8 h-8 mr-2 text-pink-500" />
                Health
              </h2>
              <p className="home-carousel-subtitle">Discover wellness programs and health resources</p>
            </div>
          </div>

          <div className="home-carousel-wrapper">
            <div className="home-carousel-track" ref={healthScrollRef}>
              {healthItems.map(item => <div key={item.id} className="home-carousel-item">
                  <Card hover className="h-full overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold mb-3">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </Card>
                </div>)}
            </div>
          </div>

          <div className="home-carousel-controls">
            <button onClick={() => scroll(healthScrollRef, 'left')} className="home-carousel-button" aria-label="Scroll left">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll(healthScrollRef, 'right')} className="home-carousel-button" aria-label="Scroll right">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <Link to={ROUTES.HEALTH_WELLNESS} className="home-see-all-link">
              See all from Health
              <ArrowRight className="home-see-all-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Knowledge Carousel Section */}
      <section className="home-carousel-section">
        <div className="home-carousel-container">
          <div className="home-carousel-header">
            <div>
              <h2 className="home-carousel-title">
                <BookOpen className="inline-block w-8 h-8 mr-2 text-blue-500" />
                Knowledge
              </h2>
              <p className="home-carousel-subtitle">Expand your skills with courses and learning resources</p>
            </div>
          </div>

          <div className="home-carousel-wrapper">
            <div className="home-carousel-track" ref={knowledgeScrollRef}>
              {knowledgeItems.map(course => <div key={course.id} className="home-carousel-item">
                  <CourseCard course={course} />
                </div>)}
            </div>
          </div>

          <div className="home-carousel-controls">
            <button onClick={() => scroll(knowledgeScrollRef, 'left')} className="home-carousel-button" aria-label="Scroll left">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll(knowledgeScrollRef, 'right')} className="home-carousel-button" aria-label="Scroll right">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <Link to={ROUTES.LEARNING} className="home-see-all-link">
              See all from Knowledge
              <ArrowRight className="home-see-all-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Economy Carousel Section */}
      <section className="home-carousel-section">
        <div className="home-carousel-container">
          <div className="home-carousel-header">
            <div>
              <h2 className="home-carousel-title">
                <ShoppingBag className="inline-block w-8 h-8 mr-2 text-green-500" />
                Economy
              </h2>
              <p className="home-carousel-subtitle">Browse products and services in our marketplace</p>
            </div>
          </div>

          <div className="home-carousel-wrapper">
            <div className="home-carousel-track" ref={economyScrollRef}>
              {economyItems.map(product => <div key={product.id} className="home-carousel-item">
                  <Card hover className="h-full overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-3">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-lavender-primary">
                          ${(product.price / 100).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>)}
            </div>
          </div>

          <div className="home-carousel-controls">
            <button onClick={() => scroll(economyScrollRef, 'left')} className="home-carousel-button" aria-label="Scroll left">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll(economyScrollRef, 'right')} className="home-carousel-button" aria-label="Scroll right">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <Link to={ROUTES.MARKETPLACE} className="home-see-all-link">
              See all from Economy
              <ArrowRight className="home-see-all-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Carousel Section */}
      <section className="home-carousel-section">
        <div className="home-carousel-container">
          <div className="home-carousel-header">
            <div>
              <h2 className="home-carousel-title">
                <Users className="inline-block w-8 h-8 mr-2 text-purple-500" />
                Social
              </h2>
              <p className="home-carousel-subtitle">Connect with communities and groups worldwide</p>
            </div>
          </div>

          <div className="home-carousel-wrapper">
            <div className="home-carousel-track" ref={socialScrollRef}>
              {socialItems.map(community => <div key={community.id} className="home-carousel-item">
                  <Card hover className="h-full overflow-hidden">
                    <img src={community.image} alt={community.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-3">
                        {community.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{community.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{community.description}</p>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{community.members.toLocaleString()} members</span>
                      </div>
                    </div>
                  </Card>
                </div>)}
            </div>
          </div>

          <div className="home-carousel-controls">
            <button onClick={() => scroll(socialScrollRef, 'left')} className="home-carousel-button" aria-label="Scroll left">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll(socialScrollRef, 'right')} className="home-carousel-button" aria-label="Scroll right">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <Link to={ROUTES.COMMUNITY} className="home-see-all-link">
              See all from Social
              <ArrowRight className="home-see-all-icon" />
            </Link>
          </div>
        </div>
      </section>
    </>;
}
export default HomePage;