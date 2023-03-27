import React from 'react';

import { Add, Sign } from '../pages';

interface Route {
  path: string;
  title: string;
  component: React.FC;
}

export const ROUTES: Route[] = [
  {
    path: '/sign',
    title: 'Sign',
    component: Sign,
  },
  {
    path: '/add',
    title: 'Add',
    component: Add,
  },
];
