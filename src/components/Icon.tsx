// Icon set — simple geometric SVGs matching the web design. Each
// component takes color + size props.
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type P = { color?: string; size?: number };

export const Icons = {
  Back: ({ color = '#1F1014', size = 22 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 22 22"><Path d="M14 4l-7 7 7 7" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none"/></Svg>
  ),
  Menu: ({ color = '#1F1014', size = 22 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 22 22"><Path d="M3 7h16M3 15h10" stroke={color} strokeWidth={2.2} strokeLinecap="round"/></Svg>
  ),
  Bell: ({ color = '#1F1014', size = 22 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path d="M11 3a5 5 0 00-5 5v3l-1.5 3h13L16 11V8a5 5 0 00-5-5z" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
      <Path d="M9 17a2 2 0 004 0" stroke={color} strokeWidth={2} strokeLinecap="round"/>
    </Svg>
  ),
  Search: ({ color = '#1F1014', size = 18 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Circle cx={8} cy={8} r={5.5} stroke={color} strokeWidth={2}/>
      <Path d="M12 12l4 4" stroke={color} strokeWidth={2} strokeLinecap="round"/>
    </Svg>
  ),
  QR: ({ color = '#1F1014', size = 22 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Rect x={3} y={3} width={6} height={6} rx={1} stroke={color} strokeWidth={2}/>
      <Rect x={13} y={3} width={6} height={6} rx={1} stroke={color} strokeWidth={2}/>
      <Rect x={3} y={13} width={6} height={6} rx={1} stroke={color} strokeWidth={2}/>
      <Path d="M13 13h2v2M19 13v3M13 17v2h6" stroke={color} strokeWidth={2} strokeLinecap="round"/>
    </Svg>
  ),
  Pin: ({ color = '#1F1014', size = 22 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path d="M11 20s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
      <Circle cx={11} cy={8} r={2.5} stroke={color} strokeWidth={2}/>
    </Svg>
  ),
  Star: ({ color = '#1F1014', size = 22 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 22 22"><Path d="M11 2l2.6 5.5 6 .8-4.4 4.1 1.1 6L11 15.6 5.7 18.4l1.1-6L2.4 8.3l6-.8L11 2z" fill={color}/></Svg>
  ),
  Heart: ({ color = '#1F1014', size = 22, filled = false }: P & { filled?: boolean }) => (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill={filled ? color : 'none'}>
      <Path d="M11 19s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0118 9c0 5.5-7 10-7 10z" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
    </Svg>
  ),
  Arrow: ({ color = '#1F1014', size = 18 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none"><Path d="M3 9h12m-4-4l4 4-4 4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></Svg>
  ),
  Check: ({ color = '#1F1014', size = 16 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none"><Path d="M3 8.5l3 3 7-7" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"/></Svg>
  ),
  Eye: ({ color = '#1F1014', size = 18 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d="M1 9s3-5.5 8-5.5S17 9 17 9s-3 5.5-8 5.5S1 9 1 9z" stroke={color} strokeWidth={1.8}/>
      <Circle cx={9} cy={9} r={2.5} stroke={color} strokeWidth={1.8}/>
    </Svg>
  ),
  Face: ({ color = '#1F1014', size = 22 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path d="M3 7V5a2 2 0 012-2h2M19 7V5a2 2 0 00-2-2h-2M3 15v2a2 2 0 002 2h2M19 15v2a2 2 0 01-2 2h-2" stroke={color} strokeWidth={2} strokeLinecap="round"/>
      <Circle cx={8} cy={10} r={1} fill={color}/>
      <Circle cx={14} cy={10} r={1} fill={color}/>
      <Path d="M8 14c.8 1 2 1.5 3 1.5s2.2-.5 3-1.5" stroke={color} strokeWidth={1.8} strokeLinecap="round"/>
    </Svg>
  ),
  Bag: ({ color = '#1F1014', size = 22 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path d="M5 7h12l-1 12H6L5 7z" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
      <Path d="M8 7V5a3 3 0 016 0v2" stroke={color} strokeWidth={2}/>
    </Svg>
  ),
  Home: ({ color = '#1F1014', size = 22 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none"><Path d="M3 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6H8v6H4a1 1 0 01-1-1v-8z" stroke={color} strokeWidth={2} strokeLinejoin="round"/></Svg>
  ),
  Refresh: ({ color = '#1F1014', size = 16 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path d="M3 8a5 5 0 018.5-3.5L13 6M13 8a5 5 0 01-8.5 3.5L3 10" stroke={color} strokeWidth={1.8} strokeLinecap="round"/>
      <Path d="M13 3v3h-3M3 13v-3h3" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  ),
  Bookmark: ({ color = '#1F1014', size = 18, filled = false }: P & { filled?: boolean }) => (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill={filled ? color : 'none'}>
      <Path d="M4 2h10v14l-5-3.5L4 16V2z" stroke={color} strokeWidth={1.8} strokeLinejoin="round"/>
    </Svg>
  ),
  Copy: ({ color = '#1F1014', size = 18 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Rect x={5} y={5} width={10} height={11} rx={2} stroke={color} strokeWidth={1.8}/>
      <Path d="M11 5V4a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h1" stroke={color} strokeWidth={1.8}/>
    </Svg>
  ),
  Share: ({ color = '#1F1014', size = 20 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx={5} cy={10} r={2.5} stroke={color} strokeWidth={2}/>
      <Circle cx={15} cy={5} r={2.5} stroke={color} strokeWidth={2}/>
      <Circle cx={15} cy={15} r={2.5} stroke={color} strokeWidth={2}/>
      <Path d="M7 8.7l6-3M7 11.3l6 3" stroke={color} strokeWidth={2}/>
    </Svg>
  ),
  Message: ({ color = '#1F1014', size = 22 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path d="M3 5h16v11h-9l-4 3v-3H3V5z" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
    </Svg>
  ),
  Mail: ({ color = '#1F1014', size = 22 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Rect x={3} y={5} width={16} height={12} rx={1.5} stroke={color} strokeWidth={2}/>
      <Path d="M3 7l8 6 8-6" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
    </Svg>
  ),
  Clock: ({ color = '#1F1014', size = 16 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Circle cx={8} cy={8} r={6} stroke={color} strokeWidth={1.8}/>
      <Path d="M8 4.5V8l2.5 1.5" stroke={color} strokeWidth={1.8} strokeLinecap="round"/>
    </Svg>
  ),
  Chev: ({ color = '#1F1014', size = 14, dir = 'right' }: P & { dir?: 'right' | 'left' | 'down' | 'up' }) => {
    const d = ({ right: 'M5 3l5 5-5 5', left: 'M9 3L4 8l5 5', down: 'M3 5l5 5 5-5', up: 'M3 9l5-5 5 5' } as const)[dir];
    return <Svg width={size} height={size} viewBox="0 0 16 16" fill="none"><Path d={d} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></Svg>;
  },
  Close: ({ color = '#1F1014', size = 14 }: P) => (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M3 3l8 8M11 3l-8 8" stroke={color} strokeWidth={2} strokeLinecap="round"/>
    </Svg>
  ),
};
