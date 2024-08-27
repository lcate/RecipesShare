import { LoggedInUserDto } from "./LoggedInUserDto";

export interface AuthResponseDto {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
  user: LoggedInUserDto;
}
