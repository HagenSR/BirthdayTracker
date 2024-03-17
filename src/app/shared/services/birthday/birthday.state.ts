import { EntityState } from "@datorama/akita";
import { Birthday } from "../../models/birthday.model";

export interface BirthdayState extends EntityState<Birthday, number> { }