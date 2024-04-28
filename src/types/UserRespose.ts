import ApiResponse from "@/types/ApiResponse";
import ErrorResponse from "@/types/ErrorResponse";

export interface UserType {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
}

export default interface UserResponse extends ApiResponse {
  data: UserType | ErrorResponse;
}
