import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import {getTestBed} from '@angular/core/testing'
import {BrowserDynamicTestingModule,
        platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing'
// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};


getTestBed().initTestEnvironment(BrowserDynamicTestingModule,
                                 platformBrowserDynamicTesting());

const  context  = require.context('./',true,/Specs\.ts$/);
context.keys().map(context);
__karma__.start();
