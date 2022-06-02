// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export * as Core from './core';
export * as Functions from './functions';
export * as Utils from './utils';
export * as Constants from './constants';
export * as Types from './typings';
export * as Classes from './classes';
export * as Modules from './modules';
export * as Errors from './errors';

// eslint-disable-next-line prefer-destructuring
export const METAFORM_VERSION = process.env.METAFORM_VERSION;
export const METAFORM_NODE_ENV = process.env.NODE_ENV || 'production';
