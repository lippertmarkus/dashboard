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

import React from 'react';
import { render } from '../../utils/test';
import StepDefinition from './StepDefinition';

it('StepDefinition renders default content', () => {
  const { queryByText } = render(<StepDefinition taskRun={{}} />);
  // due to an issue with the react-syntax-highlighter
  // the message is rendered in multiple spans (space delimited)
  // TODO: revert this when react-syntax-highlighter is updated or we replace it
  expect(queryByText(/Step/i)).toBeTruthy();
  expect(queryByText(/definition/i)).toBeTruthy();
  expect(queryByText(/not/i)).toBeTruthy();
  expect(queryByText(/available/i)).toBeTruthy();
});

it('StepDefinition renders the provided content', () => {
  const definition = {
    args: ['--someArg'],
    command: ['docker'],
    name: 'test-name'
  };
  const { queryByText } = render(
    <StepDefinition definition={definition} taskRun={{}} />
  );

  expect(queryByText(/--someArg/)).toBeTruthy();
  expect(queryByText('test-name')).toBeTruthy();
  // due to an issue with the react-syntax-highlighter
  // these strings are rendered in multiple spans (space delimited)
  // TODO: revert this when react-syntax-highlighter is updated or we replace it
  expect(queryByText('Input')).toBeNull();
  expect(queryByText('resources')).toBeNull();
  expect(queryByText('Output')).toBeNull();
});
