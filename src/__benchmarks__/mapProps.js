import './setup';
import React from 'react';
import {mount} from 'enzyme';
import mapProps from '../mapProps';
import newMapProps from '../newMapProps';
import compose from '../compose';
import {runBenchmark} from './utils';

const C1 = compose(
  mapProps(t => t),
  mapProps(t => t),
  mapProps(t => t),
  mapProps(t => t),
  mapProps(t => t),
  mapProps(t => t),
  mapProps(t => t),
  mapProps(t => t),
)(() => <div />);

const C2 = compose(
  newMapProps(t => t),
  newMapProps(t => t),
  newMapProps(t => t),
  newMapProps(t => t),
  newMapProps(t => t),
  newMapProps(t => t),
  newMapProps(t => t),
  newMapProps(t => t),
)(() => <div />);

runBenchmark([
  {
    description: '❤️  mapProps',
    run() {
      mount(<C1 />);
    },
  },
  {
    description: '💙  new mapProps',
    run() {
      mount(<C2 />);
    },
  },
], '[mount]');

const w1 = mount(<C1 foo={0} bar={0} />);
const w2 = mount(<C2 foo={0} bar={0} />);

const rand = n => Math.round(Math.random() * n);

runBenchmark([
  {
    description: '❤️  mapProps',
    run() {
      w1.setProps({foo: rand(1024)});
    },
  },
  {
    description: '💙  new mapProps',
    run() {
      w2.setProps({foo: rand(1024)});
    },
  },
], '[setProps]');
