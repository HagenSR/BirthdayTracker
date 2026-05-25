import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VersionState } from './version.reducer';

export const selectVersionFeature = createFeatureSelector<VersionState>('version');
export const selectVersion = createSelector(selectVersionFeature, state => state.version);
