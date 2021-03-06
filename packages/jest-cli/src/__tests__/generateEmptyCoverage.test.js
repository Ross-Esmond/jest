/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
'use strict';

import generateEmptyCoverage from '../generateEmptyCoverage';
import Runtime from 'jest-runtime';

const os = require('os');
const {makeGlobalConfig, makeProjectConfig} = require('../../../../TestUtils');

jest.spyOn(Runtime, 'shouldInstrument').mockImplementation(() => true);

const src = `
throw new Error('this should not be thrown');

const a = (b, c) => {
  if (b) {
    return c;
  } else {
    return b;
  }
};

module.exports = {
  a,
};`;

it('generates an empty coverage object for a file without running it', () => {
  const emptyCoverage = generateEmptyCoverage(
    src,
    '/sum.js',
    makeGlobalConfig(),
    makeProjectConfig({
      cacheDirectory: os.tmpdir(),
      rootDir: os.tmpdir(),
    }),
  );
  expect(emptyCoverage && emptyCoverage.coverage).toMatchSnapshot();
});
