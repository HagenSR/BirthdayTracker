import { createReducer, on } from '@ngrx/store';
import { Version } from '../../shared/enums/version.enum';
import { updateVersion } from './version.actions';

export interface VersionState {
  version: Version;
}

const initialState: VersionState = { version: Version.two };

export const versionReducer = createReducer(
  initialState,
  on(updateVersion, (state, { version }) => ({ ...state, version })),
);
