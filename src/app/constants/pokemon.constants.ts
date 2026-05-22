import { Generation } from '../models/pokemon';

export const TYPE_COLORS: Record<string, { bg: string; badge: string; text: string }> = {
  fire:     { bg: '#3a1a12', badge: '#ff6b35', text: '#ffb49a' },
  water:    { bg: '#0d1f3a', badge: '#3a8fe8', text: '#93c5fd' },
  grass:    { bg: '#0f2a14', badge: '#4caf50', text: '#86efac' },
  poison:   { bg: '#2a0f2e', badge: '#9c27b0', text: '#d8b4fe' },
  flying:   { bg: '#0f1f2e', badge: '#29b6f6', text: '#bae6fd' },
  bug:      { bg: '#1a2a0a', badge: '#8bc34a', text: '#bef264' },
  normal:   { bg: '#1e1e24', badge: '#757575', text: '#d1d5db' },
  electric: { bg: '#2e2500', badge: '#fdd835', text: '#fef08a' },
  ground:   { bg: '#2a1a06', badge: '#c8a04a', text: '#fde68a' },
  fairy:    { bg: '#2e0f1e', badge: '#f06292', text: '#fbcfe8' },
  psychic:  { bg: '#2e0f20', badge: '#e91e63', text: '#fda4af' },
  rock:     { bg: '#1a1510', badge: '#8d6e63', text: '#d6b99c' },
  ice:      { bg: '#0a1e2a', badge: '#4dd0e1', text: '#a5f3fc' },
  dragon:   { bg: '#0d0d2e', badge: '#5c6bc0', text: '#c7d2fe' },
  ghost:    { bg: '#150d2e', badge: '#7e57c2', text: '#ddd6fe' },
  fighting: { bg: '#2e0a0a', badge: '#e53935', text: '#fca5a5' },
  steel:    { bg: '#181820', badge: '#90a4ae', text: '#e2e8f0' },
  dark:     { bg: '#100f14', badge: '#455a64', text: '#94a3b8' },
};

export const STAT_NAMES: Record<string, string> = {
  'hp': 'HP', 'attack': 'Ataque', 'defense': 'Defensa',
  'special-attack': 'Sp. Atq', 'special-defense': 'Sp. Def', 'speed': 'Velocidad',
};

export const STAT_COLORS = ['#e63946','#f4a261','#e9c46a','#2a9d8f','#457b9d','#a8dadc'];

export const GENERATIONS: Generation[] = [
  { label: 'Todos',    gen: 'all',  start: 0,     end: Infinity },
  { label: 'Gen I',    gen: 'i',    start: 1,     end: 151 },
  { label: 'Gen II',   gen: 'ii',   start: 152,   end: 251 },
  { label: 'Gen III',  gen: 'iii',  start: 252,   end: 386 },
  { label: 'Gen IV',   gen: 'iv',   start: 387,   end: 493 },
  { label: 'Gen V',    gen: 'v',    start: 494,   end: 649 },
  { label: 'Gen VI',   gen: 'vi',   start: 650,   end: 721 },
  { label: 'Gen VII',  gen: 'vii',  start: 722,   end: 809 },
  { label: 'Gen VIII', gen: 'viii', start: 810,   end: 905 },
  { label: 'Gen IX',   gen: 'ix',   start: 906,   end: 1025 },
];

export const PAGE_SIZE = 20;