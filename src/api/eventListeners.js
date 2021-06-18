/*
Copyright 2019-2021 The Tekton Authors
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { get } from './comms';
import {
  checkData,
  getQueryParams,
  getTektonAPI,
  triggersAPIGroup,
  useCollection,
  useResource
} from './utils';

export function getEventListeners({ filters = [], namespace } = {}) {
  const uri = getTektonAPI(
    'eventlisteners',
    { group: triggersAPIGroup, namespace, version: 'v1alpha1' },
    getQueryParams(filters)
  );
  return get(uri).then(checkData);
}

export function getEventListener({ name, namespace }) {
  const uri = getTektonAPI('eventlisteners', {
    group: triggersAPIGroup,
    name,
    namespace,
    version: 'v1alpha1'
  });
  return get(uri);
}

export function useEventListeners(params) {
  return useCollection('EventListener', getEventListeners, params);
}

export function useEventListener(params) {
  return useResource('EventListener', getEventListener, params);
}
