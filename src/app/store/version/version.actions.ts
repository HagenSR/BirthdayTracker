import { createAction, props } from '@ngrx/store';
import { Version } from '../../shared/enums/version.enum';

export const updateVersion = createAction(
  '[Version] Update',
  props<{ version: Version }>()
);
