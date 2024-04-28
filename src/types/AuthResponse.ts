import ApiResponse from "@/types/ApiResponse";
import ErrorResponse from "@/types/ErrorResponse";

interface AuthSuccessResponse {
  userId: string;
  accessToken: string;
}

export default interface AuthResponse extends ApiResponse {
  data: AuthSuccessResponse | ErrorResponse;
}
